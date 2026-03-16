import PropTypes from 'prop-types';
import { getBand } from '@constants/scoreBands';

export default function ScoreStrip({ score, percentile }) {
  const band = getBand(score);

  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white rounded-lg shadow-sm">
      {/* Band label with pulse dot */}
      <div className="flex items-center gap-3">
        <div className="relative w-3 h-3">
          {/* Outer pulsing ring */}
          <div
            className="absolute inset-0 rounded-full opacity-75 animate-pulse"
            style={{ backgroundColor: band.color }}
          />
          {/* Static inner dot */}
          <div className="absolute inset-1 rounded-full" style={{ backgroundColor: band.color }} />
        </div>
        <div>
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Driving Band</p>
          <p className={`text-lg font-bold ${band.tailwind}`}>{band.label}</p>
        </div>
      </div>

      {/* Percentile info */}
      <div className="text-right">
        <p className="text-xs text-neutral-500 uppercase tracking-wide">Percentile</p>
        <p className="text-lg font-bold text-brand-600">Top {100 - percentile}%</p>
      </div>
    </div>
  );
}

ScoreStrip.propTypes = {
  score: PropTypes.number.isRequired,
  percentile: PropTypes.number.isRequired,
};
