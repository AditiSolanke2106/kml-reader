import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ kmlData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !kmlData.length) return;

    const map = L.map(mapRef.current).setView([20, 78], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    kmlData.forEach((item) => {
      if (item.type === "Point") {
        const [lon, lat] = item.coordinates.map(Number);
        L.marker([lat, lon]).addTo(map).bindPopup(item.type);
      } else if (item.type === "LineString" || item.type === "Polygon") {
        const latlngs = item.coordinates.map((coord) => {
          const [lon, lat] = coord.split(",").map(Number);
          return [lat, lon];
        });

        if (item.type === "LineString") {
          L.polyline(latlngs, { color: "blue" }).addTo(map);
        } else {
          L.polygon(latlngs, { color: "green" }).addTo(map);
        }
      }
    });

    return () => {
      map.remove();
    };
  }, [kmlData]);

  return <div ref={mapRef} style={{ height: "400px", width: "95%" ,marginLeft:"1rem"}} />;
};

export default MapView;
