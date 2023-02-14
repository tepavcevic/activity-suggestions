import React, { useState, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
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

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h1>Im' bored, give me something</h1>

      <Tab.Container id="categories-tabs" defaultActiveKey="price">
        {width >= 580 ? (
          <Nav variant="tabs" className="mb-3" fill>
            <Nav.Item>
              <Nav.Link eventKey="price">Price</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="accessibility">Accessibility</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="activity-type">Activity Type</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="number-of-participants">
                Number of Participants
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav variant="pills" className="flex-column mb-3">
            <Nav.Item>
              <Nav.Link eventKey="price">Price</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="accessibility">Accessibility</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="activity-type">Activity Type</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="number-of-participants">
                Number of Participants
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}

        <Tab.Content>
          <Tab.Pane eventKey="price">
            <PriceForm
              handlePriceChange={handlePriceChange}
              price={price}
              setData={setData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="accessibility">
            <AccessibilityForm
              handleAccessibilityChange={handleAccessibilityChange}
              accessibility={accessibility}
              setData={setData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="activity-type">
            <TypeForm
              handleTypeChange={handleTypeChange}
              type={type}
              setData={setData}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="number-of-participants">
            <ParticipantsForm
              handleParticipantsChange={handleParticipantsChange}
              participants={participants}
              setData={setData}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {data && <Main data={data} />}
    </>
  );
}

export default App;
