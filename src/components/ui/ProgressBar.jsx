export default function ProgressBar({
  value = 0,
  color = '#0284c7',
  height = 6,
  animated = true,
  ...props
}) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className="w-full bg-neutral-200 rounded-full overflow-hidden"
      style={{ height: `${height}px` }}
      {...props}
    >
      <div
        className={animated ? 'transition-all duration-1000 ease-out' : ''}
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
        }}
      />
    </div>
  );
}
