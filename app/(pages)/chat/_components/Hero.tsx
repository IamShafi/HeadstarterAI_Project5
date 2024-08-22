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

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="chatpage max-w-[1240px] mx-auto px-4">
        <h1>chat content</h1>
      </div>
      <BottomLine />
    </Section>
  );
};

export default Hero;
