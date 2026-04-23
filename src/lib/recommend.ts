// src/lib/recommend.ts
import type { Treatment, RecommendationData } from '../types';
import treatmentsData from '../data/treatments.json';
import recommendationsData from '../data/recommendations.json';

const treatments = treatmentsData as Treatment[];
const recommendations = recommendationsData as RecommendationData;

export function getZoneRecommendations(
  zone: string,
  gender: 'her' | 'him'
): Treatment[] {
  const rule = recommendations.zone_rules.find(
    (r) => r.zone === zone && r.gender === gender
  );
  if (!rule) return [];
  return rule.default
    .map((id) => treatments.find((t) => t.id === id))
    .filter((t): t is Treatment => t !== undefined);
}

export function getAgeRecommendations(
  age: string,
  concern: string,
  gender: 'her' | 'him'
): Treatment[] {
  const rule = recommendations.age_rules.find(
    (r) => r.age === age && r.concern === concern && r.gender === gender
  );
  if (!rule) return [];
  return rule.treatments
    .map((id) => treatments.find((t) => t.id === id))
    .filter((t): t is Treatment => t !== undefined);
}
