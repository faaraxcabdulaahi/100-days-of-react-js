import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import MainContent from "./MainContent";

const PageTwo = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default PageTwo;