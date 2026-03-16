export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateIN(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function maskString(str, visibleStart = 6, visibleEnd = 4) {
  if (str == null) return str;
  if (str.length <= visibleStart + visibleEnd) return str;
  return `${str.slice(0, visibleStart)}${'*'.repeat(str.length - visibleStart - visibleEnd)}${str.slice(-visibleEnd)}`;
}

export function daysUntil(targetDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

export function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minute${seconds < 120 ? '' : 's'} ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${seconds < 7200 ? '' : 's'} ago`;
  if (seconds < 2592000)
    return `${Math.floor(seconds / 86400)} day${seconds < 172800 ? '' : 's'} ago`;
  if (seconds < 31536000)
    return `${Math.floor(seconds / 2592000)} month${seconds < 5184000 ? '' : 's'} ago`;
  return `${Math.floor(seconds / 31536000)} year${seconds < 63072000 ? '' : 's'} ago`;
}
