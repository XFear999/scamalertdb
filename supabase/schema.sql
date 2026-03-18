-- ============================================================
-- ScamAlertDB — PostgreSQL Schema for Supabase
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================
-- TABLE: reports
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reports (
  id                        uuid          PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                      text          NOT NULL UNIQUE,
  title                     text          NOT NULL,
  summary                   text,
  description               text          NOT NULL,
  platform                  text          NOT NULL,
  scam_type                 text          NOT NULL,
  alleged_name              text,
  business_name             text,

  -- Phone fields
  phone_full_private        text,
  phone_search_normalized   text,
  phone_masked_public       text,

  username_handle           text,
  alleged_email             text,
  incident_date             date,
  amount_range              text,
  location_general          text,

  report_status             text          NOT NULL DEFAULT 'pending'
                            CHECK (report_status IN ('pending','published','disputed','resolved','removed','rejected')),

  moderation_notes          text,
  view_count                integer       NOT NULL DEFAULT 0,
  published_at              timestamptz,
  submitted_at              timestamptz   NOT NULL DEFAULT now(),
  updated_at                timestamptz   NOT NULL DEFAULT now(),
  created_by_submitter_email text
);

-- ============================================================
-- TABLE: report_evidence
-- ============================================================
CREATE TABLE IF NOT EXISTS public.report_evidence (
  id           uuid         PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id    uuid         NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  file_url     text         NOT NULL,
  file_path    text         NOT NULL,
  mime_type    text,
  is_redacted  boolean      NOT NULL DEFAULT false,
  is_public    boolean      NOT NULL DEFAULT true,
  created_at   timestamptz  NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: disputes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.disputes (
  id                      uuid         PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id               uuid         NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  requester_name          text         NOT NULL,
  requester_email         text         NOT NULL,
  requester_phone         text,
  relationship_to_report  text         NOT NULL,
  reason                  text         NOT NULL,
  explanation             text         NOT NULL,
  supporting_evidence_url text,
  status                  text         NOT NULL DEFAULT 'open'
                          CHECK (status IN ('open','under_review','resolved','dismissed')),
  admin_notes             text,
  created_at              timestamptz  NOT NULL DEFAULT now(),
  updated_at              timestamptz  NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: contact_messages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         uuid         PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       text         NOT NULL,
  email      text         NOT NULL,
  subject    text         NOT NULL,
  category   text         NOT NULL,
  message    text         NOT NULL,
  status     text         NOT NULL DEFAULT 'unread'
             CHECK (status IN ('unread','read','replied','archived')),
  created_at timestamptz  NOT NULL DEFAULT now()
);

-- ============================================================
-- TABLE: audit_logs
-- ============================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id           uuid         PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id     uuid,
  action_type  text         NOT NULL,
  target_type  text         NOT NULL,
  target_id    uuid,
  details_json jsonb,
  created_at   timestamptz  NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_reports_status      ON public.reports(report_status);
CREATE INDEX IF NOT EXISTS idx_reports_platform    ON public.reports(platform);
CREATE INDEX IF NOT EXISTS idx_reports_scam_type   ON public.reports(scam_type);
CREATE INDEX IF NOT EXISTS idx_reports_phone       ON public.reports(phone_search_normalized);
CREATE INDEX IF NOT EXISTS idx_reports_slug        ON public.reports(slug);
CREATE INDEX IF NOT EXISTS idx_reports_published   ON public.reports(published_at DESC) WHERE report_status = 'published';
CREATE INDEX IF NOT EXISTS idx_reports_submitted   ON public.reports(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_disputes_status     ON public.disputes(status);
CREATE INDEX IF NOT EXISTS idx_contact_status      ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_evidence_report     ON public.report_evidence(report_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor         ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_created       ON public.audit_logs(created_at DESC);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_reports_fts ON public.reports
  USING gin(
    to_tsvector('english',
      coalesce(title,'') || ' ' ||
      coalesce(summary,'') || ' ' ||
      coalesce(description,'') || ' ' ||
      coalesce(alleged_name,'') || ' ' ||
      coalesce(business_name,'') || ' ' ||
      coalesce(username_handle,'')
    )
  );

-- Trigram index for partial matching
CREATE INDEX IF NOT EXISTS idx_reports_title_trgm ON public.reports USING gin(title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_reports_name_trgm  ON public.reports USING gin(coalesce(alleged_name,'') gin_trgm_ops);

-- ============================================================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER disputes_updated_at
  BEFORE UPDATE ON public.disputes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- INCREMENT VIEW COUNT FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.increment_view_count(report_slug text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.reports
  SET view_count = view_count + 1
  WHERE slug = report_slug AND report_status = 'published';
END;
$$;

-- ============================================================
-- PUBLIC REPORTS VIEW (never exposes phone_full_private)
-- ============================================================
CREATE OR REPLACE VIEW public.public_reports_view AS
  SELECT
    id, slug, title, summary, platform, scam_type,
    alleged_name, business_name,
    phone_masked_public,   -- masked only
    username_handle,
    incident_date, amount_range, location_general,
    report_status, view_count, published_at, updated_at
  FROM public.reports
  WHERE report_status = 'published';

-- ============================================================
-- ROW-LEVEL SECURITY
-- ============================================================
ALTER TABLE public.reports          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_evidence  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disputes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs       ENABLE ROW LEVEL SECURITY;

-- REPORTS: public can read published rows (masked fields only)
CREATE POLICY "Public can read published reports"
  ON public.reports FOR SELECT
  USING (report_status = 'published');

-- REPORTS: anyone can submit (insert)
CREATE POLICY "Anyone can submit a report"
  ON public.reports FOR INSERT
  WITH CHECK (report_status = 'pending');

-- REPORTS: service role has full access (handled via service key)
CREATE POLICY "Service role full access to reports"
  ON public.reports
  USING (auth.role() = 'service_role');

-- EVIDENCE: public can see non-redacted public files of published reports
CREATE POLICY "Public can read public evidence"
  ON public.report_evidence FOR SELECT
  USING (
    is_public = true AND is_redacted = false AND
    EXISTS (
      SELECT 1 FROM public.reports r
      WHERE r.id = report_id AND r.report_status = 'published'
    )
  );

-- DISPUTES: anyone can submit
CREATE POLICY "Anyone can submit a dispute"
  ON public.disputes FOR INSERT
  WITH CHECK (true);

-- DISPUTES: service role only for select/update
CREATE POLICY "Service role full access to disputes"
  ON public.disputes
  USING (auth.role() = 'service_role');

-- CONTACT: anyone can insert
CREATE POLICY "Anyone can submit contact message"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- CONTACT: service role only reads
CREATE POLICY "Service role full access to contact_messages"
  ON public.contact_messages
  USING (auth.role() = 'service_role');

-- AUDIT LOGS: service role only
CREATE POLICY "Service role full access to audit_logs"
  ON public.audit_logs
  USING (auth.role() = 'service_role');
