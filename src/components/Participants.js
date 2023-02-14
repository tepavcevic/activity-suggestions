import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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

  return (
    <>
      <h2>Get a suggestion based on number of participants:</h2>

      <Form onSubmit={handleSubmit} className="mt-4 d-grid form-mb">
        <Form.Label>Enter number of participants (max of 4 people)</Form.Label>
        <Form.Control
          onChange={handleParticipantsChange}
          disabled={isLoading}
          type="number"
          max={4}
          min={1}
          required
          className="mb-3"
        ></Form.Control>

        <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
          Search
        </Button>
      </Form>
    </>
  );
}
