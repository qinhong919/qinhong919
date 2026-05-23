import "./App.css";

function App() {
  return (
    <main className="site">
      <nav className="nav">
        <div className="brand">老道覃宏</div>
        <div className="navLinks">
          <a href="#about">关于老道</a>
          <a href="#research">研究方向</a>
          <a href="#contact">联系</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroBox">
          <div className="tag">传统文化 · 人体科学 · 专注力研究</div>
          <h1>老道覃宏</h1>
          <p className="subtitle">易学、国学与人体科学档案馆</p>
          <p className="intro">
            以传统文化为根，以人体科学为线索，以专注状态训练为入口，
            记录、整理并传播易学、气功、UOP/UHP未知现象与身心修炼经验。
          </p>
          <div className="buttons">
            <a href="#about">进入档案馆</a>
            <a href="#contact">联系老道</a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <h2>关于老道</h2>
        <p className="note">不是标签堆叠，而是一条长期行走的研究路径。</p>

        <div className="contentBox">
          <p>覃宏，男，汉族，1967年生，云南昆明人。</p>
          <p>
            历任昆明易经研究会副会长、秘书长，云南中华周易研究会副会长、秘书长，
            国际华人超心理学会华南分会秘书长。
          </p>
          <p>现任昆明UFO研究会秘书长。</p>
          <p>
            道教无极门北斗玄功传人，杨公地理传人，万州水遁术研究与传承实践者。
          </p>
          <p>
            长期致力于国学研究，矢志倡导传统文化的继承、整理与发扬。
            1989年起，在昆明日报社参与《人体科学》专栏采编工作，
            系统介绍中国易学、气功及特异功能研究动态。
          </p>
          <p>
            九十年代以来，先后与云南大学物理系原人体科学研究室、
            国际华人超心理学会等机构合作，持续参与人体潜能、专注状态、
            功能现象及相关训练实践。
          </p>
        </div>
      </section>

      <section id="research" className="section">
        <h2>研究方向</h2>
        <p className="note">把传统经验放回现代问题中重新观察。</p>

        <div className="grid">
          <div className="card">
            <h3>易学与决策</h3>
            <p>从阴阳、五行、卦象与时机中，观察人事运行结构，服务人生与商业决策。</p>
          </div>
          <div className="card">
            <h3>人体科学</h3>
            <p>关注人体潜能、特异功能、气功现象及未知人体现象的记录、训练与验证。</p>
          </div>
          <div className="card">
            <h3>北斗玄功</h3>
            <p>整理无极门北斗玄功体系中的动功、坐功、采气、收功与身心稳定训练。</p>
          </div>
          <div className="card">
            <h3>UOP / UHP</h3>
            <p>以调查、观察和证据链方式，推动未知客观现象与未知人体现象的理性研究。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>收神计划</h2>
        <p className="note">现代人最大的问题之一，是心神外散，久而不知。</p>

        <div className="contentBox">
          <p>“收神”不是神秘化表达，而是一套面向当代人的状态训练方法。</p>
          <p>它关心的是：注意力如何散失，身心如何失序，人如何重新建立稳定感、边界感与行动力。</p>
          <p>从传统修炼看，是收摄心神；从现代生活看，是重新拿回自己的注意力。</p>
        </div>
      </section>

      <section id="contact" className="section">
        <h2>联系老道</h2>
        <p className="note">课程、交流、研究合作，可由此联系。</p>

        <div className="contactBox">
          <div>
            <strong>老道覃宏</strong>
            <p>微信：ld543999</p>
            <p>电话：18687217213</p>
          </div>
          <div className="seal">老道</div>
        </div>
      </section>

      <footer>© 2026 老道覃宏 · 易学、国学与人体科学档案馆</footer>
    </main>
  );
}

export default App;
