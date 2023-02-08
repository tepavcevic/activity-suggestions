import React, { useState } from "react";

export default function AccessibilityForm({
  handleAccessibilityChange,
  accessibility,
  setData,
}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (accessibility.minaccessibility <= accessibility.maxaccessibility) {
      setLoading(true);
      const getData = async () => {
        try {
          const response = await fetch(
            `http://www.boredapi.com/api/activity?minaccessibility=${accessibility.minaccessibility}&maxaccessibility=${accessibility.maxaccessibility}`
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error. The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          console.log(actualData);
          setError(null);
        } catch (error) {
          setError(error.message);
          setData(null);
        } finally {
          setLoading(false);
        }
      };
      getData();
    }
  };

  return (
    <>
      <h2>Get a suggestion based on activity's accessibility:</h2>

      <form onSubmit={handleSubmit}>
        <label>Accessibility (max to min values):</label>
        <input
          className="input"
          name="minaccessibility"
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          onChange={handleAccessibilityChange}
          disabled={isLoading}
        />
        <input
          className="input"
          name="maxaccessibility"
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handleAccessibilityChange}
          disabled={isLoading}
        />
        <button className="btn-submit" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
    </>
  );
}
