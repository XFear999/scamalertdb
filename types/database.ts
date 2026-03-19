export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ReportStatus = 'pending' | 'published' | 'disputed' | 'resolved' | 'removed' | 'rejected'
export type Platform =
  | 'zelle' | 'venmo' | 'cash_app' | 'paypal'
  | 'facebook_marketplace' | 'instagram' | 'whatsapp'
  | 'telegram' | 'bank_transfer' | 'wire_transfer' | 'other'
export type ScamType =
  | 'fake_item_listing' | 'advance_fee_fraud' | 'deposit_scam'
  | 'seller_disappeared' | 'chargeback_scam' | 'fake_business_impersonation'
  | 'fake_customer_support' | 'romance_trust_scam' | 'rental_scam'
  | 'ticket_scam' | 'refund_scam' | 'investment_scam' | 'donation_scam' | 'other'

export interface Database {
  public: {
    Tables: {
      reports: {
        Row: {
          id: string
          slug: string
          title: string
          summary: string | null
          description: string
          platform: Platform
          scam_type: ScamType
          alleged_name: string | null
          business_name: string | null
          phone_full_private: string | null
          phone_search_normalized: string | null
          phone_masked_public: string | null
          username_handle: string | null
          alleged_email: string | null
          incident_date: string | null
          amount_range: string | null
          location_general: string | null
          report_status: ReportStatus
          moderation_notes: string | null
          view_count: number
          published_at: string | null
          submitted_at: string
          updated_at: string
          created_by_submitter_email: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          summary?: string | null
          description: string
          platform: Platform
          scam_type: ScamType
          alleged_name?: string | null
          business_name?: string | null
          phone_full_private?: string | null
          phone_search_normalized?: string | null
          phone_masked_public?: string | null
          username_handle?: string | null
          alleged_email?: string | null
          incident_date?: string | null
          amount_range?: string | null
          location_general?: string | null
          report_status?: ReportStatus
          moderation_notes?: string | null
          view_count?: number
          published_at?: string | null
          submitted_at?: string
          updated_at?: string
          created_by_submitter_email?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          summary?: string | null
          description?: string
          platform?: Platform
          scam_type?: ScamType
          alleged_name?: string | null
          business_name?: string | null
          phone_full_private?: string | null
          phone_search_normalized?: string | null
          phone_masked_public?: string | null
          username_handle?: string | null
          alleged_email?: string | null
          incident_date?: string | null
          amount_range?: string | null
          location_general?: string | null
          report_status?: ReportStatus
          moderation_notes?: string | null
          view_count?: number
          published_at?: string | null
          submitted_at?: string
          updated_at?: string
          created_by_submitter_email?: string | null
        }
        Relationships: []
      }
      report_evidence: {
        Row: {
          id: string
          report_id: string
          file_url: string
          file_path: string
          mime_type: string | null
          is_redacted: boolean
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          report_id: string
          file_url: string
          file_path: string
          mime_type?: string | null
          is_redacted?: boolean
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          file_url?: string
          file_path?: string
          mime_type?: string | null
          is_redacted?: boolean
          is_public?: boolean
          created_at?: string
        }
        Relationships: []
      }
      disputes: {
        Row: {
          id: string
          report_id: string
          requester_name: string
          requester_email: string
          requester_phone: string | null
          relationship_to_report: string
          reason: string
          explanation: string
          supporting_evidence_url: string | null
          status: 'open' | 'under_review' | 'resolved' | 'dismissed'
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          report_id: string
          requester_name: string
          requester_email: string
          requester_phone?: string | null
          relationship_to_report: string
          reason: string
          explanation: string
          supporting_evidence_url?: string | null
          status?: 'open' | 'under_review' | 'resolved' | 'dismissed'
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          report_id?: string
          requester_name?: string
          requester_email?: string
          requester_phone?: string | null
          relationship_to_report?: string
          reason?: string
          explanation?: string
          supporting_evidence_url?: string | null
          status?: 'open' | 'under_review' | 'resolved' | 'dismissed'
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          category: string
          message: string
          status: 'unread' | 'read' | 'replied' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          category: string
          message: string
          status?: 'unread' | 'read' | 'replied' | 'archived'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          category?: string
          message?: string
          status?: 'unread' | 'read' | 'replied' | 'archived'
          created_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          id: string
          actor_id: string | null
          action_type: string
          target_type: string
          target_id: string | null
          details_json: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action_type: string
          target_type: string
          target_id?: string | null
          details_json?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string | null
          action_type?: string
          target_type?: string
          target_id?: string | null
          details_json?: Json | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_reports_view: {
        Row: {
          id: string
          slug: string
          title: string
          summary: string | null
          platform: Platform
          scam_type: ScamType
          alleged_name: string | null
          business_name: string | null
          phone_masked_public: string | null
          username_handle: string | null
          incident_date: string | null
          amount_range: string | null
          location_general: string | null
          report_status: ReportStatus
          view_count: number
          published_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      search_reports: {
        Args: {
          search_query: string | null
          platform_filter: string | null
          scam_type_filter: string | null
          status_filter: string | null
          page_number: number
          page_size: number
        }
        Returns: Array<Database['public']['Views']['public_reports_view']['Row'] & { total_count: number }>
      }
      increment_view_count: {
        Args: { report_slug: string }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Report = Database['public']['Tables']['reports']['Row']
export type ReportInsert = Database['public']['Tables']['reports']['Insert']
export type ReportEvidence = Database['public']['Tables']['report_evidence']['Row']
export type Dispute = Database['public']['Tables']['disputes']['Row']
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row']
export type AuditLog = Database['public']['Tables']['audit_logs']['Row']
export type PublicReport = Database['public']['Views']['public_reports_view']['Row']
