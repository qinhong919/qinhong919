import { useState, useEffect, useRef } from 'react';
import { Mail, Mic, BookOpen, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const directions = [
  { num: '01', title: '讲座邀约', desc: '高校、文化机构、企业内训', icon: <Mic size={18} /> },
  { num: '02', title: '资料合作', desc: '口述史整理、文献数字化', icon: <BookOpen size={18} /> },
  { num: '03', title: '媒体采访', desc: '传统文化、易学、人体科学相关', icon: <Users size={18} /> },
  { num: '04', title: '课程共建', desc: '线上/线下课程联合开发', icon: <Mail size={18} /> },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '讲座邀约',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.contact-card') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });

      const dirs = gsap.utils.toArray('.direction-card') as HTMLElement[];
      dirs.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="pt-[20vh] pb-[6vh] px-[5vw]">
        <h1
          className="font-serif font-semibold tracking-[-0.02em]"
          style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: '#111111' }}
        >
          联系老道
        </h1>
        <p
          className="font-sans text-base mt-4"
          style={{ color: 'rgba(17, 17, 17, 0.5)' }}
        >
          讲座邀约 · 资料整理合作 · 媒体采访 · 学习咨询
        </p>
      </div>

      {/* Contact Form + QR */}
      <div className="px-[5vw] pb-[10vh]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left - QR codes */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-8" style={{ color: '#111111' }}>
              关注与联系
            </h3>

            <div className="space-y-6">
              <div
                className="contact-card p-6 flex items-center gap-6"
                style={{ border: '1px solid rgba(17, 17, 17, 0.1)' }}
              >
                <div
                  className="w-20 h-20 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(17, 17, 17, 0.05)' }}
                >
                  <span className="font-serif text-xs" style={{ color: 'rgba(17, 17, 17, 0.3)' }}>
                    二维码
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm font-medium" style={{ color: '#111111' }}>
                    微信公众号
                  </p>
                  <p className="font-sans text-xs mt-1" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                    扫码关注老道覃宏
                  </p>
                </div>
              </div>

              <div
                className="contact-card p-6 flex items-center gap-6"
                style={{ border: '1px solid rgba(17, 17, 17, 0.1)' }}
              >
                <div
                  className="w-20 h-20 flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(17, 17, 17, 0.05)' }}
                >
                  <span className="font-serif text-xs" style={{ color: 'rgba(17, 17, 17, 0.3)' }}>
                    二维码
                  </span>
                </div>
                <div>
                  <p className="font-sans text-sm font-medium" style={{ color: '#111111' }}>
                    微信视频号
                  </p>
                  <p className="font-sans text-xs mt-1" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                    扫码关注老道开讲
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-sans text-sm" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                或发送邮件至{' '}
                <a
                  href="mailto:laodao@example.com"
                  className="underline transition-colors duration-300 hover:text-[#8A1C1C]"
                  style={{ color: '#111111' }}
                >
                  laodao@example.com
                </a>
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-8" style={{ color: '#111111' }}>
              发送消息
            </h3>

            {submitted ? (
              <div
                className="p-8 text-center"
                style={{ backgroundColor: 'rgba(138, 28, 28, 0.04)', border: '1px solid rgba(138, 28, 28, 0.15)' }}
              >
                <p className="font-serif text-lg font-semibold" style={{ color: '#8A1C1C' }}>
                  消息已发送
                </p>
                <p className="font-sans text-sm mt-2" style={{ color: 'rgba(17, 17, 17, 0.6)' }}>
                  感谢你的联系，我会尽快回复。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="姓名"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full py-3 bg-transparent font-sans text-[15px] outline-none transition-colors duration-300 focus:border-[#8A1C1C]"
                    style={{
                      borderBottom: '1px solid rgba(17, 17, 17, 0.2)',
                      color: '#111111',
                    }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="邮箱"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full py-3 bg-transparent font-sans text-[15px] outline-none transition-colors duration-300 focus:border-[#8A1C1C]"
                    style={{
                      borderBottom: '1px solid rgba(17, 17, 17, 0.2)',
                      color: '#111111',
                    }}
                  />
                </div>
                <div>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full py-3 bg-transparent font-sans text-[15px] outline-none transition-colors duration-300 focus:border-[#8A1C1C] cursor-pointer"
                    style={{
                      borderBottom: '1px solid rgba(17, 17, 17, 0.2)',
                      color: '#111111',
                    }}
                  >
                    <option>讲座邀约</option>
                    <option>资料合作</option>
                    <option>媒体采访</option>
                    <option>学习咨询</option>
                    <option>其他</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="消息内容"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full py-3 bg-transparent font-sans text-[15px] outline-none resize-none transition-colors duration-300 focus:border-[#8A1C1C]"
                    style={{
                      borderBottom: '1px solid rgba(17, 17, 17, 0.2)',
                      color: '#111111',
                      minHeight: '120px',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="font-sans text-sm font-medium px-12 py-3.5 text-white transition-colors duration-300 hover:bg-[#8A1C1C]"
                  style={{ backgroundColor: '#111111' }}
                >
                  发送
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Cooperation directions */}
      <div
        className="px-[5vw] py-[10vh]"
        style={{
          borderTop: '1px solid rgba(17, 17, 17, 0.1)',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="font-serif text-3xl font-semibold mb-10"
            style={{ color: '#111111' }}
          >
            合作方向
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {directions.map((dir, i) => (
              <div
                key={i}
                className="direction-card p-6 transition-all duration-300"
                style={{ border: '1px solid rgba(17, 17, 17, 0.1)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138, 28, 28, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(17, 17, 17, 0.1)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="font-serif text-4xl font-semibold"
                    style={{ color: 'rgba(17, 17, 17, 0.08)' }}
                  >
                    {dir.num}
                  </span>
                  <span style={{ color: 'rgba(17, 17, 17, 0.2)' }}>{dir.icon}</span>
                </div>
                <h4
                  className="font-sans text-base font-medium"
                  style={{ color: '#111111' }}
                >
                  {dir.title}
                </h4>
                <p
                  className="font-sans text-sm mt-2"
                  style={{ color: 'rgba(17, 17, 17, 0.5)' }}
                >
                  {dir.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
