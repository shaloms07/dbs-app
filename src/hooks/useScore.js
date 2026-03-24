import { useState, useEffect, useCallback } from 'react';
import { scoreService } from '@services/scoreService';
import { CACHE_KEYS, CACHE_TTL, setCache, getCache } from '@utils/cache';
import { useUser } from '@context/UserContext';

export function useScore() {
  const { activeVehicle } = useUser();
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const registrationNumber = activeVehicle?.registrationNumber;

  const fetchScore = useCallback(async () => {
    if (!registrationNumber) {
      setScore(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = `${CACHE_KEYS.SCORE}_${registrationNumber}`;
      const cached = getCache(cacheKey);
      if (cached) {
        setScore(cached);
        setLoading(false);
        return;
      }

      // Fetch from API/mock
      const data = await scoreService.getScore();
      setScore(data);

      // Cache for 1 hour
      setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    } catch (err) {
      setError(err.message || 'Failed to fetch score');
    } finally {
      setLoading(false);
    }
  }, [registrationNumber]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  const refetch = () => {
    fetchScore();
  };

  return { score, loading, error, refetch };
}
