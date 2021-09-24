import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Movies extends Component {
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
