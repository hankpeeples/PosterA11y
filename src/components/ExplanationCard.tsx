const ExplanationCard = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-md bg-gray-300 p-4 shadow-md shadow-[#898989]">
      <h2 className="font-bold text-black text-[1.5rem]">Noteable Info</h2>
      <div className="p-4">
        <h3 className="font-semibold underline text-[1.1rem]">Text Grading</h3>
        <div className="pl-4">
          <p>
            <span className="text-red-600">Red</span> boxes around an area show that the text within
            is <span className="text-red-600">not easily readable</span>.
          </p>
          <p>
            <span className="text-green-800">Green</span> boxes mean the text within that area{' '}
            <span className="text-green-800">is good</span>.
          </p>
          <p>
            Grading text is a complex task when given an image that contains background designs. You
            will see here that red boxes can be drawn around background images that contain no text.
            Please note that these do affect the text grade of the image, but only by a small
            amount. On the other hand, red boxes that are drawn around text means you may want to
            make some changes to how that text is displayed (font size, color, font family, etc...).
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold underline text-[1.1rem]">Contrast Grading</h3>
        <div className="pl-4">
          <p>
            The color contrast of the image is graded by making sure the colors are{' '}
            <a
              href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html"
              className="text-blue-600 underline"
            >
              WCAG
            </a>{' '}
            compliant. One caveat to this is that there will usually be some form of shading on
            various colors and designs that will likely not be WCAG compliant due to their nature,
            but this is taken into account when grading.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;
