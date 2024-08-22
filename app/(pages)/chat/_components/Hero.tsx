"use client";

import Image from "next/image";
import { heroBackground, robot } from "../../../../assets/index";
import curve from "../../../../assets/hero/curve.png";
import chatbotImage from "../../../../assets/AI-Chatbot.jpg";
import Button from "../../../components/Button";
import Section from "../../../components/Section";
import {
  BackgroundCircles,
  BottomLine,
  Gradient,
} from "../../../components/design/Hero";
import { heroIcons } from "../../../../constants/index";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "../../../components/Generating";
import Notification from "../../../components/Notification";
import ProfessorReview from "./ProfessorReview";
const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[8rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="chatpage max-w-[1240px] mx-auto px-4 pb-4 flex flex-col gap-4">
        <h1>Filter</h1>
        <ProfessorReview/>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
