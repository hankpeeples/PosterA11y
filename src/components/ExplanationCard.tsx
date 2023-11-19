const ExplanationCard = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-md bg-gray-300 p-4 shadow-md shadow-[#898989]">
      <h2 className="text-[1.5rem] font-bold text-black">Noteable Info</h2>
      <div className="p-4">
        <h3 className="text-[1.1rem] font-semibold underline">Text Grading</h3>
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
          <p className="pt-4">
            If some text has no box outline at all, then that text was not able to be read by the
            application. The text parser is far from perfect and will miss some text but this is not
            counted against your score.
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-[1.1rem] font-semibold underline">Contrast Grading</h3>
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
      <div className="p-4">
        <strong>Note:</strong> The resulting image may appear blurry. This is simply because of the
        size of the image and how it is scaled to fit the page and has nothing to do with the actual
        image quality.
      </div>
    </div>
  );
};

export default ExplanationCard;
