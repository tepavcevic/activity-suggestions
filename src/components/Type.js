import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Capitalize } from "../Helpers/Capitalize";

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
            `http://www.boredapi.com/api/activity?type=${type.toLowerCase()}`
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

      <Form onSubmit={handleSubmit} className="mt-4 d-grid form-mb">
        <Form.Group className="mb-3" controlId="formGroupActivityType">
          <Form.Label>Select type of activity</Form.Label>
          <Form.Select
            onChange={handleTypeChange}
            disabled={isLoading}
            aria-label="Activity type select"
            defaultValue="default"
          >
            <option value="default" disabled>
              Choose an option
            </option>
            {categories.map((category) => (
              <option key={category}>{Capitalize(category)}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
          Search
        </Button>
      </Form>
    </>
  );
}
