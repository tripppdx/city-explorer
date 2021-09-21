import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Container from 'react-bootstrap/Container';
import ErrorModal from './ErrorModal.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <Container fluid>
        <Header title="City Explorer" />
        <Main showModal={this.showModal} />
        <Footer text="Author: Harvey Lucas" />
        <ErrorModal
          showModal={this.state.showModal}
          hideModal={this.hideModal}
        />
      </Container>
    );
  }
}

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
