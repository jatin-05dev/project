 function Faq() {
  return (
    <>
      <div className="bg-black px-4 py-8 md:px-10 md:py-10">

        {/* Heading */}
        <h1 className="text-white font-bold text-xl md:text-3xl text-center md:text-left md:px-20 py-6">
          Frequently Asked Questions
        </h1>

        {/* FAQ Inputs */}
        <div className="max-w-3xl mx-auto space-y-4">

          <input
            className="w-full bg-neutral-700 p-4 placeholder:text-white text-white font-semibold text-base md:text-xl rounded"
            placeholder="What is Netflix?"
            type="text"
          />

          <input
            className="w-full bg-neutral-700 p-4 placeholder:text-white text-white font-semibold text-base md:text-xl rounded"
            placeholder="Enter Your Email"
            type="text"
          />

          <input
            className="w-full bg-neutral-700 p-4 placeholder:text-white text-white font-semibold text-base md:text-xl rounded"
            placeholder="Enter Your Subject"
            type="text"
          />

          <input
            className="w-full bg-neutral-700 p-4 placeholder:text-white text-white font-semibold text-base md:text-xl rounded"
            placeholder="Enter Your Subject"
            type="text"
          />

          <input
            className="w-full bg-neutral-700 p-4 placeholder:text-white text-white font-semibold text-base md:text-xl rounded"
            placeholder="Enter Your Subject"
            type="text"
          />

          <input
            className="w-full bg-neutral-700 p-4 placeholder:text-white text-white font-semibold text-base md:text-xl rounded"
            placeholder="Enter Your Subject"
            type="text"
          />

          {/* Button */}
          <button className="w-full md:w-60 bg-orange-600 text-white py-3 rounded font-bold text-lg">
            Submit
          </button>

        </div>
      </div>
    </>
  );
}

export default Faq;
