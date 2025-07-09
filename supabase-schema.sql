-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  user_type TEXT CHECK (user_type IN ('buyer', 'seller', 'agent')) DEFAULT 'buyer',
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  realtor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  price INTEGER NOT NULL,
  beds INTEGER,
  baths INTEGER,
  sqft INTEGER,
  status TEXT CHECK (status IN ('active', 'pending', 'sold', 'off_market')) DEFAULT 'active',
  description TEXT,
  features TEXT[],
  images TEXT[],
  market_value INTEGER,
  days_on_market INTEGER DEFAULT 0,
  ai_score INTEGER DEFAULT 50,
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

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE showings ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Leads policies
CREATE POLICY "Realtors can manage their leads" ON leads
  FOR ALL USING (auth.uid() = realtor_id);

-- Properties policies
CREATE POLICY "Realtors can manage their properties" ON properties
  FOR ALL USING (auth.uid() = realtor_id);

-- Showings policies
CREATE POLICY "Realtors can manage their showings" ON showings
  FOR ALL USING (auth.uid() = realtor_id);

-- Communications policies
CREATE POLICY "Realtors can manage their communications" ON communications
  FOR ALL USING (auth.uid() = realtor_id);

-- Templates policies
CREATE POLICY "Realtors can manage their templates" ON templates
  FOR ALL USING (auth.uid() = realtor_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_realtor_id ON leads(realtor_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_properties_realtor_id ON properties(realtor_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_showings_realtor_id ON showings(realtor_id);
CREATE INDEX IF NOT EXISTS idx_showings_date ON showings(date);
CREATE INDEX IF NOT EXISTS idx_communications_realtor_id ON communications(realtor_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_showings_updated_at BEFORE UPDATE ON showings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 