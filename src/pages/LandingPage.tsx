import Navbar from '../components/shared/Navbar';
import Hero from '../components/landing/Hero';
import DualFeatures from '../components/landing/DualFeatures';
import QuranGPTSection from '../components/landing/QuranGPTSection';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/shared/Footer';


const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <div id="how-it-works">
          <DualFeatures />
        </div>
        <QuranGPTSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
