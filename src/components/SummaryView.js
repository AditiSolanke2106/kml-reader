import React from "react";

const SummaryView = ({ kmlData = [] }) => {
  const summary = kmlData.reduce(
    (acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;

      if (item.name) acc["name"] = (acc["name"] || 0) + 1;
      if (item.description) acc["description"] = (acc["description"] || 0) + 1;
      if (item.coordinates) acc["coordinates"] = (acc["coordinates"] || 0) + 1;

      return acc;
    },
    { kml: 1, Document: 1 }
  );
  return (
    <div className="summary-container">
      <h3>Summary</h3>
      <table className="summary-table">
        <thead>
          <tr style={{ color: "#800080" }}>
            <th>Element Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(summary).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{summary[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryView;
