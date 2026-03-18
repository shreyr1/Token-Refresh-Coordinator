import React from "react";
import HeroPage from "../SECTIONS/HeroPage";
import Navbar from "../components/Navbar";
import About from "../SECTIONS/About";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroPage />
      <About />
      
    </div>
  );
};

export default Home;
