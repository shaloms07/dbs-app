export default function Skeleton({
  width = '100%',
  height = '1rem',
  rounded = 'md',
  className = '',
  ...props
}) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={`bg-neutral-200 animate-pulse ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
      {...props}
    />
  );
}
