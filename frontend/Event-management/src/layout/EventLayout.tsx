import React, { ReactNode } from "react";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import "../css/MainLayout.css";
import EventSidebar from "../components/EventSidebar.tsx";

interface EventLayoutprops {
  children: ReactNode;
}

const EventLayout: React.FC<EventLayoutprops> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="flex flex-1 gap-3">
        <div className="m-2 ml-4">
          <EventSidebar />
        </div>

        <main className="my-layout-main">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default EventLayout;
