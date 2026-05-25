-- Run this in your Supabase SQL editor to set up the jobs table

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_id TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  city TEXT NOT NULL,
  job_type TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  apply_url TEXT NOT NULL,
  posted_date DATE NOT NULL DEFAULT CURRENT_DATE,
  salary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT jobs_source_source_id_unique UNIQUE (source, source_id)
);

CREATE INDEX IF NOT EXISTS idx_jobs_city_type_date
  ON jobs (city, job_type, posted_date DESC);

CREATE INDEX IF NOT EXISTS idx_jobs_source
  ON jobs (source);

-- Enable Row Level Security (default deny)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON jobs
  FOR SELECT USING (true);

-- Allow upsert via service role / anon key with insert permission
CREATE POLICY "Allow insert for anon" ON jobs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for anon" ON jobs
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete for anon" ON jobs
  FOR DELETE USING (true);
