import React from "react";

interface ChatData {
  avatarSrc: string;
  message: string;
  isUser: boolean;
}

const chatData: ChatData[] = [
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b9a8045f6c5b09fb97ec2c7ffcdd248c2c7f6e52ed1a248260ca35945e2d0a32?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message:
      "Hello! I'm your AI Assistant. How can I assist you today? Ask me about professors or use the advanced search for personalized recommendations.",
    isUser: false,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7aaa8dde10ab825b3a6aa7165cc08ef183a165349d2d6042dd1b14e84f78f70f?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message: "what does professor alex teaches?",
    isUser: true,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c7ab6026bc6d93776bb8ca3f58878398ce5e4f29ce0e7d923231c24e93ca4555?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message: "Professor Alex teach Computer Science at MIT",
    isUser: false,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3e6b6ae76d2b7bcf41bb15efdc0632f6715d7574abe6b72aca9c6c6bbf286452?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message:
      "Who else teaches Computer Science?",
    isUser: true,
  },
  {
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c7ab6026bc6d93776bb8ca3f58878398ce5e4f29ce0e7d923231c24e93ca4555?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae",
    message: "Professor Shafi & tintoy also teaches Computer Science at MIT",
    isUser: false,
  },
];

const ChatInterface: React.FC = () => {
  return (
    <div className="chat-container flex flex-col gap-6 mt-12">
      <div className="flex flex-col items-center rounded-3xl bg-gray-700 bg-opacity-30 max-w-[724px] h-[542px] overflow-y-scroll">
        <div className="flex flex-col w-full text-2xl leading-tight text-white rounded-none max-md:max-w-full">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className={`flex overflow-hidden ${
                chat.isUser
                  ? "flex-wrap gap-5 items-start self-end py-3 pr-3.5 pl-6 mt-7 leading-7 text-black bg-violet-300 rounded-3xl  max-md:pl-5"
                  : "gap-6 items-center self-start px-6 py-3 rounded-tr-4 min-h-[87px] bg-slate-600 mt-[16px] max-md:px-5"
              }`}
            >
              <img
                loading="lazy"
                src={chat.avatarSrc}
                alt={chat.isUser ? "AI Avatar" : "User Avatar"}
                className={`object-contain shrink-0 ${
                  chat.isUser
                    ? "aspect-[0.86] w-[43px]"
                    : "self-stretch my-auto aspect-[1.05] rounded-[99px] w-[66px]"
                }`}
              />
              <div
                className={`${
                  chat.isUser
                    ? "grow shrink w-[550px] max-md:max-w-full"
                    : "self-stretch my-auto"
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>
      </div>
       {/* Chat Input */}
       <div className="flex flex-col justify-end pb-8 max-w-full rounded-none w-[732px]">
          <div className="flex items-center bg-[#ADA8C4] rounded-[16px] overflow-hidden w-full h-[56px] px-[16px] py-[8px]">
            <input
              type="text"
              placeholder="Chat with AI assistant"
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
        </div>
    </div>
  );
};

export default ChatInterface;
