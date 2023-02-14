import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function PriceForm({ handlePriceChange, price, setData }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    //need to let the user know this is a  requirement (validation?)
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

      <Form onSubmit={handleSubmit} className="mt-4 d-grid form-mb">
        <Form.Group className="mb-3" controlId="formGroupMinPrice">
          <Form.Label>Minimal value for price</Form.Label>
          <Form.Control
            type="range"
            name="minprice"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            onChange={handlePriceChange}
            disabled={isLoading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupMaxPrice">
          <Form.Label>Maximal value for price</Form.Label>
          <Form.Control
            type="range"
            name="maxprice"
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            onChange={handlePriceChange}
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
