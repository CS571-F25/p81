import { Card, Button } from "react-bootstrap";
import "./ResourceCard.css";

export default function ResourceCard(props) {
  return (
    <Card className="resource-card">
      {/* {props.image && (
        <Card.Img
          variant="top"
          src={props.image}
          alt={props.title}
          className="resource-image"
        />
      )} */}
      <Card.Body className="resource-info">
        <Card.Title className="resource-title">{props.title}</Card.Title>
        <Card.Text className="resource-description">
          {props.description}
        </Card.Text>
        {props.category && (
          <span className="resource-category">{props.category}</span>
        )}
        {props.link && (
          <Button
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="resource-link"
          >
            Learn More
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
