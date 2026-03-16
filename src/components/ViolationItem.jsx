import { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@components/ui/Badge';

export default function ViolationItem({ violation, onDisputeTap }) {
  const [expanded, setExpanded] = useState(false);

  const impactColor =
    violation.impactLevel === 'high'
      ? 'red'
      : violation.impactLevel === 'medium'
        ? 'amber'
        : 'green';

  return (
    <div
      className={`border-l-4 p-4 ${violation.isAgedOut ? 'border-neutral-300 bg-neutral-50 opacity-70' : 'border-brand-500 bg-white'}`}
    >
      <button
        onClick={() => setExpanded((current) => !current)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-semibold text-neutral-900">{violation.type}</h3>
            {violation.timeHazardZone && !violation.isAgedOut && (
              <Badge color="red">Peak risk</Badge>
            )}
            {violation.isAgedOut && <Badge color="grey">Aged out</Badge>}
          </div>
          <p className="text-sm text-neutral-600">
            {new Date(violation.date).toLocaleDateString('en-IN')}
          </p>
          <p className="text-sm text-neutral-500">{violation.location}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge color={impactColor}>{violation.scoreImpact} pts</Badge>
          <span className="text-xs text-neutral-500">{expanded ? 'Hide' : 'View'}</span>
        </div>
      </button>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-neutral-200 pt-4 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-neutral-500">Challan No.</p>
              <p className="font-mono font-semibold text-neutral-900">{violation.challanNumber}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Fine</p>
              <p className="font-semibold text-neutral-900">Rs {violation.amount}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-neutral-500">Status</span>
            <Badge
              color={
                violation.status === 'paid'
                  ? 'green'
                  : violation.status === 'disputed'
                    ? 'blue'
                    : 'amber'
              }
            >
              {violation.status}
            </Badge>
          </div>

          {!violation.isAgedOut && !violation.isDisputed && violation.status === 'active' && (
            <button
              onClick={() => onDisputeTap?.(violation)}
              className="rounded-lg bg-brand-50 px-3 py-2 font-semibold text-brand-700 hover:bg-brand-100"
            >
              Dispute this challan
            </button>
          )}
        </div>
      )}
    </div>
  );
}

ViolationItem.propTypes = {
  violation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    challanNumber: PropTypes.string.isRequired,
    scoreImpact: PropTypes.number.isRequired,
    impactLevel: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    timeHazardZone: PropTypes.bool,
    isAgedOut: PropTypes.bool,
    isDisputed: PropTypes.bool,
    status: PropTypes.oneOf(['active', 'paid', 'disputed', 'expired']).isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  onDisputeTap: PropTypes.func,
};
