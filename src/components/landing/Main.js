import React from "react";
import Buttons from "./Buttons";

const Main = () => {
  return (
    <header className="overlay">
      <img className="landingPhoto" src="/assets/ae86.jpg" alt="toyota ae86" />
      <section className="header">
        <h1 className="title">SPOTTED</h1>
        <p className="caption">The gateway to the car scene starts here.</p>
        <Buttons />
      </section>
    </header>
  );
};

export default Main;
