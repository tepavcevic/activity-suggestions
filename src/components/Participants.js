import React, { useState } from "react";

export default function ParticipantsForm({
  handleParticipantsChange,
  participants,
  setData,
}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    const getData = async () => {
      try {
        const response = await fetch(
          `http://www.boredapi.com/api/activity?participants=${participants}`
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
  };

  console.log(participants);

  return (
    <>
      <h2>Get a suggestion based on number of participants:</h2>

      <form onSubmit={handleSubmit}>
        <label>Enter number of participants:</label>
        <input
          className="input"
          name="participants"
          type="number"
          min={1}
          max={5}
          defaultValue={1}
          onChange={handleParticipantsChange}
          disabled={isLoading}
        />
        <button className="btn-submit" type="submit" disabled={isLoading}>
          Search
        </button>
      </form>
    </>
  );
}
