import React from "react";
import DashboardBody from "../dashboardBody/DashboardBody";
import SideBar from "../sideBar/SideBar";

const Dashboard = () => {
  return (
    <section className="flex w-screen h-screen">
      <SideBar />
      <DashboardBody />
    </section>
  );
};

export default Dashboard;
