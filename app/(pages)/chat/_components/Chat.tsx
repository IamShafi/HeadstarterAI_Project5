import React from "react";

interface ChatData {
  avatarSrc: string;
  message: string;
  isAI: boolean;
}

const chatData: ChatData[] = [
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b9a8045f6c5b09fb97ec2c7ffcdd248c2c7f6e52ed1a248260ca35945e2d0a32?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message: "Hello! I'm your AI Assistant. How can I assist you today? Ask me about professors or use the advanced search for personalized recommendations.",
    isAI: false,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7aaa8dde10ab825b3a6aa7165cc08ef183a165349d2d6042dd1b14e84f78f70f?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message:
      "Make sure your hands are dry, then grip the lid firmly and twist it while holding the bottle with your other hand. This should give you enough leverage to loosen the lid.",
    isAI: true,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c7ab6026bc6d93776bb8ca3f58878398ce5e4f29ce0e7d923231c24e93ca4555?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message: "How to open my jam bottle?",
    isAI: false,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3e6b6ae76d2b7bcf41bb15efdc0632f6715d7574abe6b72aca9c6c6bbf286452?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message:
      "Make sure your hands are dry, then grip the lid firmly and twist it while holding the bottle with your other hand. This should give you enough leverage to loosen the lid.",
    isAI: true,
  },
];

const ChatInterface: React.FC = () => {
  return (
    <section className="flex flex-col items-center rounded-3xl bg-gray-700 bg-opacity-30 max-w-[724px] h-[642px] overflow-y-scroll">
      <div className="flex flex-col w-full text-2xl leading-tight text-white rounded-none max-md:max-w-full">
        {chatData.map((chat, index) => (
          <div
            key={index}
            className={`flex overflow-hidden ${
              chat.isAI
                ? "flex-wrap gap-5 items-start self-end py-3 pr-3.5 pl-6 mt-7 leading-7 text-black bg-violet-300 rounded-3xl min-h-[111px] max-md:pl-5"
                : "gap-6 items-center self-start px-6 py-3 rounded-tr-4 min-h-[87px] bg-slate-600 mt-[16px] max-md:px-5"
            }`}
          >
            <img
              loading="lazy"
              src={chat.avatarSrc}
              alt={chat.isAI ? "AI Avatar" : "User Avatar"}
              className={`object-contain shrink-0 ${
                chat.isAI
                  ? "aspect-[0.86] w-[43px]"
                  : "self-stretch my-auto aspect-[1.05] rounded-[99px] w-[66px]"
              }`}
            />
            <div
              className={`${
                chat.isAI
                  ? "grow shrink w-[550px] max-md:max-w-full"
                  : "self-stretch my-auto"
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
      </div>

      <section className="flex flex-col justify-end mt-16 max-w-full rounded-none w-[748px] max-md:mt-10">
        {/* <div className="flex overflow-hidden flex-col px-3 pt-5 pb-1 w-full rounded-3xl border border-gray-700 border-solid bg-slate-300 bg-opacity-10 shadow-[0px_4px_8px_rgba(62,58,83,1)] max-md:max-w-full">
          <label htmlFor="chatInput" className="self-start text-base leading-tight text-white">
            Enter Input
          </label>
          <div className="flex flex-wrap gap-5 justify-between items-start mt-9 max-md:max-w-full">
            <div className="flex overflow-hidden flex-col justify-center px-3.5 py-2 mt-2.5 text-base leading-tight text-white rounded-lg border border-white border-solid">
              <div className="flex gap-2 items-center w-full">
                <div className="gap-2 self-stretch my-auto w-[86px]">Choose Model</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4645f9c63934d2834e12ad2fe4e1fd35591ac4ad2523329b130a6998d34467e4?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae"
                  alt=""
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
              </div>
            </div>
            <button className="flex overflow-hidden flex-col justify-center items-center pr-2.5 pl-3 w-10 h-10 bg-gray-700 rounded-xl min-h-[40px]" aria-label="Send message">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b637be6063718440b4e57c7e4ba3252a0cecfc75d28f16bdf2f5723c007dc77a?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae"
                alt=""
                className="object-contain aspect-[1.06] w-[19px]"
              />
            </button>
          </div>
        </div> */}
        <div className="flex items-center bg-[#ADA8C4] rounded-[16px] overflow-hidden w-full h-[56px] px-[16px] py-[8px]">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>
    </section>
  );
};

export default ChatInterface;
