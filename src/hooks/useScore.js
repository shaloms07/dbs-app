import { useState, useEffect, useCallback } from 'react';
import { scoreService } from '@services/scoreService';
import { CACHE_KEYS, CACHE_TTL, setCache, getCache } from '@utils/cache';
import { useUser } from '@context/UserContext';
import { getRecordByRegistration } from '@data/mockDbsData';

export function useScore() {
  const { activeVehicle, user } = useUser();
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

      let data;
      if (cached) {
        data = cached;
      } else {
        // Fetch from API/mock
        data = await scoreService.getScore();
        // Cache for 1 hour
        setCache(cacheKey, data, CACHE_TTL.MEDIUM);
      }

      // Calculate user-level driver score (average of all user's vehicles)
      let userScoreVal = data?.current ?? 0;
      const vehicleScores = {};
      if (user?.vehicles && user.vehicles.length > 0) {
        let total = 0;
        let count = 0;
        for (const v of user.vehicles) {
          const rec = getRecordByRegistration(v.registrationNumber);
          if (rec?.score?.current !== undefined) {
            total += rec.score.current;
            vehicleScores[v.registrationNumber.trim().toUpperCase()] = rec.score.current;
            count++;
          }
        }
        if (count > 0) {
          userScoreVal = Math.round(total / count);
        }
      }

      const updatedData = {
        ...data,
        userScore: userScoreVal,
        vehicleScores,
      };

      setScore(updatedData);
    } catch (err) {
      setError(err.message || 'Failed to fetch score');
    } finally {
      setLoading(false);
    }
  }, [registrationNumber, user]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  const refetch = () => {
    fetchScore();
  };

  return { score, loading, error, refetch };
}
