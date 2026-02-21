import React from "react";

const HeroPage = () => {
  return (
    <div className="w-full min-h-screen relative bg-black flex justify-center bg-line ">
      <div
        className="w-full min-h-screen absolute inset-0 z-10"
        style={{ background: 'linear-gradient(to top, #065f46 10%, #000000 80%)' }}
      ></div>
      <div className="mt-[8vw] font-medium text-[5vw] text-white onlyFont text-center absolute z-20 slideup ">
        <span className=" bg-clip-text text-transparent font-semibold bg-gradient-to-b  from-white/85 to-white">Looking For Reliable AuthN &
        <br />
        AuthZ Solution?</span>

        <div className="w-[89vw] h-[40vw] bg-black mt-20 rounded-2xl border-2 border-gray-100">

        </div>
      </div>
      <div></div>
      
    
    </div>
  );
};

export default HeroPage;
