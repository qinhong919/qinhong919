import { useEffect, useRef, useState } from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    title: '易学入门：乾卦的六种变化',
    duration: '12:34',
    views: '2.3k',
    date: '2024.03.10',
    summary: '乾卦不是一条直线向上，它有六种不同的变化阶段。看懂这六个阶段，你就看懂了大半个人生起伏的规律。',
  },
  {
    title: '口述档案：一位八旬修行者的回忆',
    duration: '28:15',
    views: '1.8k',
    date: '2024.02.20',
    summary: '跟拍三个月，记录下一位八旬老人从青年时代开始的修行经历。没有奇迹，只有日复一日的坚持。',
  },
  {
    title: '人体科学：507所的故事',
    duration: '18:42',
    views: '3.1k',
    date: '2024.01.15',
    summary: '五零七所，全称"中国科学院高能物理研究所人体科学组"。这个名字背后，是一段鲜为人知的研究历史。',
  },
  {
    title: '师承笔记：师父教我的第一课',
    duration: '08:56',
    views: '4.5k',
    date: '2023.12.28',
    summary: '师父说：学东西之前，先学会站。站不稳的人，坐不住；坐不住的人，静不下来。',
  },
];

export default function Videos() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.video-card') as HTMLElement[];
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
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
          style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: '#111111' }}
        >
          老道开讲
        </h1>
        <p
          className="font-sans text-base mt-4"
          style={{ color: 'rgba(17, 17, 17, 0.5)' }}
        >
          视频号内容、直播回放、访谈片段与讲座音频
        </p>
      </div>

      {/* Featured Video */}
      <div className="px-[5vw] mb-16">
        <div
          className="relative aspect-video max-w-[1000px] mx-auto overflow-hidden group cursor-pointer"
          style={{ border: '1px solid rgba(17, 17, 17, 0.1)' }}
          onClick={() => setPlaying(playing === 0 ? null : 0)}
        >
          <img
            src="/images/archive-01.jpg"
            alt="featured"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {playing === 0 ? (
                <div className="flex gap-1">
                  <div className="w-1.5 h-5 bg-white" />
                  <div className="w-1.5 h-5 bg-white" />
                </div>
              ) : (
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
              )}
            </div>
          </div>
          <div className="absolute bottom-4 left-6">
            <p className="font-sans text-xs text-white/60">
              影像档案：关于经脉络与日常修炼的片段
            </p>
          </div>
        </div>
      </div>

      {/* Video List */}
      <div className="px-[5vw] pb-[15vh]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, i) => (
            <div
              key={i}
              className="video-card cursor-pointer group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={`/images/archive-0${(i % 3) + 1}.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60">
                  <span className="font-sans text-xs text-white">{video.duration}</span>
                </div>
              </div>

              <div className="mt-4">
                <h3
                  className="font-serif text-lg font-semibold leading-[1.3] transition-colors duration-300 group-hover:text-[#8A1C1C]"
                  style={{ color: '#111111' }}
                >
                  {video.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-sans text-xs flex items-center gap-1" style={{ color: 'rgba(17, 17, 17, 0.4)' }}>
                    <Clock size={11} /> {video.date}
                  </span>
                  <span className="font-sans text-xs flex items-center gap-1" style={{ color: 'rgba(17, 17, 17, 0.4)' }}>
                    <Eye size={11} /> {video.views}
                  </span>
                </div>
                <p
                  className="font-sans text-sm leading-[1.8] mt-3 line-clamp-2"
                  style={{ color: 'rgba(17, 17, 17, 0.6)' }}
                >
                  {video.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
