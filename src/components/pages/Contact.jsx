import { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import creatorsJson from "../../resources/creators.json";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    creator: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.creator) newErrors.creator = "Please select a creator";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get selected creator email
    const selectedCreator = creatorsJson.find((c) => c.id === formData.creator);

    // Create mailto link
    const mailtoLink = `mailto:${selectedCreator.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    setSubmitted(true);
    setFormData({
      creator: "",
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <Container>
        <h1>Contact Us</h1>
        <p className="contact-intro">
          Have a suggestion or feedback for Badgerly Advice? We'd love to hear
          from you! Select a creator below and send us your thoughts.
        </p>

        {submitted && (
          <Alert variant="success" className="mt-3">
            Thank you! Your email client should have opened. If not, please
            check your email settings.
          </Alert>
        )}

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} className="contact-form">
              <Form.Group className="mb-3">
                <Form.Label htmlFor="creator-select">Send To *</Form.Label>
                <Form.Select
                  id="creator-select"
                  name="creator"
                  value={formData.creator}
                  onChange={handleChange}
                  isInvalid={!!errors.creator}
                >
                  <option value="">Select a creator...</option>
                  {creatorsJson.map((creator) => (
                    <option key={creator.id} value={creator.id}>
                      {creator.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.creator}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="name-input">Your Name *</Form.Label>
                <Form.Control
                  id="name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="email-input">Your Email *</Form.Label>
                <Form.Control
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="subject-input">Subject *</Form.Label>
                <Form.Control
                  id="subject-input"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  isInvalid={!!errors.subject}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="message-input">Message *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  id="message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your suggestions, feedback, or ideas..."
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="danger" type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
