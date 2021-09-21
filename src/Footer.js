import { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

class Footer extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>{this.props.text}</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
