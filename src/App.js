import React, { useState } from "react";
import FileUploader from "./components/FileUpload";
import SummaryView from "./components/SummaryView";
import DetailedView from "./components/DetailedView";
import MapView from "./components/MapView";
import { parseKML } from "./components/parseKML";
import "./App.css";

const App = () => {
  const [kmlData, setKmlData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleFileUpload = (kmlText) => {
    const parsedData = parseKML(kmlText);
    setKmlData(parsedData);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"} style={{borderRadius:"10%",marginBottom:"2rem", textAlign: "center",width:"98%"}}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
      </button>

      <h1 style={{ marginTop: "1.5rem" }}>KML File Reader</h1>
      <p style={{ color: "#800080", fontSize: "1.3rem" ,marginBottom:"1rem"}}>Upload Valid KML File</p>
      <FileUploader onFileUpload={handleFileUpload} />
      <MapView kmlData={kmlData} />
     
      <div className="summary-detailed-container">
        <SummaryView kmlData={kmlData} />
        <DetailedView kmlData={kmlData} className="Detailed" />
      </div>
    </div>
  );
};

export default App;
