import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProcessContent from './components/ProcessContent';

export default function ProcessNotesPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <Header currentPage="process-notes" />
      <main className="flex-1 page-enter">
        <ProcessContent />
      </main>
      <Footer />
    </div>
  );
}