// src/types.ts

// --- Data Models ---

export interface Treatment {
  id: string;
  name: string;
  category: 'injectable' | 'medium-surgery' | 'heavy-surgery';
  description: string;
  duration: string;
  sessions: string;
  results: string;
  image: string;
  zones: string[];
  gender: ('her' | 'him')[];
  tags: string[];
}

export interface Zone {
  id: string;
  label: string;
  questions: ZoneQuestion[];
}

export interface ZoneQuestion {
  question: string;
  answers: string[];
}

export interface ZoneRule {
  zone: string;
  gender: 'her' | 'him';
  default: string[];
}

export interface AgeRule {
  age: string;
  concern: string;
  gender: 'her' | 'him';
  treatments: string[];
}

export interface RecommendationData {
  zone_rules: ZoneRule[];
  age_rules: AgeRule[];
}

export interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  age: number;
  city: string;
}

// --- Journey State ---

export type Screen =
  | 'arrival'
  | 'gender'
  | 'path'
  | 'silhouette'
  | 'zone-detail'
  | 'life-stage'
  | 'concern'
  | 'recommendations'
  | 'thank-you';

export interface JourneyState {
  screen: Screen;
  history: Screen[];
  gender: 'her' | 'him' | null;
  path: 'zone' | 'age' | null;
  zone: string | null;
  age: string | null;
  concern: string | null;
  zoneAnswers: string[];
  bookingOpen: boolean;
  recommendedTreatmentIds: string[];
}

export type JourneyAction =
  | { type: 'BEGIN' }
  | { type: 'SELECT_GENDER'; gender: 'her' | 'him' }
  | { type: 'SELECT_PATH'; path: 'zone' | 'age' }
  | { type: 'SELECT_ZONE'; zone: string }
  | { type: 'ANSWER_ZONE_QUESTION'; answer: string }
  | { type: 'COMPLETE_ZONE_DETAIL' }
  | { type: 'SELECT_AGE'; age: string }
  | { type: 'SELECT_CONCERN'; concern: string }
  | { type: 'OPEN_BOOKING' }
  | { type: 'CLOSE_BOOKING' }
  | { type: 'BOOKING_COMPLETE' }
  | { type: 'GO_BACK' };

// --- Supabase ---

export interface LeadData {
  name: string;
  whatsapp: string;
  preferred_contact: string;
  gender: string | null;
  path: string | null;
  zone: string | null;
  age: string | null;
  concern: string | null;
  recommendations: string[];
}
