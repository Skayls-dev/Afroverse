CREATE TABLE guide_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE guide_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous visitors) to register their email
CREATE POLICY "anon_insert_guide_leads" ON guide_leads
  FOR INSERT WITH CHECK (true);
