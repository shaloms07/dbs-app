import PropTypes from 'prop-types';

export default function Badge({ children, label, color = 'grey', className = '', ...props }) {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-800',
    blue: 'bg-sky-100 text-sky-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-800',
    grey: 'bg-[rgba(248,243,236,0.92)] text-neutral-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children ?? label}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  color: PropTypes.oneOf(['green', 'blue', 'amber', 'red', 'grey']),
  className: PropTypes.string,
};
