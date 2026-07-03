import { useLocation, useNavigate } from 'react-router-dom';

const TAB_CONFIG = [
  {
    id: 'home',
    path: '/home',
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: 'Home',
  },
  {
    id: 'score',
    path: '/score',
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 0 0-10 10c0 2.25.75 4.33 2 6l2-2a6 6 0 1 1 12 0l2 2a10 10 0 0 0 2-6A10 10 0 0 0 12 2z" />
        <path d="m12 13 4-4" />
        <circle cx="12" cy="13" r="1.5" />
      </svg>
    ),
    label: 'Score',
  },
  {
    id: 'rewards',
    path: '/rewards',
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect width="20" height="5" x="2" y="7" rx="1" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    label: 'Rewards',
  },
  {
    id: 'insurance',
    path: '/insurance',
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'Insurance',
  },
  {
    id: 'profile',
    path: '/profile',
    icon: (active) => (
      <svg
        className={`h-5 w-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-105'}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    label: 'Profile',
  },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-1.5rem)] -translate-x-1/2 md:bottom-5 md:w-[26rem]">
      <div className="grid grid-cols-5 rounded-[28px] border border-white/80 bg-white/95 p-2 shadow-[0_24px_56px_rgba(0,40,96,0.18)] backdrop-blur-2xl">
        {TAB_CONFIG.map((tab) => {
          const active = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`group flex min-h-[60px] flex-col items-center justify-center gap-1.5 rounded-[20px] px-2 py-2 text-[10px] font-bold tracking-wide transition-all ${
                active
                  ? 'bg-[linear-gradient(135deg,#273471,#0058D1_70%,#00D3FF)] text-white shadow-[0_14px_28px_rgba(0,88,209,0.3)]'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <span aria-hidden="true">{tab.icon(active)}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
