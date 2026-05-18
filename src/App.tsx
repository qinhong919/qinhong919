import { Routes, Route } from 'react-router';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Articles from './pages/Articles';
import Archive from './pages/Archive';
import Courses from './pages/Courses';
import Videos from './pages/Videos';
import QA from './pages/QA';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="min-h-[100dvh] flex flex-col" style={{ backgroundColor: '#F2F1EE' }}>
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
