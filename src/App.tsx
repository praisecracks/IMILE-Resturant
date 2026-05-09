import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Reservation from './components/Reservation';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative afro-texture">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <About />
          <Menu />
          <Gallery />
          <Reservation />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
