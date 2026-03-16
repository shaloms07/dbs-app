import PropTypes from 'prop-types';

const CATEGORY_STYLES = {
  signal: 'border-red-400 bg-red-50',
  helmet: 'border-amber-400 bg-amber-50',
  speed: 'border-orange-400 bg-orange-50',
  phone: 'border-blue-400 bg-blue-50',
  seatbelt: 'border-emerald-400 bg-emerald-50',
  other: 'border-neutral-400 bg-neutral-50',
};

export default function TipCard({ tip }) {
  return (
    <article
      className={`rounded-2xl border-l-4 p-4 ${CATEGORY_STYLES[tip.category] ?? CATEGORY_STYLES.other}`}
    >
      <div className="mb-2 flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">
          {tip.icon}
        </span>
        <div>
          <h3 className="font-semibold text-neutral-900">{tip.title}</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-700">{tip.description}</p>
        </div>
      </div>
    </article>
  );
}

TipCard.propTypes = {
  tip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};
