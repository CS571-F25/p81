import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import resourcesJson from "../../resources/resources.json";
import ResourceCard from "../ResourceCard";
import "./Resources.css";

export default function Resources() {
  const [resources] = useState(resourcesJson);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get all unique categories from resources
  const allCategories = [
    "all",
    ...new Set(resources.map((r) => r.category).filter(Boolean)),
  ];

  // Filter resources based on selected category
  const filteredResources =
    selectedCategory === "all"
      ? resources
      : resources.filter((r) => r.category === selectedCategory);

  return (
    <div>
      <h1>Student Resources</h1>
      <p className="resources-intro">
        Explore helpful resources to support your ascademic journey at
        UW-Madison.
      </p>
      <Container fluid className="resources-container">
        <div className="filter-section">
          <Form.Group style={{ maxWidth: "300px" }}>
            <Form.Label>Filter by Category:</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Resources" : category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <Row>
          {filteredResources.map((resource, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <ResourceCard {...resource} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
