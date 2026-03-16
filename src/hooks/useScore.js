import { useState, useEffect } from 'react';
import { scoreService } from '@services/scoreService';
import { CACHE_KEYS, CACHE_TTL, setCache, getCache } from '@utils/cache';

export function useScore() {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScore = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cached = getCache(CACHE_KEYS.SCORE);
      if (cached) {
        setScore(cached);
        setLoading(false);
        return;
      }

      // Fetch from API/mock
      const data = await scoreService.getScore();
      setScore(data);

      // Cache for 1 hour
      setCache(CACHE_KEYS.SCORE, data, CACHE_TTL.MEDIUM);
    } catch (err) {
      setError(err.message || 'Failed to fetch score');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore();
  }, []);

  const refetch = () => {
    fetchScore();
  };

  return { score, loading, error, refetch };
}
