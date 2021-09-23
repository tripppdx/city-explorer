import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Weather from './Weather.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      weatherData: [],
      // mapUrl: '',
    };
  }
  setSearchQuery = e => {
    e.preventDefault();
    // console.log(e.target.city.value);
    this.setState(
      {
        searchQuery: e.target.city.value,
      },
      this.getLocation
    );
  };
  getLocation = async e => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    // console.log(url);
    // const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;

    try {
      const response = await axios.get(url);
      const location = response.data[0];

      this.setState(
        {
          location,
          error: false,
          // mapUrl: mapUrl,
        },
        this.getForecast
      );
    } catch (error) {
      console.error('Unable to find city', this.state.searchQuery);
      this.setState({
        error: true,
        location: '',
      });
      this.props.showModal();
    }
  };

  getForecast = async () => {
    // console.log(this.state.searchQuery);

    try {
      const forecastUrl = `http://localhost:3001/weather?searchQuery=${this.state.searchQuery}`;

      const daWeather = await axios.get(forecastUrl);
      // console.log(daWeather.data);
      // let weatherArray = daWeather.data;
      // console.log(weatherArray);
      let weatherArray = daWeather.data.map(weather => {
        return weather;
      });
      this.setState({
        weatherData: weatherArray,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.weatherData);
    return (
      <Container fluid>
        <Form onSubmit={this.setSearchQuery}>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" controlId="city">
              <FormControl placeholder="City" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </InputGroup>
        </Form>
        {this.state.error && <h2>Enter a valid city...</h2>}
        {this.state.location.place_id && (
          <Container fluid>
            <h2>The city is: {this.state.location.display_name}</h2>
            <h3>Latitude: {this.state.location.lat}</h3>
            <h3>Longitude: {this.state.location.lon}</h3>
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`}
              alt={this.state.location.display_name}
            ></img>
            {this.state.weatherData.map(weather => (
              <Weather weather={weather} />
              // <p> {weather.date}</p>
            ))}
          </Container>
        )}
      </Container>
    );
  }
}
