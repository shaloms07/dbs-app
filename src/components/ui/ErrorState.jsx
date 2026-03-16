import Button from './Button';

export default function ErrorState({
  message = 'Something went wrong. Please try again.',
  onRetry,
  icon = '⚠️',
  ...props
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center" {...props}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Error</h3>
      <p className="text-neutral-600 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="primary" size="md" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
