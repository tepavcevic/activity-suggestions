import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import PriceForm from "./components/Price";
import AccessibilityForm from "./components/Accessibility";
import TypeForm from "./components/Type";
import ParticipantsForm from "./components/Participants";
import Main from "./components/Activity";

function App() {
  const [data, setData] = useState(null);
  const [accessibility, setAccessibility] = useState({
    minaccessibility: 0,
    maxaccessibility: 1,
  });
  const [price, setPrice] = useState({ minprice: 0, maxprice: 1 });
  const [type, setType] = useState(null);
  const [participants, setParticipants] = useState(1);

  const handlePriceChange = (event) => {
    setPrice({
      ...price,
      [event.target.name]: event.target.value,
    });
  };

  const handleAccessibilityChange = (event) => {
    setAccessibility({
      ...accessibility,
      [event.target.name]: event.target.value,
    });
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleParticipantsChange = (event) => {
    setParticipants(event.target.value);
  };

  return (
    <>
      <h1>Im' bored :(</h1>
      <Tabs defaultActiveKey="price" id="tab-activities" className="mb-3">
        <Tab eventKey="price" title="Price">
          <PriceForm
            handlePriceChange={handlePriceChange}
            price={price}
            setData={setData}
          />
        </Tab>
        <Tab eventKey="accessibility" title="Accessibility">
          <AccessibilityForm
            handleAccessibilityChange={handleAccessibilityChange}
            accessibility={accessibility}
            setData={setData}
          />
        </Tab>
        <Tab eventKey="activity-type" title="Activity type">
          <TypeForm
            handleTypeChange={handleTypeChange}
            type={type}
            setData={setData}
          />
        </Tab>
        <Tab eventKey="number-of-participants" title="Number of participants">
          <ParticipantsForm
            handleParticipantsChange={handleParticipantsChange}
            participants={participants}
            setData={setData}
          />
        </Tab>
      </Tabs>
      {data && <Main data={data} />}
    </>
  );
}

export default App;
