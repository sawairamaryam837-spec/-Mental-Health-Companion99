import { supabase, MoodEntry, MeditationSession, GratitudeEntry, UserProgress } from './supabase';
import { getUserId } from '../utils/userId';

export const saveMoodEntry = async (moodData: Omit<MoodEntry, 'user_id' | 'id' | 'created_at'>) => {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('mood_entries')
    .insert({
      user_id: userId,
      ...moodData
    })
    .select()
    .maybeSingle();

  if (error) throw error;

  await updateProgress('check_in');

  return data;
};

export const getMoodHistory = async (days: number = 30) => {
  const userId = getUserId();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const saveMeditationSession = async (sessionData: Omit<MeditationSession, 'user_id' | 'id' | 'created_at'>) => {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('meditation_sessions')
    .insert({
      user_id: userId,
      ...sessionData
    })
    .select()
    .maybeSingle();

  if (error) throw error;

  if (sessionData.completed) {
    await updateProgress('meditation');
  }

  return data;
};

export const getMeditationHistory = async () => {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('meditation_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', true)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data;
};

export const saveGratitudeEntry = async (entry: string) => {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('gratitude_entries')
    .insert({
      user_id: userId,
      entry
    })
    .select()
    .maybeSingle();

  if (error) throw error;

  await updateProgress('gratitude');

  return data;
};

export const getGratitudeEntries = async (limit: number = 30) => {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('gratitude_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
};

export const getUserProgress = async (): Promise<UserProgress> => {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    const newProgress: Omit<UserProgress, 'id' | 'updated_at'> = {
      user_id: userId,
      current_streak: 0,
      longest_streak: 0,
      total_meditations: 0,
      total_check_ins: 0,
      badges: [],
      level: 1,
      experience_points: 0
    };

    const { data: created, error: createError } = await supabase
      .from('user_progress')
      .insert(newProgress)
      .select()
      .single();

    if (createError) throw createError;
    return created;
  }

  return data;
};

const updateProgress = async (actionType: 'meditation' | 'check_in' | 'gratitude') => {
  const userId = getUserId();
  const progress = await getUserProgress();

  const updates: Partial<UserProgress> = {
    updated_at: new Date().toISOString()
  };

  if (actionType === 'meditation') {
    updates.total_meditations = (progress.total_meditations || 0) + 1;
    updates.experience_points = (progress.experience_points || 0) + 10;
  } else if (actionType === 'check_in') {
    updates.total_check_ins = (progress.total_check_ins || 0) + 1;
    updates.experience_points = (progress.experience_points || 0) + 5;
  } else if (actionType === 'gratitude') {
    updates.experience_points = (progress.experience_points || 0) + 5;
  }

  const newXP = updates.experience_points || progress.experience_points;
  const newLevel = Math.floor(newXP / 100) + 1;

  if (newLevel > progress.level) {
    updates.level = newLevel;
  }

  const { error } = await supabase
    .from('user_progress')
    .update(updates)
    .eq('user_id', userId);

  if (error) throw error;
};

export const calculateStreak = async () => {
  const userId = getUserId();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: recentEntries } = await supabase
    .from('mood_entries')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(100);

  if (!recentEntries || recentEntries.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dates = recentEntries.map(e => {
    const d = new Date(e.created_at);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });

  const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedDate = today.getTime() - (i * 24 * 60 * 60 * 1000);

    if (uniqueDates[i] === expectedDate) {
      currentStreak++;
      tempStreak++;
    } else {
      if (currentStreak > 0) {
        break;
      }
    }

    if (i > 0 && uniqueDates[i] === uniqueDates[i - 1] - 24 * 60 * 60 * 1000) {
      tempStreak++;
    } else if (i > 0) {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  const progress = await getUserProgress();

  const { error } = await supabase
    .from('user_progress')
    .update({
      current_streak: currentStreak,
      longest_streak: Math.max(longestStreak, progress.longest_streak || 0)
    })
    .eq('user_id', userId);

  if (error) throw error;

  return { currentStreak, longestStreak };
};
