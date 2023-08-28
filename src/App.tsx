import ExplanationCard from './components/ExplanationCard';
import FileUploader from './components/FileUploader';
import Navbar from './components/Navbar';
import ScoreCard from './components/ScoreCard';

function App() {
  return (
    <main className="flex flex-col h-screen w-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <div className="flex flex-col sm:flex-row justify-between m-4 p-4 h-4/5 sm:h-3/5">
        <FileUploader />
        <ScoreCard />
      </div>
      <ExplanationCard />
    </main>
  );
}

export default App;
