import PropTypes from 'prop-types';
import { getBand } from '@constants/scoreBands';

export default function ScoreStrip({ score, percentile }) {
  const band = getBand(score);

  return (
    <div className="surface-card-strong rounded-[28px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,241,232,0.92))] px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-3.5 w-3.5">
            <div
              className="absolute inset-0 rounded-full opacity-35 blur-[2px]"
              style={{ backgroundColor: band.color }}
            />
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ backgroundColor: band.color }}
            />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Driving Band
            </p>
            <p className={`text-lg font-bold ${band.tailwind}`}>{band.label}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Percentile
          </p>
          <p className="text-lg font-bold text-neutral-900">Top {100 - percentile}%</p>
        </div>
      </div>
    </div>
  );
}

ScoreStrip.propTypes = {
  score: PropTypes.number.isRequired,
  percentile: PropTypes.number.isRequired,
};
