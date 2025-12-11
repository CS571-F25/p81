import { Nav } from "react-bootstrap";
import "./Home.css";
import { Image } from "react-bootstrap";
import Bascom from "../../assets/bascom.jpg";
import { Link } from "react-router";
export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Badgerly Advice!</h1>
      <Image
        src={Bascom}
        alt="UW-Madison Campus"
        fluid
        style={{
          maxHeight: "400px",
          margin: "1rem 0",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "3px solid black",
        }}
      />
      <h2>
        Your go-to atypical resource for UW-Madison students of all majors and
        backgrounds.
      </h2>
      {/* and here we have some quick links to the different pages  */}
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link as={Link} to="/p81/dormLottery">
            Dorm Lottery
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/p81/study-snacks">
            Hungry? Try out our favorites!
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/p81/about">
            About Us
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/p81/contact">
            Help Us Help You
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
