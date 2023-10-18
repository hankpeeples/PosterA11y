import FileUploader from './components/FileUploader';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="flex h-screen w-screen flex-col bg-[#f5f5f5] text-black">
      <Navbar />
      <FileUploader />
    </main>
  );
}

export default App;
