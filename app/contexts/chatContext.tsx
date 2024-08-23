import React, { createContext, useState, useContext, ReactNode } from "react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type ChatContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  chatIsBusy: boolean;
  setChatIsBusy: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Rate My Professor support assistant. How can I help you today?",
    },
  ]);
  const [chatIsBusy, setChatIsBusy] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, chatIsBusy, setChatIsBusy }}
    >
      {children}
    </ChatContext.Provider>
  );
};
