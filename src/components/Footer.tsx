import { Link } from 'react-router';

const footerLinks = [
  { label: '首页', path: '/' },
  { label: '关于老道', path: '/about' },
  { label: '老道札记', path: '/articles' },
  { label: '档案馆', path: '/archive' },
  { label: '课程讲座', path: '/courses' },
  { label: '联系', path: '/contact' },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        borderColor: 'rgba(17, 17, 17, 0.08)',
        backgroundColor: '#F2F1EE',
      }}
    >
      <div className="px-[5vw] py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="font-serif text-2xl font-semibold" style={{ color: '#111111' }}>
              老道覃宏
            </Link>
            <p
              className="mt-4 font-sans text-sm leading-relaxed"
              style={{ color: 'rgba(17, 17, 17, 0.5)' }}
            >
              易学、国学与人体科学的民间观察者、整理者、讲述者。
              能整理的整理，能验证的验证，不能验证的先放进档案。
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-sans text-sm transition-colors duration-300 hover:text-[#8A1C1C]"
                style={{ color: 'rgba(17, 17, 17, 0.5)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(17, 17, 17, 0.06)' }}
        >
          <p className="font-sans text-xs" style={{ color: 'rgba(17, 17, 17, 0.3)' }}>
            &copy; {new Date().getFullYear()} 老道覃宏. 保留所有权利.
          </p>
          <p className="font-sans text-xs" style={{ color: 'rgba(17, 17, 17, 0.3)' }}>
            本网站内容仅供学术研究与文化交流
          </p>
        </div>
      </div>
    </footer>
  );
}
