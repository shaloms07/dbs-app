import PropTypes from 'prop-types';

export default function Badge({ children, label, color = 'grey', className = '', ...props }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    amber: 'bg-amber-100 text-amber-800',
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
