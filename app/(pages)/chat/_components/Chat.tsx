import { useChat } from "@/app/contexts/chatContext";
import React, { useState } from "react";
import { Spinner } from "./Spinner";

const ChatInterface: React.FC = () => {
  const { messages, setMessages, chatIsBusy, setChatIsBusy } = useChat();
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    if (!message) return;

    setChatIsBusy(true);

    // Add the user's message to the chat
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "Typing..." },
    ]);

    try {
      // Send the message to the server and begin receiving the streamed response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        // Read the streamed data
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const text = decoder.decode(value || new Uint8Array(), {
            stream: true,
          });
          fullText += text; // Accumulate the streamed data
        }
      }

      // Once the stream is complete, update the assistant's message with the full content
      setMessages((messages) => {
        const otherMessages = messages.slice(0, -1);
        const lastMessage = messages[messages.length - 1];
        return [...otherMessages, { ...lastMessage, content: fullText }];
      });
    } catch (error) {
      console.error("Error fetching response:", error);
      // Handle error by showing an error message to the user or updating the UI accordingly
    } finally {
      setChatIsBusy(false);
    }

    // Clear the input message
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of pressing "Enter"
      sendMessage();
    }
  };

  const renderMessageContent = (
    content: string,
    role: "user" | "assistant"
  ) => {
    if (role === "user") {
      return <p className="text-[16px]">{content}</p>;
    }

    try {
      const data = JSON.parse(content);
      if (data?.message) {
        return <p className="text-[16px]">{data.message}</p>;
      }
      const { introduction, professors, conclusion } = data;
      return (
        <div className="space-y-4">
          {introduction && (
            <div>
              <p className="text-[16px]">{introduction}</p>
            </div>
          )}

          {professors && professors.length > 0 && (
            <div>
              <p className="text-[16px]">Top Professors Recommendations</p>
              <div className="space-y-4">
                {professors.map(
                  (
                    professor: {
                      name: string;
                      subject: string;
                      stars: number;
                      summary: string;
                    },
                    index: number
                  ) => (
                    <div
                      key={index}
                      className="bg-white text-black p-4 rounded-lg shadow-md"
                    >
                      <p className="text-[16px] font-bold">
                        {professor.name} ({professor.subject})
                      </p>
                      <p className="text-[16px] text-gray-700 mt-2">
                        <strong>Stars:</strong> {professor.stars}
                      </p>
                      <p className="text-[16px] text-gray-700 mt-2">
                        <strong>Summary:</strong> {professor.summary}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {conclusion && (
            <div>
              <p className="text-[16px]">{conclusion}</p>
            </div>
          )}
        </div>
      );
    } catch (error) {
      return <p className="text-[16px]">{content}</p>;
    }
  };

  return (
    <div className="chat-container flex flex-col gap-6">
      <div className="flex flex-col items-center rounded-3xl bg-gray-700 bg-opacity-30 max-w-[724px] h-[400px] overflow-y-scroll">
        <div className="flex flex-col w-full text-2xl leading-tight text-white rounded-none max-md:max-w-full p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex overflow-hidden ${
                message.role === "user"
                  ? "flex-wrap gap-5 items-start self-end py-3 pr-3.5 pl-6 mt-7 leading-7 text-black bg-violet-300 rounded-3xl max-md:pl-5"
                  : "gap-6 items-center self-start px-6 py-3 rounded-tr-4 min-h-[87px] bg-slate-600 mt-[16px] max-md:px-5"
              }`}
            >
              <img
                loading="lazy"
                src={
                  message.role === "user"
                    ? "https://cdn.builder.io/api/v1/image/assets/TEMP/7aaa8dde10ab825b3a6aa7165cc08ef183a165349d2d6042dd1b14e84f78f70f?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae"
                    : "https://cdn.builder.io/api/v1/image/assets/TEMP/b9a8045f6c5b09fb97ec2c7ffcdd248c2c7f6e52ed1a248260ca35945e2d0a32?placeholderIfAbsent=true&apiKey=cbce17c6bd5a4e1b9d426321669347ae"
                }
                alt={message.role === "user" ? "User Avatar" : "AI Avatar"}
                className={`object-contain shrink-0 ${
                  message.role === "user"
                    ? "aspect-[0.86] w-[23px]"
                    : "self-stretch my-auto aspect-[1.05] rounded-[99px] w-[26px]"
                }`}
              />
              <div
                className={`${
                  message.role === "user"
                    ? "grow shrink w-[550px] max-md:max-w-full"
                    : "self-stretch my-auto"
                }`}
              >
                {renderMessageContent(message.content, message.role)}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat Input */}
      <div className="flex flex-col justify-end pb-8 max-w-full rounded-none w-[732px]">
        <div
          className={`flex items-center bg-[#ADA8C4] rounded-[16px] overflow-hidden w-full h-[56px] px-[16px] py-[8px]
          ${chatIsBusy ? "bg-gray-400" : "bg-[#ADA8C4]"}
          `}
        >
          <input
            type="text"
            placeholder="Chat with AI assistant"
            className={`flex-grow px-4 py-2 text-black text-[18px] bg-transparent outline-none placeholder-white
            ${chatIsBusy ? "cursor-not-allowed " : ""}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={chatIsBusy}
          />
          <button
            className="p-2 bg-gray-700 rounded-full"
            onClick={sendMessage}
            disabled={chatIsBusy}
          >
            {!chatIsBusy ? (
              <>
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
              </>
            ) : (
              <Spinner />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
