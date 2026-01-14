import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Aos from "aos";

import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";

const HomeLayout = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="nav-section">
        <nav>
          <NavBar />
        </nav>
      </header>
      <main className="flex-1 pt-16 bg-base-100 text-base-content min-h-screen">
        <Outlet />
      </main>
      <Footer /> 
    </div>
  );
};

export default HomeLayout;
