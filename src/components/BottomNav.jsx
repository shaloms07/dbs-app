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
    <nav className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-1.5rem)] -translate-x-1/2 md:bottom-5 md:w-[26rem]">
      <div className="grid grid-cols-4 rounded-[28px] border border-white/80 bg-[rgba(255,250,244,0.96)] p-2 shadow-[0_24px_56px_rgba(26,36,40,0.22)] backdrop-blur-2xl">
        {TAB_CONFIG.map((tab) => {
          const active = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-[20px] px-2 py-2 text-[11px] font-semibold transition-all ${
                active
                  ? 'bg-[linear-gradient(135deg,#132c32,#146d67_70%,#1f8f80)] text-white shadow-[0_14px_28px_rgba(20,109,103,0.34)]'
                  : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
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
