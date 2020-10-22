import React from "react";
import Navbar from "components/Common/Navbar";
import DashboardRoutes from "../routes/DashboardRoutes";

const Home = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="content-main">
        <DashboardRoutes />
      </div>
    </div>
  );
};

export default Home;
