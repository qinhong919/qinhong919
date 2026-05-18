import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['全部', '易学札记', '国学随笔', '人体科学观察', '道家文化', '口述整理', '现实批判'];

const articles = [
  { title: '易学的边界：什么该问，什么不该问', date: '2024.03.15', category: '易学札记', summary: '易学不是算命，是对变化规律的观察。这门学问的边界在哪里，决定了你能从中获得什么……' },
  { title: '师承笔记：一位道家师父的日常修炼', date: '2024.02.28', category: '口述整理', summary: '跟师三年，记录下的不是神通，而是日复一日地站、坐、行、思。这些笔记或许比任何理论都更接近"道"……' },
  { title: '人体科学：为什么我们不能一棍子打死？', date: '2024.01.20', category: '人体科学观察', summary: '八十年代的人体科学研究，有粗糙也有真诚。作为新闻人，我选择先归档，再判断……' },
  { title: '道家文化中的"静"：不是什么都不做', date: '2023.12.05', category: '道家文化', summary: '道家讲"静"，常被误解为消极避世。实则"静"是蓄力，是观变，是在纷繁中找到那个不变的点……' },
  { title: '口述整理：如何记录一位老修行者的日常', date: '2023.11.18', category: '口述整理', summary: '口述史最大的挑战不是记录，而是不评判。你需要先放下自己的认知框架，才能真正听见对方在说什么……' },
  { title: '现实批判：当"国学"成为一门生意', date: '2023.10.30', category: '现实批判', summary: '国学热是好事，但国学产业化值得警惕。当传统文化变成可量化的 KPI，很多东西就变了味……' },
];

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === '全部'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.article-card') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, listRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div>
      {/* Header */}
      <div className="pt-[20vh] pb-[6vh] px-[5vw]">
        <h1
          className="font-serif font-semibold tracking-[-0.02em]"
          style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: '#111111' }}
        >
          老道札记
        </h1>

        {/* Category filter */}
        <div className="flex flex-wrap gap-6 mt-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-sans text-sm font-medium pb-1 transition-colors duration-300 relative"
              style={{
                color: activeCategory === cat ? '#111111' : 'rgba(17, 17, 17, 0.4)',
              }}
            >
              {cat}
              <span
                className="absolute left-0 -bottom-px h-0.5 bg-[#8A1C1C] transition-all duration-300"
                style={{ width: activeCategory === cat ? '100%' : '0%' }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Article List */}
      <div ref={listRef} className="px-[5vw] pb-[15vh]">
        <div className="max-w-[1200px] mx-auto space-y-0">
          {filtered.map((article, i) => (
            <div
              key={i}
              className="article-card flex flex-col lg:flex-row gap-8 py-12"
              style={{ borderBottom: '1px solid rgba(17, 17, 17, 0.08)' }}
            >
              <div className="lg:w-[45%] overflow-hidden aspect-[16/10]">
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
                  className="font-serif text-2xl lg:text-[28px] font-semibold leading-[1.3] mt-3 transition-colors duration-300 hover:text-[#8A1C1C] cursor-pointer"
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
                  className="font-sans text-[15px] leading-[1.8] mt-4 line-clamp-3"
                  style={{ color: 'rgba(17, 17, 17, 0.6)' }}
                >
                  {article.summary}
                </p>
                <Link
                  to="#"
                  className="inline-flex items-center gap-2 mt-6 font-sans text-sm transition-colors duration-300 hover:text-[#8A1C1C]"
                  style={{ color: 'rgba(17, 17, 17, 0.4)' }}
                >
                  阅读全文
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
