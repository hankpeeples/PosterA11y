import ExplanationCard from './components/ExplanationCard';
import FileUploader from './components/FileUploader';
import Navbar from './components/Navbar';
import ScoreCard from './components/ScoreCard';

function App() {
  return (
    <main className="flex flex-col h-screen w-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <div className="flex flex-col justify-between p-4 m-4 sm:flex-row h-3/5 sm:h-2/5">
        <FileUploader />
        <ScoreCard />
      </div>
      <ExplanationCard />
    </main>
  );
}

export default App;
