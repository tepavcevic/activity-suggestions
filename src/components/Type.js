import React, { useState } from "react";

export default function TypeForm({ handleTypeChange, type, setData }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (type) {
      setLoading(true);
      const getData = async () => {
        try {
          const response = await fetch(
            `http://www.boredapi.com/api/activity?type=${type}`
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

  const categories = [
    "education",
    "recreational",
    "social",
    "diy",
    "charity",
    "cooking",
    "relaxation",
    "music",
    "busywork",
  ];

  return (
    <>
      <h2>Get a suggestion based on activity's type:</h2>

      <form onSubmit={handleSubmit}>
        <label>Choose activity type:</label>
        <select
          className="input"
          name="type"
          onChange={handleTypeChange}
          disabled={isLoading}
        >
          <option>Choose an option</option>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <button className="btn-submit" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
    </>
  );
}
