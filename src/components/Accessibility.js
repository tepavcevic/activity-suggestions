import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AccessibilityForm({
  handleAccessibilityChange,
  accessibility,
  setData,
}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    //a way of conveying this message to the user
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

      <Form onSubmit={handleSubmit} className="mt-4 d-grid form-mb">
        <Form.Group className="mb-3" controlId="formGroupMinAccessibility">
          <Form.Label>Minimal value for accessibility</Form.Label>
          <Form.Control
            type="range"
            name="minaccessibility"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            onChange={handleAccessibilityChange}
            disabled={isLoading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupMaxAccessibility">
          <Form.Label>Maximal value for accessibility</Form.Label>
          <Form.Control
            type="range"
            name="maxaccessibility"
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            onChange={handleAccessibilityChange}
            disabled={isLoading}
          />
        </Form.Group>

        <Button variant="primary" size="lg" type="submit" disabled={isLoading}>
          Search
        </Button>
      </Form>
    </>
  );
}
