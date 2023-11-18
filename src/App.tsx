import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="block h-screen w-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <div className="pr-4 pl-4">
        <Home />
      </div>
    </main>
  );
}

export default App;
