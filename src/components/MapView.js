import React, { useEffect, useRef } from "react";
import { DOMParser } from "@xmldom/xmldom";
import { kml } from "@tmcw/togeojson"; 
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix marker icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ kmlData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!kmlData || !mapRef.current) return;

    const map = L.map(mapRef.current).setView([20, 78], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    try {
      const parser = new DOMParser();
      const kmlDom = parser.parseFromString(kmlData, "text/xml");

      if (!kmlDom || !kmlDom.documentElement || kmlDom.getElementsByTagName("Placemark").length === 0) {
        console.error("KML parsing failed or contains no placemarks.");
        return;
      }

      const geoJsonData = kml(kmlDom);

      if (!geoJsonData || !geoJsonData.features || geoJsonData.features.length === 0) {
        console.error("GeoJSON conversion failed. Check your KML structure.");
        return;
      }

      const geoJsonLayer = L.geoJSON(geoJsonData, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon: new L.Icon.Default() });
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
        },
      }).addTo(map);

      map.fitBounds(geoJsonLayer.getBounds());

    } catch (error) {
      console.error("Error processing KML:", error);
    }

    return () => {
      map.remove();
    };
  }, [kmlData]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }} />;
};

export default MapView;
