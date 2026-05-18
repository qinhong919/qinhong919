import { useEffect, useRef } from 'react';
import { MessageSquare, FileText, Users, BookOpen, Image, FileArchive } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const archiveCategories = [
  { icon: <MessageSquare size={20} />, title: '访谈整理', desc: '与修行者、研究者、亲历者的对话记录', count: 12 },
  { icon: <FileText size={20} />, title: '历史资料', desc: '人体科学研究相关文献与档案', count: 28 },
  { icon: <Users size={20} />, title: '人物口述', desc: '老修行者的经验与回忆', count: 8 },
  { icon: <BookOpen size={20} />, title: '研究笔记', desc: '个人研究过程中的思考与记录', count: 35 },
  { icon: <Image size={20} />, title: '老照片', desc: '历史影像资料', count: 15 },
  { icon: <FileArchive size={20} />, title: '旧文扫描', desc: '稀有文献扫描件', count: 6 },
];

export default function Archive() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.archive-card') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="pt-[20vh] pb-[6vh] px-[5vw]">
        <h1
          className="font-serif font-semibold tracking-[-0.02em]"
          style={{ fontSize: 'clamp(36px, 4.5vw, 48px)', color: '#111111' }}
        >
          人体科学与传统文化档案馆
        </h1>
        <p
          className="font-sans text-base mt-4"
          style={{ color: 'rgba(17, 17, 17, 0.5)' }}
        >
          访谈整理 · 历史资料 · 人物口述 · 研究笔记
        </p>
      </div>

      {/* Featured image banner */}
      <div className="px-[5vw] mb-8">
        <div className="overflow-hidden aspect-[21/9]">
          <img
            src="/images/archive-02.jpg"
            alt="档案馆"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Categories grid */}
      <div className="px-[5vw] pb-[15vh]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archiveCategories.map((cat, i) => (
            <div
              key={i}
              className="archive-card p-8 cursor-pointer transition-all duration-300"
              style={{ border: '1px solid rgba(17, 17, 17, 0.1)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138, 28, 28, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(17, 17, 17, 0.1)';
              }}
            >
              <span
                className="font-serif text-5xl font-semibold"
                style={{ color: 'rgba(17, 17, 17, 0.08)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-4 mb-3" style={{ color: '#8A1C1C' }}>
                {cat.icon}
              </div>
              <h3
                className="font-serif text-xl font-semibold"
                style={{ color: '#111111' }}
              >
                {cat.title}
              </h3>
              <p
                className="font-sans text-sm leading-[1.8] mt-3"
                style={{ color: 'rgba(17, 17, 17, 0.6)' }}
              >
                {cat.desc}
              </p>
              <p
                className="font-sans text-xs mt-4"
                style={{ color: 'rgba(17, 17, 17, 0.3)' }}
              >
                {cat.count} 条目
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
