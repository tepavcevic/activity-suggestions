import React, { useState } from "react";

export default function PriceForm({ handlePriceChange, price, setData }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (price.minprice <= price.maxprice) {
      setLoading(true);
      const getData = async () => {
        try {
          const response = await fetch(
            `http://www.boredapi.com/api/activity?minprice=${price.minprice}&maxprice=${price.maxprice}`
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
      <h2>Get a suggestion based on activity's price:</h2>

      <form onSubmit={handleSubmit}>
        <label>Your budget (min and max values):</label>
        <input
          className="input"
          name="minprice"
          type="range"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          onChange={handlePriceChange}
          disabled={isLoading}
        />
        <input
          className="input"
          name="maxprice"
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handlePriceChange}
          disabled={isLoading}
        />
        <button className="btn-submit" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
    </>
  );
}
