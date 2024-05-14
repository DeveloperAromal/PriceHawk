import Image from "next/image";
import React from "react";
import { Globe } from "../includes/Globe";

const Contact = () => {
  return (
    <>
      <section className="contact_form mt-40">
        <div className="top_section">
          <h1 className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Let's Connect Together
          </h1>
        </div>

        <div className="bottom_section h-screen flex items-center justify-between mt-10">
          <Globe />
          <div className="contat_form">
            <form action="" method=""></form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
