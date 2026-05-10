export type User = {
  id: number;
  name: string;
  email: string;
};

export type MoodEntry = {
  user_id: number;
  mood_level: number;
  date: string;
};

export type JournalEntry = {
  user_id: number;
  content: string;
  date: string;
};
