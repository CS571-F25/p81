import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router";
import pic from "../../assets/uw-crest.svg";
import { FaHandHoldingHeart } from "react-icons/fa";

export default function BadgerNavbar() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand as={Link} to="/p81/">
          <img
            alt="Badger Buddies Logo"
            src={pic}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Badgerly Advice <FaHandHoldingHeart />
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav" className="me-auto">
          <Nav>
            <Nav.Link as={Link} to="/p81/dormLottery">
              Dorm Lottery
            </Nav.Link>
            <Nav.Link as={Link} to="/p81/study-snacks">
              Study Snacks
            </Nav.Link>
            <Nav.Link as={Link} to="/p81/resources">
              Resources
            </Nav.Link>
            <Nav.Link as={Link} to='/p81/about'>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to='/p81/contact'>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
