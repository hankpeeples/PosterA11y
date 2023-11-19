import { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import ReactModal from 'react-modal';
import ExplanationCard from './ExplanationCard';

const Navbar = () => {
  const [info, setInfo] = useState<boolean>(false);

  return (
    <div className="flex h-fit w-screen flex-row justify-between bg-gray-300 p-4 shadow-md shadow-[#898989]">
      <h1 className="text-xl font-semibold">PosterA11y</h1>
      <FaCircleInfo onClick={() => setInfo(true)} size="1.5rem" />
      <ReactModal
        onRequestClose={() => setInfo(false)}
        style={{
          overlay: {
            display: 'flex',
            placeItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            height: '50%',
            width: '50%',
          },
        }}
        isOpen={info}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <ExplanationCard />
      </ReactModal>
    </div>
  );
};

export default Navbar;
