import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="flex h-full w-screen flex-col text-black">
      <Navbar />
      <div className="pl-4 pr-4">
        <Home />
      </div>
    </main>
  );
}

export default App;
