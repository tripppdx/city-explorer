import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export default class Movies extends Component {
  render() {
    return (
      <Row xs={1} sm={2} md={3} lg={4}>
        {this.props.movies.map(movie => (
          <MovieDay movie={movie}> </MovieDay>
        ))}
      </Row>
    );
  }
}

class MovieDay extends Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.movie.poster} />
        <Card.Body>
          <Card.Title>{this.props.movie.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
}
