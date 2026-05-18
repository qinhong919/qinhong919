import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronDown, BookOpen, FolderOpen, GraduationCap } from 'lucide-react';
import TaoistGlow from '../components/TaoistGlow';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    title: '易学的边界：什么该问，什么不该问',
    date: '2024.03.15',
    summary: '易学不是算命，是对变化规律的观察。这门学问的边界在哪里，决定了你能从中获得什么……',
    category: '易学札记',
  },
  {
    title: '师承笔记：一位道家师父的日常修炼',
    date: '2024.02.28',
    summary: '跟师三年，记录下的不是神通，而是日复一日地站、坐、行、思。这些笔记或许比任何理论都更接近"道"……',
    category: '口述整理',
  },
  {
    title: '人体科学：为什么我们不能一棍子打死？',
    date: '2024.01.20',
    summary: '八十年代的人体科学研究，有粗糙也有真诚。作为新闻人，我选择先归档，再判断……',
    category: '人体科学观察',
  },
];

const archiveImages = [
  { src: '/images/archive-01.jpg', label: 'ARCHIVE / 01 — 师承口述' },
  { src: '/images/archive-02.jpg', label: 'ARCHIVE / 02 — 研究笔记' },
  { src: '/images/archive-03.jpg', label: 'ARCHIVE / 03 — 口述档案' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const gatewaysRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.5 });
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.8 });

      // Archive scroll parallax
      const archiveItems = gsap.utils.toArray('.archive-item') as HTMLElement[];
      archiveItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 80, opacity: 0, rotateZ: i === 0 ? -3 : i === 2 ? 3 : 0 },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      });

      // Article items
      const articleItems = gsap.utils.toArray('.article-item') as HTMLElement[];
      articleItems.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Video section
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Gateway cards
      const gatewayCards = gsap.utils.toArray('.gateway-card') as HTMLElement[];
      gatewayCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden"
      >
        <TaoistGlow />
        <div className="relative z-10 pb-[15vh] px-[5vw]">
          <h1
            className="hero-title font-serif font-semibold leading-[1.1] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(36px, 6vw, 90px)',
              color: '#111111',
              maxWidth: '60vw',
              wordBreak: 'keep-all',
            }}
          >
            民间学者与传统文化档案馆
          </h1>
          <p
            className="hero-subtitle mt-6 font-sans text-base leading-[1.8] tracking-[0.02em]"
            style={{
              color: 'rgba(17, 17, 17, 0.7)',
              maxWidth: '480px',
            }}
          >
            从新闻现场，到传统文化；从师承口述，到经验档案。
          </p>
          <div className="hero-cta flex flex-wrap gap-6 mt-10">
            <Link
              to="/articles"
              className="group font-sans text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300"
              style={{ color: '#111111' }}
            >
              阅读札记
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              <span className="block h-px w-full bg-current transition-all duration-300" />
            </Link>
            <Link
              to="/courses"
              className="group font-sans text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#8A1C1C]"
              style={{ color: 'rgba(17, 17, 17, 0.5)' }}
            >
              了解课程
              <span className="block h-px w-0 group-hover:w-full bg-current transition-all duration-300" />
            </Link>
            <Link
              to="/contact"
              className="group font-sans text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#8A1C1C]"
              style={{ color: 'rgba(17, 17, 17, 0.5)' }}
            >
              联系老道
              <span className="block h-px w-0 group-hover:w-full bg-current transition-all duration-300" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-float" style={{ color: 'rgba(17, 17, 17, 0.3)' }}>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ===== ARCHIVE SCROLL ===== */}
      <section
        ref={archiveRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: '#F2F1EE', padding: '15vh 0' }}
      >
        <div className="px-[5vw] mb-12">
          <h2
            className="font-serif text-3xl font-semibold tracking-tight"
            style={{ color: '#111111' }}
          >
            档案馆精选
          </h2>
        </div>
        <div className="flex flex-col gap-8 px-[5vw]">
          {archiveImages.map((img, i) => (
            <div
              key={i}
              className="archive-item relative overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span
                    className="font-sans text-xs font-medium tracking-[0.15em] uppercase px-4 py-1.5"
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LATEST WRITINGS ===== */}
      <section
        ref={articlesRef}
        className="relative"
        style={{ backgroundColor: '#F2F1EE', padding: '10vh 5vw 15vh' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left sidebar */}
            <div className="lg:w-[200px] lg:flex-shrink-0">
              <div className="lg:sticky lg:top-[120px]">
                <h3
                  className="font-serif text-xl font-semibold mb-6"
                  style={{ color: '#111111' }}
                >
                  札记分类
                </h3>
                <ul className="space-y-3">
                  {['易学札记', '国学随笔', '人体科学观察', '道家文化', '口述整理'].map(
                    (cat, i) => (
                      <li
                        key={cat}
                        className="font-sans text-sm font-medium transition-colors duration-300 cursor-pointer"
                        style={{
                          color: i === 0 ? '#111111' : 'rgba(17, 17, 17, 0.4)',
                          paddingLeft: i === 0 ? '12px' : '0',
                          borderLeft: i === 0 ? '2px solid #8A1C1C' : '2px solid transparent',
                        }}
                      >
                        {cat}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Right articles */}
            <div className="flex-1 space-y-0">
              {articles.map((article, i) => (
                <div
                  key={i}
                  className="article-item flex flex-col lg:flex-row gap-8 py-12"
                  style={{
                    borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
                  }}
                >
                  <div className="lg:w-[55%] overflow-hidden aspect-[16/10]">
                    <img
                      src="/images/article-thumb.jpg"
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <span
                      className="font-sans text-xs font-medium tracking-[0.05em]"
                      style={{ color: '#8A1C1C' }}
                    >
                      {article.category}
                    </span>
                    <h3
                      className="font-serif text-2xl font-semibold leading-[1.3] mt-3 transition-colors duration-300 hover:text-[#8A1C1C] cursor-pointer"
                      style={{ color: '#111111' }}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="font-sans text-xs mt-3"
                      style={{ color: 'rgba(17, 17, 17, 0.4)' }}
                    >
                      {article.date}
                    </p>
                    <p
                      className="font-sans text-sm leading-[1.8] mt-4 line-clamp-2"
                      style={{ color: 'rgba(17, 17, 17, 0.6)' }}
                    >
                      {article.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ORAL HISTORY VIDEO ===== */}
      <section
        className="relative flex items-center justify-center"
        style={{ backgroundColor: '#0D0D0D', padding: '10vh 5vw' }}
      >
        <div className="w-full max-w-[1200px]">
          <h2
            className="font-serif text-2xl font-semibold mb-6"
            style={{ color: '#FFFFFF' }}
          >
            老道开讲
          </h2>
          <div
            ref={videoRef}
            className="relative aspect-video overflow-hidden group"
            style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            <img
              src="/images/archive-01.jpg"
              alt="口述影像"
              className="w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-110"
              >
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-6">
              <p
                className="font-sans text-xs"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                影像档案：关于经脉络与日常修炼的片段
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THREE GATEWAYS ===== */}
      <section
        ref={gatewaysRef}
        className="relative"
        style={{ backgroundColor: '#F2F1EE', padding: '15vh 5vw' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={24} />,
                title: '老道札记',
                desc: '易学、国学、人体科学观察与随笔',
                link: '/articles',
              },
              {
                icon: <FolderOpen size={24} />,
                title: '档案馆',
                desc: '访谈整理、历史资料、人物口述与研究笔记',
                link: '/archive',
              },
              {
                icon: <GraduationCap size={24} />,
                title: '课程与讲座',
                desc: '线下讲座、线上课程、主题沙龙与私人咨询',
                link: '/courses',
              },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.link}
                className="gateway-card block p-8 transition-all duration-400 hover:bg-[rgba(138,28,28,0.03)]"
                style={{
                  border: '1px solid rgba(17, 17, 17, 0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138, 28, 28, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(17, 17, 17, 0.1)';
                }}
              >
                <div style={{ color: '#8A1C1C' }} className="mb-4">
                  {card.icon}
                </div>
                <h3
                  className="font-serif text-xl font-semibold"
                  style={{ color: '#111111' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-sans text-sm leading-[1.8] mt-3"
                  style={{ color: 'rgba(17, 17, 17, 0.6)' }}
                >
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Closing quote */}
          <div className="mt-20 text-center">
            <p
              className="font-serif text-xl font-semibold italic"
              style={{ color: '#111111' }}
            >
              能整理的整理，能验证的验证，不能验证的先放进档案。
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="font-sans text-sm" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                扫码关注微信公众号
              </p>
              <div
                className="w-24 h-24 mt-2"
                style={{ backgroundColor: 'rgba(17, 17, 17, 0.05)' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
