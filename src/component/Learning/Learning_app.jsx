import React from "react";
import DashboardLayout from "../DashboardLayout";
import MainContent from "./Modules";
import Navbar from "../navbarModule";
const App = () => {
  const [activeSection, setActiveSection] = React.useState("Learning Hub");

  return (
    <div> <Navbar></Navbar><DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
    <MainContent />
  </DashboardLayout></div>
   
  );
};

export default App;