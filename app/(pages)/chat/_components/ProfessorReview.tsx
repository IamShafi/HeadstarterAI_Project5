import React from 'react';

const ProfessorReview: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col px-9 pt-14 pb-5 rounded-lg bg-gray-700 bg-opacity-30 max-w-[596px] max-md:px-5">
    <div className="flex items-center bg-[#ADA8C4] rounded-[16px] overflow-hidden w-full h-[56px] max-w-[558px] px-[16px] py-[8px]">
      <input
        type="text"
        placeholder="Submit Your Rate My Professor URL"
        className="flex-grow px-4 py-2 text-black text-[21px] bg-transparent outline-none placeholder-white"
      />
      <button className="p-2 bg-gray-700 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </button>
    </div>
      <h2 className="gap-2.5 self-start p-2.5 mt-4 text-2xl tracking-normal leading-loose text-white">
        Search for Professors
      </h2>
      {/* <div className="flex overflow-hidden flex-wrap gap-5 justify-between px-5 py-2 bg-gray-400 rounded-2xl max-md:max-w-full">
        <label htmlFor="search-input" className="my-auto text-lg font-bold leading-tight text-white">
          Search
        </label>
        <div className="flex overflow-hidden flex-col justify-center items-center px-2.5 w-10 h-10 bg-gray-700 rounded-xl min-h-[40px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/dc309e68f4b753ba9500d084c399e45ff96d13de4aa2a0c0a1d4e38c60bae99e?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae"
            className="object-contain aspect-[1.11] w-[19px]"
            alt=""
          />
        </div>
      </div> */}
      <div className="flex items-center bg-[#ADA8C4] rounded-[16px] overflow-hidden w-full h-[56px] max-w-[558px] px-[16px] py-[8px]">
      <input
        type="text"
        placeholder="Search"
        className="flex-grow px-4 py-2 text-black text-[21px] bg-transparent outline-none placeholder-white"
      />
      <button className="p-2 bg-gray-700 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
        </svg>
      </button>
    </div>
      <form className="mt-7">
        <div className="flex flex-wrap gap-10 items-center px-4 w-full rounded-2xl border border-black border-solid max-md:max-w-full">
          <label htmlFor="professor-name" className="gap-2.5 self-stretch p-2.5 my-auto text-2xl tracking-normal leading-loose text-white">
            Review Professors
          </label>
          <input
            type="text"
            id="professor-name"
            placeholder="Enter Professor Name"
            className="overflow-hidden text-[18px] grow shrink self-stretch px-4 py-2.5 my-auto text-base leading-tight text-black bg-[#ADA8C4] rounded-lg w-[191px] max-md:px-5 placeholder-white"
          />
        </div>
        <textarea
          id="professor-review"
          placeholder="Write your review for this professor"
          className="overflow-hidden text-[24px] px-6 pt-5 pb-20 mt-8 text-base leading-tight text-black bg-gray-400 rounded-2xl max-md:px-5 max-md:max-w-full w-full"
        />
      </form>
      <button className="overflow-hidden self-center px-16 py-3.5 mt-4 max-w-full text-2xl font-semibold leading-tight text-white whitespace-nowrap bg-red-400 rounded-2xl w-[372px] max-md:px-5">
        Submit
      </button>
    </main>
  );
};

export default ProfessorReview;
