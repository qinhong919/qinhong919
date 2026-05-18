import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '关于', path: '/about' },
  { label: '札记', path: '/articles' },
  { label: '档案', path: '/archive' },
  { label: '课程', path: '/courses' },
  { label: '影像', path: '/videos' },
  { label: '问答', path: '/qa' },
  { label: '联系', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const showBg = scrolled || !isHome;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: showBg ? 'rgba(242, 241, 238, 0.92)' : 'transparent',
          backdropFilter: showBg ? 'blur(12px)' : 'none',
          borderBottom: showBg ? '1px solid rgba(17,17,17,0.06)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center justify-between h-16 px-[5vw]">
          <Link
            to="/"
            className="font-serif text-lg font-semibold tracking-tight"
            style={{ color: '#111111' }}
          >
            老道覃宏
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group font-sans text-[13px] font-medium tracking-[0.05em] transition-colors duration-300"
                style={{
                  color: location.pathname === link.path ? '#8A1C1C' : '#111111',
                }}
              >
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 h-px bg-[#8A1C1C] transition-all duration-300 ease-out"
                  style={{
                    width: location.pathname === link.path ? '100%' : '0%',
                  }}
                />
                <span className="absolute left-0 -bottom-1 h-px bg-[#8A1C1C] w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: 'rgba(242, 241, 238, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-serif text-2xl font-semibold transition-colors duration-300"
              style={{
                color: location.pathname === link.path ? '#8A1C1C' : '#111111',
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
