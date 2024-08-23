import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm the Rate My Professor support assistant. How can I help you today?",
    },
  ]);
  const [chatIsBusy, setChatIsBusy] = useState(false);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, chatIsBusy, setChatIsBusy }}
    >
      {children}
    </ChatContext.Provider>
  );
};
