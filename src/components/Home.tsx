import FileUploader from './FileUploader';
import ScoreCard from './ScoreCard';

const Home = () => {
  return (
    <div className="m-4 grid gap-4">
      <FileUploader />
      <ScoreCard />
    </div>
  );
};

export default Home;
