import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

export default class Weather extends Component {
  render() {
    return (
      <Row xs={1} sm={2} md={3} lg={4}>
        {this.props.weather.map((weather, idx) => (
          <WeatherDay key={idx} weatherDay={weather} />
        ))}
      </Row>
    );
  }
}

class WeatherDay extends Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>{this.props.weatherDay.date}</ListGroup.Item>
          <ListGroup.Item>{this.props.weatherDay.description}</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
}
