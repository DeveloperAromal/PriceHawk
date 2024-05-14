import Image from "next/image";
import React from "react";
import { Globe } from "../includes/Globe";
import Button from "../includes/Button";

const Contact = () => {
  return (
    <>
      <section className="contact_form mt-40">
        <div className="top_section">
          <h1 className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
            Let's Connect Together
          </h1>
        </div>

        <div className="bottom_section h-screen flex items-center mt-10">
          <Globe />
          <div className="contat_form flex items-center justify-items-end ml-10">
            <form action="" method="" className="w-full">
              <div className="mb-3">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="firstname..."
                  className="px-3 py-2 border-b-1 border-white mr-6 bg-transparent placeholder:text-darky-shade mb-8"
                />
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="lastname..."
                  className="px-3 py-2 border-b-1 border-white mr-6 bg-transparent placeholder:text-darky-shade mb-8"
                />
              </div>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="subject..."
                className="px-3 py-2 border-b-1 border-white  bg-transparent placeholder:text-darky-shade w-045803489 mb-7"
              />
              <textarea
                name="content"
                id="content"
                placeholder="your message..."
                className="px-3 py-2 border-b-1 border-white bg-transparent placeholder:text-darky-shade w-045803489"></textarea>

              <Button
                title="submit"
                href="/"
                className="mt-8 py-2.5 px-4 rounded-xl text-black bg-white font-bold text-base"
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
