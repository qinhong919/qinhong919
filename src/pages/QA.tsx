import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const qaList = [
  {
    q: '什么是易学？',
    a: '易学是研究"变化"的学问，核心经典是《易经》。它不是算命术，而是古人对天地万物变化规律的系统性总结。好的易学研究者，更像是一个观察变化规律的生态学家，而不是一个预测未来的先知。',
  },
  {
    q: '普通人如何理解传统文化？',
    a: '先放下"传统文化很神秘"这个预设。传统文化首先是生活智慧——怎么处理关系、怎么面对变化、怎么在不确定中做决策。从《论语》的日常对话入手，比从《道德经》的玄妙理论入手要容易得多。',
  },
  {
    q: '为什么不能迷信？',
    a: '迷信的本质是放弃自己的判断力。无论面对什么学说、什么大师，保留一份"先归档，再判断"的态度，是对自己最大的保护。传统文化中真正有价值的东西，经得起质疑。',
  },
  {
    q: '如何看人体科学材料？',
    a: '带着"新闻调查"的眼光去看。问自己三个问题：这个材料的来源是什么？有没有第三方验证？作者的立场是什么？不要因为是"科学"就全盘接受，也不要因为是"超常现象"就一棍子打死。',
  },
  {
    q: '老道如何看现代平台流量？',
    a: '流量是中性的。问题在于是被流量带着跑，还是用流量传递有价值的内容。我选择后者——慢内容、深内容、能留存的内容。平台负责引流，网站负责沉淀。',
  },
  {
    q: '学传统文化最容易踩什么坑？',
    a: '三个坑最常见：一是迷信权威，把师父的话当真理；二是追求神通，忽视了日常功夫；三是急于变现，还没学明白就开始教别人。避开这三个坑，你的学习之路会顺畅很多。',
  },
  {
    q: '你的课程和市面上的国学课有什么不同？',
    a: '三个不同：第一，我有新闻调查的背景，讲东西会先给你看材料，再给你我的判断；第二，我不承诺任何"神通"或"功效"，只讲我能验证的部分；第三，我的课程更像档案导读，目标是培养你自己的判断力，而不是让你依赖我。',
  },
  {
    q: '怎么判断一个传统文化老师靠不靠谱？',
    a: '看他愿不愿意说"我不知道"，看他能不能清楚地说出自己的师承脉络，看他讲的内容能不能溯源到经典原文。这三点都做不到的，建议你保持距离。',
  },
];

export default function QA() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.qa-item') as HTMLElement[];
      items.forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%' },
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
          问老道
        </h1>
        <p
          className="font-sans text-base mt-4"
          style={{ color: 'rgba(17, 17, 17, 0.5)' }}
        >
          沉淀高频问题。不是客服，是筛选器。
        </p>
      </div>

      {/* QA List */}
      <div className="px-[5vw] pb-[15vh]">
        <div className="max-w-[800px] mx-auto">
          {qaList.map((item, i) => (
            <div
              key={i}
              className="qa-item"
              style={{ borderBottom: '1px solid rgba(17, 17, 17, 0.08)' }}
            >
              <button
                className="w-full py-6 flex items-start justify-between gap-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="font-serif text-lg font-semibold flex-shrink-0 mt-0.5"
                    style={{ color: '#8A1C1C' }}
                  >
                    Q{i + 1}
                  </span>
                  <span
                    className="font-serif text-lg font-medium leading-[1.4]"
                    style={{ color: '#111111' }}
                  >
                    {item.q}
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className="flex-shrink-0 mt-1 transition-transform duration-300"
                  style={{
                    color: 'rgba(17, 17, 17, 0.3)',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: openIndex === i ? '500px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                }}
              >
                <div className="pb-6 pl-12">
                  <p
                    className="font-sans text-[15px] leading-[1.8]"
                    style={{ color: 'rgba(17, 17, 17, 0.7)' }}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
