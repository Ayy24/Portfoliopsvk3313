import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutContent from './components/AboutContent';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <Header currentPage="about" />
      <main className="flex-1 page-enter">
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}