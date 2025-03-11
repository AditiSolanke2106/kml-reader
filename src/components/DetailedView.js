import React, { useEffect } from "react";

const DetailedView = ({ kmlData }) => {
  useEffect(() => {
    console.log("Received KML Data:", kmlData);
  }, [kmlData]);

  return (
    <div>
      <h3>Detailed View</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Element Type</th>
            <th>Coordinates</th>
          </tr>
        </thead>
        <tbody>
          {kmlData && kmlData.length > 0 ? (
            kmlData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.coordinates ? item.coordinates.join(", ") : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedView;
