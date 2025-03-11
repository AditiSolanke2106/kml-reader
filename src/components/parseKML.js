import { xml2js } from "xml-js";

export const parseKML = (kmlText) => {
  const jsonData = xml2js(kmlText, { compact: true });

  if (!jsonData.kml || !jsonData.kml.Document) {
    console.error("Invalid KML structure");
    return [];
  }

  let placemarks = jsonData.kml.Document.Placemark || [];
  if (!Array.isArray(placemarks)) placemarks = [placemarks];

  return placemarks.map((placemark) => {
    let type = "Unknown";
    let coordinates = [];
    let totalLength = null;

    if (placemark.Point) {
      type = "Point";
      coordinates = placemark.Point.coordinates._text.trim().split(",");
    } else if (placemark.LineString) {
      type = "LineString";
      coordinates = placemark.LineString.coordinates._text.trim().split(" ");

      totalLength = 0;
      for (let i = 0; i < coordinates.length - 1; i++) {
        const [lon1, lat1] = coordinates[i].split(",").map(Number);
        const [lon2, lat2] = coordinates[i + 1].split(",").map(Number);
        totalLength += getDistance(lat1, lon1, lat2, lon2);
      }
    } else if (placemark.Polygon) {
      type = "Polygon";
      coordinates =
        placemark.Polygon.outerBoundaryIs.LinearRing.coordinates._text
          .trim()
          .split(" ");
    }

    return { type, coordinates, totalLength };
  });
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = (angle) => (angle * Math.PI) / 180;
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
