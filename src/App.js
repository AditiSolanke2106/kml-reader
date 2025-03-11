import React, { useState } from "react";
import FileUploader from "./components/FileUpload";
import Summary from "./components/SummaryView";
import DetailedView from "./components/DetailedView";
import MapView from "./components/MapView";
import "./App.css"

const App = () => {
  const [elementCounts, setElementCounts] = useState({});
  const [lineStrings, setLineStrings] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleFileUpload = (kml) => {
    parseKml(kml);
  };

  const parseKml = (kml) => {
    const elements = kml.getElementsByTagName("*");
    const counts = {};
    const lines = [];

    for (let i = 0; i < elements.length; i++) {
      const tagName = elements[i].tagName;
      counts[tagName] = (counts[tagName] || 0) + 1;

      if (tagName === "LineString") {
        const coordinatesElement = elements[i].getElementsByTagName("coordinates")[0];
        if (!coordinatesElement) continue;
        
        const coordinates = coordinatesElement.textContent.trim();
        if (!coordinates) continue;

        const length = calculateLineLength(coordinates);
        const name = elements[i].parentNode.getElementsByTagName("name")[0]?.textContent || "Unnamed";

        lines.push({ name, length });
      }
    }

    setElementCounts(counts);
    setLineStrings(lines);
  };

  const calculateLineLength = (coordinates) => {
    const coordsArray = coordinates.split(" ").map((coord) => coord.split(",").map(Number));
    let totalLength = 0;

    for (let i = 0; i < coordsArray.length - 1; i++) {
      const [lon1, lat1] = coordsArray[i];
      const [lon2, lat2] = coordsArray[i + 1];
      totalLength += haversineDistance(lat1, lon1, lat2, lon2);
    }

    return totalLength;
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radius of Earth in meters
    const toRad = (deg) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <div>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
</button>

      <h1>KML File Reader</h1>
      <FileUploader onFileUpload={handleFileUpload} />
      <MapView />
      <Summary elementCounts={elementCounts} />
      <DetailedView lineStrings={lineStrings} />
    </div>
  );
};

export default App;