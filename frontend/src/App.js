import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import NewRoundForm from './components/NewRoundForm';
import HomePage from './components/HomePage'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <NavigationBar />
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new-round" element={<NewRoundForm />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;
