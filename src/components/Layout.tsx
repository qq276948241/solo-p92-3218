import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Plus, BookA } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const showAddButton = location.pathname !== '/add';

  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-milk/85 border-b border-brown/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              aria-label="返回首页"
            >
              <div
                className="w-9 h-9 rounded-xl bg-brown text-milk flex items-center justify-center
                           shadow-paper group-hover:shadow-paper-hover transition-all"
              >
                <BookA size={20} strokeWidth={2.2} />
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-ink leading-none tracking-wide text-shadow-soft">
                  杯测日记
                </div>
                <div className="text-[10px] text-ink/50 mt-0.5 tracking-widest uppercase">
                  Cup Diary
                </div>
              </div>
            </Link>

            {showAddButton && (
              <Link to="/add" className="btn-primary text-sm">
                <Plus size={18} strokeWidth={2.4} />
                <span>加新店</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="mt-12 border-t border-brown/10 bg-milk/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs text-ink/50 font-serif tracking-wider">
            ☕ 记录每一杯的温度 · 杯测日记
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
