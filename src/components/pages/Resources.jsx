import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import resourcesJson from "../../resources/resources.json";
import ResourceCard from "../ResourceCard";
import "./Resources.css";

export default function Resources() {
  const [resources] = useState(resourcesJson);

  return (
    <div>
      <h1>Student Resources</h1>
      <p className="resources-intro">
        Explore helpful resources to support your ascademic journey at
        UW-Madison.
      </p>
      <Container fluid className="resources-container">
        <Row>
          {resources.map((resource, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <ResourceCard {...resource} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
