import { Card, Button } from "react-bootstrap";
import "./SnackCard.css";

export default function SnackCard(props) {
  return (
    <Card className="snack-card">
      <Card.Img
        variant="top"
        src={props.src}
        alt={props.alt}
        className="snack-image"
      />
      <Button
        variant="outline-danger"
        className={`favorite-button ${props.liked ? "favorited" : ""}`}
        onClick={() => props.onFavorite(props.id)}
        aria-label={props.liked ? "Remove from favorites" : "Add to favorites"}
      >
        {props.liked ? "❤️" : "🤍"}
      </Button>
      <Card.Body className="snack-info">
        <Card.Title className="snack-name">{props.name}</Card.Title>
        <Card.Text className="snack-cuisine">{props.cuisine}</Card.Text>
        <div className="snack-details">
          <span className="snack-location">📍 {props.location}</span>
          <span className="snack-rating">⭐ {props.rating}</span>
          <span className="snack-price">{props.price_range}</span>
          <span className="snack-editor-notes">{props.editor_notes}</span>
        </div>
        {props.link && (
          <Button
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            variant="danger"
            className="snack-link"
          >
            Visit Website
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
