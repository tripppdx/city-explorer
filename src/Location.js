import { Component } from 'react';

export default class Location extends Component {
  render() {
    return (
      <>
        <h2>The city is: {this.props.location.display_name}</h2>
        <h3>Latitude: {this.props.location.lat}</h3>
        <h3>Longitude: {this.props.location.lon}</h3>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${this.props.location.lat},${this.props.location.lon}&zoom=10`}
          alt={this.props.location.display_name}
        ></img>
      </>
    );
  }
}
