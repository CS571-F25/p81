import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import restaurantsJson from "../../resources/restaurants.json";
import SnackCard from "../SnackCard.jsx";
import "./BadgerSnacks.css";
import useStorage from "../../hooks/useStorage.js";
export default function BadgerSnacks() {
  const [restaurants, setRestaurants] = useStorage(
    "restaurants",
    restaurantsJson
  );

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
        <Row>
          {restaurants.map((restaurant) => {
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
