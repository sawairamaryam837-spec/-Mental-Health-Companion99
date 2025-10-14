import { createClient } from '@supabase/supabase-js';
import { getUserId } from '../utils/userId';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const setUserContext = async () => {
  const userId = getUserId();
  await supabase.rpc('set_config', {
    name: 'app.user_id',
    value: userId
  });
};

export interface MoodEntry {
  id?: string;
  user_id: string;
  mood_level: number;
  mood_type: string;
  emotions: string[];
  note: string;
  created_at?: string;
}

export interface MeditationSession {
  id?: string;
  user_id: string;
  session_type: string;
  duration: number;
  completed: boolean;
  created_at?: string;
}

export interface GratitudeEntry {
  id?: string;
  user_id: string;
  entry: string;
  created_at?: string;
}

export interface UserProgress {
  id?: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  total_meditations: number;
  total_check_ins: number;
  badges: string[];
  level: number;
  experience_points: number;
  updated_at?: string;
}
