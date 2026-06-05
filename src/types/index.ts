export type Weather = 'sunny' | 'rainy' | 'snow' | 'cloudy' | 'windy';

export type Place =
  | 'home' | 'office' | 'hotel' | 'airport' | 'train'
  | 'cafe' | 'hospital' | 'unknown_city' | 'hometown' | 'dont_belong';

export type Mood =
  | 'peaceful' | 'lonely' | 'excited' | 'nostalgic' | 'heartbroken'
  | 'burned_out' | 'anxious' | 'cant_sleep' | 'missing_someone'
  | 'want_to_disappear' | 'need_motivation' | 'just_want_silence'
  | 'grateful' | 'hopeful' | 'content' | 'curious' | 'inspired' | 'loved';

export type BodyState =
  | 'havent_slept_well' | 'headache' | 'too_much_coffee' | 'ate_too_much'
  | 'havent_eaten' | 'a_little_drunk' | 'sick' | 'long_day_at_work'
  | 'havent_pooped' | 'just_cleaned_room' | 'going_through_breakup' | 'about_to_quit_job';

export type SocialEnergy = 'alone' | 'one_close_friend' | 'family' | 'crowded_city' | 'nobody_talks';

export interface HumanState {
  weather: Weather;
  place: Place;
  mood: Mood;
  body: BodyState[];
  social: SocialEnergy;
  time: string;
}

export interface StateVector {
  lonely: number; need_comfort: number; temporary_life: number; body_discomfort: number;
  humor_needed: number; healing: number; small_happiness: number; alone: number;
  quiet: number; night: number; routine: number; hope: number; family: number;
  funny: number; broken_life: number; energy: number; nostalgia: number;
  romance: number; adventure: number; acceptance: number; catharsis: number;
}

export interface Movie {
  cast?: string[];
  id: string; title: string; year: number; director: string;
  poster: string; description: string; reason: string;
  human_tags: string[]; human_vector: Partial<StateVector>;
  isEasterEgg?: boolean; easterEggMessage?: string;
}

export interface MatchResult {
  movie: Movie; score: number;
  matchBreakdown: { tag: string; score: number }[];
}
