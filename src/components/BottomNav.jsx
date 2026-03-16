import { useLocation, useNavigate } from 'react-router-dom';

const TAB_CONFIG = [
  { id: 'home', path: '/home', icon: '🏠', label: 'Home' },
  { id: 'score', path: '/score', icon: '📊', label: 'Score' },
  { id: 'rewards', path: '/rewards', icon: '🎁', label: 'Rewards' },
  { id: 'profile', path: '/profile', icon: '👤', label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-screen-sm border-t border-neutral-200 bg-white shadow-lg">
      <div className="grid grid-cols-4">
        {TAB_CONFIG.map((tab) => {
          const active = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition-colors ${
                active ? 'bg-brand-50 text-brand-700' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
