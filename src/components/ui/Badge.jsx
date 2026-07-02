import PropTypes from 'prop-types';

export default function Badge({ children, label, color = 'grey', className = '', ...props }) {
  const colorClasses = {
    green: 'bg-brand-100 text-brand-700',
    blue: 'bg-sky-100 text-sky-800',
    amber: 'bg-cyan-100 text-cyan-800',
    red: 'bg-red-100 text-red-800',
    grey: 'bg-neutral-100 text-neutral-800',
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
