export default function Badge({ children, color = 'grey', ...props }) {
  const colorClasses = {
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-800',
    grey: 'bg-neutral-100 text-neutral-800',
  };

  return (
    <span
      className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${colorClasses[color]}`}
      {...props}
    >
      {children}
    </span>
  );
}
