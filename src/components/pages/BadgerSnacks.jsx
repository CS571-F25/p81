import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Form } from "react-bootstrap";
import restaurantsJson from "../../resources/restaurants.json";
import SnackCard from "../SnackCard.jsx";
import "./BadgerSnacks.css";
import useStorage from "../../hooks/useStorage.js";
export default function BadgerSnacks() {
  const [restaurants, setRestaurants] = useStorage(
    "restaurants",
    restaurantsJson
  );
  const [selectedTag, setSelectedTag] = useState("all");

  // Get all unique tags from restaurants
  const allTags = [
    "all",
    "Favorites",
    ...new Set(restaurants.flatMap((r) => r.tags || [])),
  ];

  // Filter restaurants based on selected tag
  let filteredRestaurants =
    selectedTag === "all"
      ? restaurants
      : restaurants.filter((r) => r.tags && r.tags.includes(selectedTag));
  if (selectedTag === "Favorites") {
    filteredRestaurants = restaurants.filter((r) => r.liked);
  }

  function handleFavorite(restaurantId) {
    console.log("Toggling favorite for restaurant ID:", restaurantId);
    const newRestaurants = restaurants.map((restaurant) => {
      if (restaurant.id === restaurantId) {
        console.log(restaurant);
        return {
          ...restaurant,
          liked: !restaurant.liked,
        };
      }
      return restaurant;
    });
    console.log(newRestaurants);
    setRestaurants(newRestaurants);
  }

  return (
    <div>
      <h1>Badger Snacks</h1>
      <Container fluid className="badger-snacks-container">
        <div className="filter-section" style={{ marginBottom: "1.5rem" }}>
          <Form.Group style={{ maxWidth: "300px" }}>
            <Form.Label>Filter by Tag:</Form.Label>
            <Form.Select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag === "all" ? "All Restaurants" : tag}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <Row>
          {filteredRestaurants.map((restaurant) => {
            return (
              <Col xs={12} sm={6} md={4} lg={3} key={restaurant.id}>
                <SnackCard
                  {...restaurant}
                  onFavorite={() => handleFavorite(restaurant.id)}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
