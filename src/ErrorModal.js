import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class ErrorModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>Enter a valid city...</Card.Title>
              {/* <Card.Text>Enter valid city</Card.Text> */}
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
