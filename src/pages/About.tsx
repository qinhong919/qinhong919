import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '1985', title: '进入新闻行业', desc: '某报社社会线记者' },
  { year: '1995', title: '初接触传统文化', desc: '因缘际会拜入师门' },
  { year: '2005', title: '开始系统研究', desc: '易学、国学、人体科学交叉领域' },
  { year: '2015', title: '转向文化传播', desc: '开设讲座、整理口述档案' },
  { year: '2024', title: '数字化档案建设', desc: '启动个人网站与资料库' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-content', start: 'top 80%' },
      });

      const nodes = gsap.utils.toArray('.timeline-node') as HTMLElement[];
      nodes.forEach((node, i) => {
        gsap.fromTo(node, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.6, delay: i * 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: node, start: 'top 85%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Header */}
      <div className="pt-[20vh] pb-[8vh] px-[5vw]">
        <h1
          className="font-serif font-semibold tracking-[-0.02em]"
          style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: '#111111', maxWidth: '800px' }}
        >
          关于老道
        </h1>
        <p
          className="font-sans text-lg leading-[1.8] tracking-[0.02em] mt-6"
          style={{ color: 'rgba(17, 17, 17, 0.6)', maxWidth: '600px' }}
        >
          从新闻现场到传统文化，从师承口述到经验档案。
        </p>
      </div>

      {/* Bio */}
      <div className="about-content px-[5vw] pb-[15vh]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-20">
          {/* Portrait */}
          <div>
            <div className="overflow-hidden" style={{ border: '1px solid rgba(17, 17, 17, 0.1)' }}>
              <img
                src="/images/portrait.jpg"
                alt="老道覃宏"
                className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['#易学', '#国学', '#人体科学', '#口述档案'].map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-xs px-3 py-1"
                  style={{
                    border: '1px solid rgba(17, 17, 17, 0.15)',
                    color: 'rgba(17, 17, 17, 0.5)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            {[
              {
                heading: '老道是谁',
                text: '老道覃宏，新闻人出身，后半生转入传统文化研究与传播。不做江湖大师，只做民间观察者与档案整理者。',
              },
              {
                heading: '新闻与传统文化背景',
                text: '前半截在新闻现场，跑过社会线、调查过案件、采访过各路人物。这段经历教会我一件事：面对任何现象，先归档，再判断。这个习惯后来被带进了传统文化研究领域。',
              },
              {
                heading: '师承与研究脉络',
                text: '师承道家某支脉，跟随师父学习十余年。记录的不是神通，而是日复一日地站、坐、行、思。这些笔记或许比任何理论都更接近"道"的真实面目。',
              },
              {
                heading: '当前主要工作',
                text: '目前主要从事易学研究、国学传播、人体科学资料整理，以及相关的线下讲座与线上课程。主张：能整理的整理，能验证的验证，不能验证的先放进档案。',
              },
            ].map((section) => (
              <div key={section.heading}>
                <h3
                  className="font-serif text-lg font-semibold mb-3"
                  style={{ color: '#111111' }}
                >
                  {section.heading}
                </h3>
                <p
                  className="font-sans text-base leading-[1.8]"
                  style={{ color: '#111111' }}
                >
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-[5vw] py-[10vh]" style={{ backgroundColor: '#F2F1EE' }}>
        <div className="max-w-[900px] mx-auto">
          <h2
            className="font-serif text-3xl font-semibold mb-16"
            style={{ color: '#111111' }}
          >
            研究脉络
          </h2>

          <div className="relative">
            {/* Central line - desktop */}
            <div
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: 'rgba(17, 17, 17, 0.15)' }}
            />
            {/* Left line - mobile */}
            <div
              className="lg:hidden absolute left-[19px] top-0 bottom-0 w-px"
              style={{ backgroundColor: 'rgba(17, 17, 17, 0.15)' }}
            />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`timeline-node relative flex items-start gap-6 lg:gap-0 ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: '#8A1C1C',
                        borderColor: '#F2F1EE',
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-12 lg:ml-0 lg:w-[45%] ${
                      i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'
                    }`}
                  >
                    <span
                      className="font-serif text-2xl font-semibold"
                      style={{ color: '#8A1C1C' }}
                    >
                      {item.year}
                    </span>
                    <h4
                      className="font-sans text-base font-medium mt-1"
                      style={{ color: '#111111' }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="font-sans text-sm mt-1"
                      style={{ color: 'rgba(17, 17, 17, 0.6)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
