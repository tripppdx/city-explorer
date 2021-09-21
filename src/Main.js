import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
    };
  }
  getLocation = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      const response = await axios.get(url);
      const location = response.data[0];

      this.setState({
        location,
        error: false,
      });
    } catch (error) {
      console.error('Unable to find city', this.state.searchQuery);
      this.setState({
        error: true,
        location: '',
      });
    }
  };
  render() {
    return (
      <Container fluid>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="City"
            onChange={event =>
              this.setState({ searchQuery: event.target.value })
            }
          />
          <Button variant="primary" onClick={this.getLocation}>
            Search
          </Button>
        </InputGroup>
        {this.state.error && <h2>Enter a valid city...</h2>}
        {this.state.location.place_id && (
          <Container fluid>
            <h2>The city is: {this.state.location.display_name}</h2>
            <h3>Latitude: {this.state.location.lat}</h3>
            <h3>Longitude: {this.state.location.lon}</h3>
          </Container>
        )}
      </Container>
    );
  }
}
