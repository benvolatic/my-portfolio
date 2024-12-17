import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Navbar from "../components/Navbar"; // Adjust the path as per your file structure
import profilePic from "../assets/images/profilepic.jpg"; // Adjust the path as per your file structure
import backgroundImg from "../assets/images/background1.jpeg"; // Adjust the path as per your file structure
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from "react-icons/fa";
import hydrogen from "../assets/logos/hydrogen.png";
import midjourney from "../assets/logos/midjourney.jpg";
import nextjs from "../assets/logos/nextjs.png";
import node from "../assets/logos/node.webp";
import one from "../assets/logos/one.svg";
import postgresql from "../assets/logos/postgresql.webp";
import rails from "../assets/logos/rails.jpg";
import reactnative from "../assets/logos/react-native-1.svg";
import relume from "../assets/logos/relume.png";
import shopify from "../assets/logos/shopify.png";
import supabase from "../assets/logos/supabase.png";
import tailwindcss from "../assets/logos/tailwindcss.png";
import typescript from "../assets/logos/typescript.png";
import v0 from "../assets/logos/v0.webp";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen font-sans">
      {/* Helmet for dynamic metadata */}
      <Helmet>
        <title>Volatic - Home</title>
        <meta
          name="description"
          content="Welcome to Volatic! A showcase of Ben Nelson's portfolio, featuring front-end and back-end projects."
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      {/* Fixed Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Parallax pages={2} style={{ top: "0", left: "0" }}>
          {/* Header Layer */}
          <ParallaxLayer offset={0} speed={0.5}>
            <div className="flex flex-col items-center justify-center h-screen text-center text-white">
              <img
                src={profilePic}
                alt="Profile"
                className="w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white"
              />
              <h1 className="text-5xl font-bold mt-6">Hi, I'm Ben Nelson</h1>
              <p className="text-2xl mt-4">
                Full Stack Developer | React Specialist | Problem Solver
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#portfolio"
                  className="px-6 py-3 bg-blue-500 rounded hover:bg-blue-700 transition text-white"
                >
                  View Portfolio
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 bg-gray-500 rounded hover:bg-gray-700 transition text-white"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </ParallaxLayer>

          {/* Portfolio Section */}
          <ParallaxLayer offset={1} speed={0.7}>
            <div
              id="portfolio"
              className="min-h-screen flex flex-col items-center justify-center px-8 text-center text-white"
            >
              <h2 className="text-4xl font-bold mb-6">My Portfolio</h2>
              <p className="text-lg max-w-2xl mb-8">
                A showcase of my work, from modern front-end applications to
                powerful back-end APIs. I build scalable and robust solutions.
              </p>
              <div className="flex flex-wrap justify-center space-x-4">
                <a
                  href="#project1"
                  className="px-6 py-3 bg-green-500 rounded hover:bg-green-700 transition"
                >
                  Project 1
                </a>
                <a
                  href="#project2"
                  className="px-6 py-3 bg-purple-500 rounded hover:bg-purple-700 transition"
                >
                  Project 2
                </a>
                <a
                  href="#project3"
                  className="px-6 py-3 bg-red-500 rounded hover:bg-red-700 transition"
                >
                  Project 3
                </a>
              </div>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-800 py-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Tools and Technologies</h3>
        <div className="flex justify-center flex-wrap mt-4 gap-6">
          <img src={hydrogen} alt="React" className="w-16 h-16 object-contain" />
          <img src={midjourney} alt="Node.js" className="w-16 h-16 object-contain" />
          <img src={nextjs} alt="Database" className="w-16 h-16 object-contain" />
          <img src={node} alt="Git" className="w-16 h-16 object-contain" />
          <img src={one} alt="Git" className="w-16 h-16 object-contain" />
          <img src={postgresql} alt="Git" className="w-16 h-16 object-contain" />
          <br />
          <img src={rails} alt="Git" className="w-16 h-16 object-contain" />
          <img src={reactnative} alt="Git" className="w-16 h-16 object-contain" />
          <img src={relume} alt="Git" className="w-16 h-16 object-contain" />
          <img src={shopify} alt="Git" className="w-16 h-16 object-contain" />
          <img src={supabase} alt="Git" className="w-16 h-16 object-contain" />
          <img src={tailwindcss} alt="Git" className="w-16 h-16 object-contain" />
          <img src={typescript} alt="Git" className="w-16 h-16 object-contain" />
          <img src={v0} alt="Git" className="w-16 h-16 object-contain" />
        </div>
        <p className="text-sm text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Ben Nelson. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
