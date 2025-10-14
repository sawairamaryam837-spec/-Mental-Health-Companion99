/*
  # Wellness Tracking Schema

  ## Tables Created:
  
  1. **mood_entries**
     - `id` (uuid, primary key)
     - `user_id` (text) - anonymous user identifier
     - `mood_level` (integer, 1-5) - mood intensity
     - `mood_type` (text) - emotion category
     - `emotions` (jsonb) - array of specific emotions
     - `note` (text) - optional journal entry
     - `created_at` (timestamptz)

  2. **meditation_sessions**
     - `id` (uuid, primary key)
     - `user_id` (text)
     - `session_type` (text) - guided, breathing, sound bath, etc.
     - `duration` (integer) - seconds
     - `completed` (boolean)
     - `created_at` (timestamptz)

  3. **gratitude_entries**
     - `id` (uuid, primary key)
     - `user_id` (text)
     - `entry` (text)
     - `created_at` (timestamptz)

  4. **user_progress**
     - `id` (uuid, primary key)
     - `user_id` (text, unique)
     - `current_streak` (integer)
     - `longest_streak` (integer)
     - `total_meditations` (integer)
     - `total_check_ins` (integer)
     - `badges` (jsonb) - array of earned badges
     - `level` (integer)
     - `experience_points` (integer)
     - `updated_at` (timestamptz)

  5. **wellness_goals**
     - `id` (uuid, primary key)
     - `user_id` (text)
     - `goal_type` (text)
     - `target_value` (integer)
     - `current_value` (integer)
     - `status` (text) - active, completed, abandoned
     - `created_at` (timestamptz)
     - `completed_at` (timestamptz, nullable)

  ## Security:
  - RLS enabled on all tables
  - Users can only access their own data
  - Anonymous users supported via local user_id
*/

-- Mood Entries Table
CREATE TABLE IF NOT EXISTS mood_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  mood_level integer NOT NULL CHECK (mood_level >= 1 AND mood_level <= 5),
  mood_type text NOT NULL,
  emotions jsonb DEFAULT '[]'::jsonb,
  note text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mood entries"
  ON mood_entries FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own mood entries"
  ON mood_entries FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own mood entries"
  ON mood_entries FOR UPDATE
  USING (user_id = current_setting('app.user_id', true))
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own mood entries"
  ON mood_entries FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

CREATE INDEX IF NOT EXISTS idx_mood_entries_user_created ON mood_entries(user_id, created_at DESC);

-- Meditation Sessions Table
CREATE TABLE IF NOT EXISTS meditation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  session_type text NOT NULL,
  duration integer NOT NULL DEFAULT 0,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meditation sessions"
  ON meditation_sessions FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own meditation sessions"
  ON meditation_sessions FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own meditation sessions"
  ON meditation_sessions FOR UPDATE
  USING (user_id = current_setting('app.user_id', true))
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE INDEX IF NOT EXISTS idx_meditation_sessions_user_created ON meditation_sessions(user_id, created_at DESC);

-- Gratitude Entries Table
CREATE TABLE IF NOT EXISTS gratitude_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  entry text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own gratitude entries"
  ON gratitude_entries FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own gratitude entries"
  ON gratitude_entries FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own gratitude entries"
  ON gratitude_entries FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

CREATE INDEX IF NOT EXISTS idx_gratitude_entries_user_created ON gratitude_entries(user_id, created_at DESC);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text UNIQUE NOT NULL,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  total_meditations integer DEFAULT 0,
  total_check_ins integer DEFAULT 0,
  badges jsonb DEFAULT '[]'::jsonb,
  level integer DEFAULT 1,
  experience_points integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (user_id = current_setting('app.user_id', true))
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);

-- Wellness Goals Table
CREATE TABLE IF NOT EXISTS wellness_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  goal_type text NOT NULL,
  target_value integer NOT NULL,
  current_value integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE wellness_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own goals"
  ON wellness_goals FOR SELECT
  USING (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can insert own goals"
  ON wellness_goals FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can update own goals"
  ON wellness_goals FOR UPDATE
  USING (user_id = current_setting('app.user_id', true))
  WITH CHECK (user_id = current_setting('app.user_id', true));

CREATE POLICY "Users can delete own goals"
  ON wellness_goals FOR DELETE
  USING (user_id = current_setting('app.user_id', true));

CREATE INDEX IF NOT EXISTS idx_wellness_goals_user_status ON wellness_goals(user_id, status, created_at DESC);
