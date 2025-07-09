-- Update existing database for realtor platform
-- This script updates your existing tables to work with the new realtor features

-- 1. Update profiles table to match the auth system expectations
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"favorite_properties": [], "saved_searches": [], "notifications": true}'::jsonb;

-- Make full_name nullable to match auth system
ALTER TABLE profiles 
ALTER COLUMN full_name DROP NOT NULL;

-- 2. Add realtor-specific tables for the new features

-- Create leads table for realtor platform
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  realtor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT CHECK (status IN ('hot', 'warm', 'cold')) DEFAULT 'warm',
  score INTEGER DEFAULT 50,
  source TEXT,
  budget_min INTEGER,
  budget_max INTEGER,
  criteria JSONB,
  notes TEXT,
  tags TEXT[],
  last_contact TIMESTAMP WITH TIME ZONE,
  next_follow_up TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create showings table
CREATE TABLE IF NOT EXISTS showings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  realtor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 30,
  status TEXT CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')) DEFAULT 'pending',
  type TEXT CHECK (type IN ('buyer', 'seller')) DEFAULT 'buyer',
  notes TEXT,
  ai_score INTEGER DEFAULT 50,
  follow_up TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create communications table
CREATE TABLE IF NOT EXISTS communications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  realtor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('email', 'sms', 'phone', 'whatsapp')) NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  status TEXT CHECK (status IN ('sent', 'delivered', 'read', 'failed')) DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  realtor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  content TEXT NOT NULL,
  variables JSONB,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Add new columns to existing properties table for realtor features
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS realtor_id UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS market_value DECIMAL(12,2),
ADD COLUMN IF NOT EXISTS days_on_market INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ai_score INTEGER DEFAULT 50;

-- 4. Enable RLS for new tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE showings ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for new tables
CREATE POLICY "Realtors can manage their leads" ON leads
  FOR ALL USING (auth.uid() = realtor_id);

CREATE POLICY "Realtors can manage their showings" ON showings
  FOR ALL USING (auth.uid() = realtor_id);

CREATE POLICY "Realtors can manage their communications" ON communications
  FOR ALL USING (auth.uid() = realtor_id);

CREATE POLICY "Realtors can manage their templates" ON templates
  FOR ALL USING (auth.uid() = realtor_id);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_realtor_id ON leads(realtor_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_properties_realtor_id ON properties(realtor_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_showings_realtor_id ON showings(realtor_id);
CREATE INDEX IF NOT EXISTS idx_showings_date ON showings(date);
CREATE INDEX IF NOT EXISTS idx_communications_realtor_id ON communications(realtor_id);

-- 7. Create triggers for updated_at on new tables
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_showings_updated_at BEFORE UPDATE ON showings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 8. Insert sample realtor data for testing
INSERT INTO leads (realtor_id, name, email, phone, status, score, source, budget_min, budget_max, criteria, notes, tags) VALUES
(
  (SELECT id FROM profiles WHERE user_type = 'agent' LIMIT 1),
  'Sarah Johnson',
  'sarah.johnson@email.com',
  '(555) 123-4567',
  'hot',
  95,
  'Website',
  450000,
  600000,
  '{"beds": 3, "baths": 2, "area": "Downtown"}',
  'Very responsive, shows strong buying signals. Interested in new construction.',
  ARRAY['High Value', 'Ready to Buy', 'Downtown']
),
(
  (SELECT id FROM profiles WHERE user_type = 'agent' LIMIT 1),
  'Mike Chen',
  'mike.chen@email.com',
  '(555) 234-5678',
  'warm',
  78,
  'Referral',
  300000,
  450000,
  '{"beds": 2, "baths": 1, "area": "Suburban"}',
  'First-time buyer. Needs guidance on the process. Very motivated.',
  ARRAY['First-time Buyer', 'Suburban', 'Motivated']
);

-- Insert sample templates
INSERT INTO templates (realtor_id, name, category, content, variables) VALUES
(
  (SELECT id FROM profiles WHERE user_type = 'agent' LIMIT 1),
  'Property Viewing Follow-up',
  'follow-up',
  'Hi {{name}}, I hope you enjoyed viewing {{property}}. I''d love to hear your thoughts and answer any questions you might have.',
  '{"name": "string", "property": "string"}'
),
(
  (SELECT id FROM profiles WHERE user_type = 'agent' LIMIT 1),
  'Market Update Newsletter',
  'newsletter',
  'Hi {{name}}, here''s your monthly market update for {{area}}. New listings and price trends included.',
  '{"name": "string", "area": "string"}'
);

-- 9. Update existing properties to have realtor_id (if any agents exist)
UPDATE properties 
SET realtor_id = (SELECT id FROM profiles WHERE user_type = 'agent' LIMIT 1)
WHERE realtor_id IS NULL AND agent_id IS NULL;

-- 10. Add new columns to properties for realtor features
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS beds INTEGER,
ADD COLUMN IF NOT EXISTS baths DECIMAL(3,1);

-- Update existing properties to use new column names
UPDATE properties 
SET beds = bedrooms,
    baths = bathrooms
WHERE beds IS NULL AND bedrooms IS NOT NULL;

-- 11. Create a view for realtor dashboard
CREATE OR REPLACE VIEW realtor_dashboard AS
SELECT 
  p.id as profile_id,
  p.full_name,
  p.email,
  COUNT(DISTINCT l.id) as total_leads,
  COUNT(DISTINCT CASE WHEN l.status = 'hot' THEN l.id END) as hot_leads,
  COUNT(DISTINCT s.id) as total_showings,
  COUNT(DISTINCT CASE WHEN s.status = 'confirmed' THEN s.id END) as confirmed_showings,
  COUNT(DISTINCT pr.id) as total_properties
FROM profiles p
LEFT JOIN leads l ON p.id = l.realtor_id
LEFT JOIN showings s ON p.id = s.realtor_id
LEFT JOIN properties pr ON p.id = pr.realtor_id
WHERE p.user_type = 'agent'
GROUP BY p.id, p.full_name, p.email; 