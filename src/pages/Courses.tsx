import { useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    tag: '线下讲座',
    title: '易学入门：从《易经》到生活实践',
    audience: '对易学感兴趣但无从入门的普通人',
    time: '每月第二个周六 · 下午2-5点',
    location: '北京（具体地址报名后通知）',
    desc: '这门课不讲神通，不讲预测，只讲《易经》的思维方式如何帮助你看清变化的规律。三小时，带你读完乾卦到坤卦的核心逻辑。',
    tags: ['易学', '入门', '线下'],
  },
  {
    tag: '线上课程',
    title: '人体科学资料导读',
    audience: '对八十年代人体科学研究感兴趣的研究者与好奇者',
    time: '已录播，随时可学',
    location: '线上',
    desc: '系统梳理人体科学研究的脉络，从钱学到张震寰，从507所到各大学的研究组。有材料，有判断，有留白。',
    tags: ['人体科学', '历史', '线上'],
  },
  {
    tag: '主题沙龙',
    title: '道家文化与日常修炼',
    audience: '有基础修行经验者',
    time: '每季度一次',
    location: '闭门沙龙（审核制）',
    desc: '小规模闭门沙龙，围绕具体修炼体验展开讨论。不设标准答案，只交换经验。',
    tags: ['道家', '修炼', '沙龙'],
  },
  {
    tag: '私人咨询',
    title: '一对一咨询（需预约）',
    audience: '有具体问题需要深入探讨者',
    time: '预约制',
    location: '线上/线下',
    desc: '不批八字、不占卜、不问前程。可以聊的是：传统文化学习路径、研究资料的获取与判断、修行中遇到的具体困惑。',
    tags: ['咨询', '一对一'],
  },
];

export default function Courses() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.course-card') as HTMLElement[];
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
          课程与讲座
        </h1>
        <p
          className="font-sans text-base mt-4"
          style={{ color: 'rgba(17, 17, 17, 0.5)' }}
        >
          适合谁、学什么、不承诺什么
        </p>
      </div>

      {/* Disclaimer */}
      <div
        className="mx-[5vw] mb-12 p-6 lg:p-8"
        style={{
          backgroundColor: 'rgba(138, 28, 28, 0.04)',
          borderLeft: '3px solid #8A1C1C',
        }}
      >
        <p
          className="font-sans text-[15px] leading-[1.8]"
          style={{ color: '#111111' }}
        >
          本网站及所有课程内容不涉及医疗诊断、治疗建议或功能承诺。传统文化、气功、人体科学相关内容的讨论，均为学术研究、个人经验与历史资料整理，不构成任何形式的医疗替代方案。学习者应理性看待，如有健康问题请咨询专业医疗机构。
        </p>
      </div>

      {/* Course List */}
      <div className="px-[5vw] pb-[15vh]">
        <div className="max-w-[900px] mx-auto space-y-0">
          {courses.map((course, i) => (
            <div
              key={i}
              className="course-card py-12"
              style={{ borderBottom: '1px solid rgba(17, 17, 17, 0.08)' }}
            >
              <span
                className="font-sans text-xs font-medium tracking-[0.05em]"
                style={{ color: '#8A1C1C' }}
              >
                {course.tag}
              </span>
              <h3
                className="font-serif text-2xl lg:text-[28px] font-semibold leading-[1.3] mt-3"
                style={{ color: '#111111' }}
              >
                {course.title}
              </h3>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                <div className="flex items-center gap-2">
                  <Users size={13} style={{ color: 'rgba(17, 17, 17, 0.5)' }} />
                  <span className="font-sans text-sm" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                    {course.audience}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} style={{ color: 'rgba(17, 17, 17, 0.5)' }} />
                  <span className="font-sans text-sm" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                    {course.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} style={{ color: 'rgba(17, 17, 17, 0.5)' }} />
                  <span className="font-sans text-sm" style={{ color: 'rgba(17, 17, 17, 0.5)' }}>
                    {course.location}
                  </span>
                </div>
              </div>

              <p
                className="font-sans text-[15px] leading-[1.8] mt-5"
                style={{ color: 'rgba(17, 17, 17, 0.7)' }}
              >
                {course.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-[13px] px-3 py-1"
                    style={{ backgroundColor: 'rgba(17, 17, 17, 0.04)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
