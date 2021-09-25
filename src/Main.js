import { Component } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Location from './Location.js';
import Weather from './Weather.js';
import Movies from './Movies.js';
// require('dotenv').config();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      location: {},
      error: false,
      weatherData: [],
      movieData: [],
    };
  }
  setSearchQuery = e => {
    e.preventDefault();
    this.setState(
      {
        searchQuery: e.target.city.value,
      },
      this.getLocation
    );
  };

  getLocation = async e => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchQuery}&format=json`;

    try {
      const response = await axios.get(url);
      const location = response.data[0];

      this.setState(
        {
          location,
          error: false,
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
    try {
      const forecastUrl = `${process.env.REACT_APP_API_URL}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}`;
      const weatherResponse = await axios.get(forecastUrl);

      this.setState(
        {
          weatherData: weatherResponse.data,
        },
        this.getMovies
      );
    } catch (err) {
      console.log(err);
    }
  };

  getMovies = async () => {
    try {
      const moviesUrl = `${process.env.REACT_APP_API_URL}/movies?searchQuery=${this.state.searchQuery}`;

      const moviesResponse = await axios.get(moviesUrl);
      let moviesArray = moviesResponse.data.map(movie => {
        return movie;
      });
      this.setState({
        movieData: moviesArray,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
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
            <Location location={this.state.location} />
            <h3 className="text-center">Weather Forecast</h3>
            <Weather weather={this.state.weatherData}></Weather>
            <h3 className="text-center">Movies</h3>
            <Movies movies={this.state.movieData}></Movies>
          </Container>
        )}
      </Container>
    );
  }
}
