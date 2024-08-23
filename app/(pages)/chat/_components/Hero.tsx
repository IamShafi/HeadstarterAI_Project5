"use client";

import Section from "../../../components/Section";
import {
  BottomLine,
} from "../../../components/design/Hero";
import ProfessorReview from "./ProfessorReview";
import ChatInterface from "./Chat";
import { ChatProvider } from "@/app/contexts/chatContext";


const Hero = () => {

  return (
    <div
      className="pt-[8rem] -mt-[5.25rem]"
      id="hero"
    >
      <div className="chatpage max-w-[1280px] mx-auto px-4 pb-4 flex flex-col gap-4">  
        <div className="flex flex-col-reverse gap-4 justify-between xl:flex-row">
          <ChatProvider>
          <ProfessorReview />
          <ChatInterface/>
          </ChatProvider>
        </div>
      </div>
      <BottomLine />
    </div>
  );
};

export default Hero;
