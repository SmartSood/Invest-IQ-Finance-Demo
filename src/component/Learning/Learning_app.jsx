import React from "react";
import DashboardLayout from "../DashboardLayout";
import Modules from "./Modules";
import Navbar from "../navbarModule";
const App = () => {
  const [activeSection, setActiveSection] = React.useState("Learning Hub");

  return (
    <div> <Navbar></Navbar><DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
    <Modules />
  </DashboardLayout></div>
   
  );
};

export default App;