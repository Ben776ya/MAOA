// src/lib/recommend.test.ts
import { describe, it, expect } from 'vitest';
import { getZoneRecommendations, getAgeRecommendations } from './recommend';

describe('getZoneRecommendations', () => {
  it('returns 3 treatments for eyes/her', () => {
    const result = getZoneRecommendations('eyes', 'her');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('blepharoplastie');
    expect(result[1].id).toBe('botox');
    expect(result[2].id).toBe('acide-hyaluronique');
  });

  it('returns 3 treatments for hair/him', () => {
    const result = getZoneRecommendations('hair', 'him');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('greffe-cheveux');
  });

  it('returns empty array for unknown zone', () => {
    const result = getZoneRecommendations('unknown', 'her');
    expect(result).toEqual([]);
  });

  it('returns different results based on gender', () => {
    const her = getZoneRecommendations('chest', 'her');
    const him = getZoneRecommendations('chest', 'him');
    expect(her[0].id).not.toBe(him[0].id);
  });
});

describe('getAgeRecommendations', () => {
  it('returns 3 treatments for 30s/radiance/her', () => {
    const result = getAgeRecommendations('30s', 'radiance', 'her');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('skin-boosters');
    expect(result[1].id).toBe('mesotherapie');
    expect(result[2].id).toBe('hydrafacial');
  });

  it('returns 3 treatments for 50s/signs/him', () => {
    const result = getAgeRecommendations('50s', 'signs', 'him');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('lifting-cervico-facial');
  });

  it('returns empty array for unknown combination', () => {
    const result = getAgeRecommendations('unknown', 'unknown', 'her');
    expect(result).toEqual([]);
  });
});
