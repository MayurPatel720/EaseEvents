import React, { ReactNode } from "react";
import Nav from "../components/Nav.tsx";
import Sidebar from "../components/Sidebar.tsx";
import Footer from "../components/Footer.tsx";
import "../css/MainLayout.css";

interface MyLayoutProps {
  children: ReactNode;
}

const MyLayout: React.FC<MyLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="flex flex-1 gap-3">
        <div className="m-2 ml-4">
          <Sidebar />
        </div>

        <main className="my-layout-main">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default MyLayout;
