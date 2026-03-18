-- ============================================================
-- ScamAlertDB — Demo Seed Data
-- ALL records are fictional and for demonstration only.
-- These are NOT real people or real incidents.
-- ============================================================

INSERT INTO public.reports (
  slug, title, summary, description, platform, scam_type,
  alleged_name, business_name, phone_full_private, phone_search_normalized, phone_masked_public,
  username_handle, alleged_email, incident_date, amount_range, location_general,
  report_status, published_at, submitted_at, updated_at,
  created_by_submitter_email
) VALUES

-- 1. Fake item listing — Facebook Marketplace
(
  'demo-fake-gaming-console-listing-facebook-2024',
  '[DEMO] Fake PlayStation 5 Listing on Facebook Marketplace',
  'User posted a PS5 console for $250, accepted payment via Zelle, then blocked the buyer. Item was never delivered.',
  'This is a DEMO record. I found a listing on Facebook Marketplace for a PlayStation 5 console priced at $250, described as "lightly used." The seller, going by the name John Doe (Demo), insisted on Zelle for payment only, claiming it was "safer." After I sent the $250 via Zelle, the seller stopped responding and eventually blocked me. The listing was removed shortly after. I contacted Facebook support but did not receive a meaningful response. This is purely fictional data for demonstration purposes.',
  'facebook_marketplace', 'fake_item_listing',
  'John Doe (DEMO)', NULL,
  '5550001234', '5550001234', '***-***-1234',
  'jdoe_demo_seller', 'jdoe.demo@example-fake.com',
  '2024-09-15', '100_500', 'Atlanta, GA (Demo)',
  'published', NOW() - INTERVAL '10 days', NOW() - INTERVAL '12 days', NOW() - INTERVAL '10 days',
  'victim-demo-1@example-fake.com'
),

-- 2. Deposit scam — Zelle / Fake Landlord
(
  'demo-rental-deposit-scam-zelle-2024',
  '[DEMO] Fraudulent Rental Deposit Request via Zelle — Fake Landlord',
  'Individual posed as a property manager, collected a $1,200 security deposit via Zelle for an apartment that they did not own or manage.',
  'This is a DEMO record. I responded to a Craigslist rental listing for a two-bedroom apartment. The person, identifying themselves as representing "Property Management Demo LLC," sent me photos of the unit and a lease agreement template. They requested a $1,200 security deposit via Zelle to "hold the unit," assuring me I would get a full refund if the application was denied. After the payment, they became unresponsive. A neighbor confirmed the property was not managed by this company. This record is fictional and created for demonstration only.',
  'zelle', 'deposit_scam',
  'Robert Smith (DEMO)', 'Property Management Demo LLC',
  '5550005678', '5550005678', '***-***-5678',
  NULL, 'rsmith.propmgmt.demo@example-fake.com',
  '2024-10-03', '1000_5000', 'Chicago, IL (Demo)',
  'published', NOW() - INTERVAL '7 days', NOW() - INTERVAL '9 days', NOW() - INTERVAL '7 days',
  'victim-demo-2@example-fake.com'
),

-- 3. Cash App handle fraud
(
  'demo-cash-app-handle-impersonation-2024',
  '[DEMO] Cash App Handle Impersonation — Fake Giveaway Scam',
  'Scammer impersonated a popular social media personality on Cash App, claimed to be running a giveaway, and requested a "verification fee."',
  'This is a DEMO record. I received a direct message on Instagram from an account claiming to be a well-known content creator. They told me I had won a $500 giveaway and that I only needed to send a $25 "processing fee" to their Cash App handle @cashuser_demo to verify my identity. After sending the $25, they requested more fees, then went silent. The Cash App handle had been created recently and had no verification. This is fictional data for demonstration purposes only.',
  'cash_app', 'advance_fee_fraud',
  NULL, NULL,
  NULL, NULL, NULL,
  '@cashuser_demo', NULL,
  '2024-10-22', 'under_100', 'Online (Demo)',
  'published', NOW() - INTERVAL '5 days', NOW() - INTERVAL '6 days', NOW() - INTERVAL '5 days',
  'victim-demo-3@example-fake.com'
),

-- 4. PayPal invoice scam
(
  'demo-paypal-fake-tech-support-invoice-2024',
  '[DEMO] Fake Tech Support PayPal Invoice — TechSupport Demo Inc',
  'Received an unsolicited PayPal invoice from a fake company claiming to renew an antivirus subscription, with a phone number to call to "cancel."',
  'This is a DEMO record. I received an email from PayPal showing a $399.99 invoice from "TechSupport Demo Inc" for an antivirus renewal I never signed up for. The email included a phone number to call to dispute the charge. When I called, the person on the phone attempted to gain remote access to my computer. I did not provide access and hung up. I reported the invoice as unauthorized through PayPal. This is fictional data for demonstration and educational purposes only.',
  'paypal', 'fake_customer_support',
  NULL, 'TechSupport Demo Inc',
  '5550009999', '5550009999', '***-***-9999',
  NULL, 'billing.demo@techsupport-fake.com',
  '2024-11-01', '100_500', 'Online (Demo)',
  'published', NOW() - INTERVAL '3 days', NOW() - INTERVAL '4 days', NOW() - INTERVAL '3 days',
  'victim-demo-4@example-fake.com'
),

-- 5. Instagram seller scam
(
  'demo-instagram-fashion-seller-disappeared-2024',
  '[DEMO] Instagram Fashion Seller Disappeared After Payment — @fashionstore_demo',
  'Instagram seller accepted $180 via Venmo for clothing items that were never shipped. Account disappeared after payment.',
  'This is a DEMO record. I ordered three clothing items from an Instagram shop page called @fashionstore_demo. The seller had several posts showing products and claimed fast shipping. I paid $180 via Venmo as requested. After a week of no updates, I messaged the account and received automated-style replies. Two weeks later the account became private and stopped responding entirely. No items were received. This is fictional data for demonstration purposes.',
  'instagram', 'seller_disappeared',
  'Demo Fashion User', 'Fashion Store Demo',
  NULL, NULL, NULL,
  '@fashionstore_demo', 'orders.fashiondemo@example-fake.com',
  '2024-11-10', '100_500', 'Online (Demo)',
  'published', NOW() - INTERVAL '2 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days',
  'victim-demo-5@example-fake.com'
),

-- 6. Venmo romance scam
(
  'demo-venmo-romance-trust-scam-2024',
  '[DEMO] Romance Scam via Venmo — Gradual Trust Building Over Several Weeks',
  'Individual established a romantic relationship over several weeks, then requested $850 via Venmo for an alleged family emergency.',
  'This is a DEMO record. I connected with this individual on a dating platform. Over six weeks, they built a relationship through daily messages and calls. They claimed to be an engineer working overseas. When they described a family emergency, they asked for $850 via Venmo for medical expenses, promising to repay upon their return. After receiving the funds, contact gradually decreased. They later requested additional money; I declined. I believe the profile photos used were stolen from a real person. This is entirely fictional data for demonstration and educational purposes.',
  'venmo', 'romance_trust_scam',
  'Demo Romance Profile', NULL,
  '5550007777', '5550007777', '***-***-7777',
  '@romancedemo_venmo', NULL,
  '2024-10-28', '500_1000', 'Online (Demo)',
  'published', NOW() - INTERVAL '1 day', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day',
  'victim-demo-6@example-fake.com'
);
