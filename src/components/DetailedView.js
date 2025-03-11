import React from "react";

const DetailedView = ({ kmlData }) => {
  return (
    <div>
      <h3>Detailed View</h3>
      <table border="1">
        <thead>
          <tr style={{ color: "#800080" }}>
            <th>Element Type</th>
            <th>Coordinates</th>
            <th>Length (if applicable)</th>
          </tr>
        </thead>
        <tbody>
          {kmlData.length > 0 ? (
            kmlData.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>
                  {item.coordinates ? item.coordinates.join(", ") : "N/A"}
                </td>
                <td>
                  {item.totalLength
                    ? `${item.totalLength.toFixed(2)} km`
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailedView;
