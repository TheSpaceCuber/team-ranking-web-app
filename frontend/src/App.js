import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import NewRoundForm from './components/NewRoundForm';
import HomePage from './components/HomePage'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState } from "react"


function App() {
  const [results, setResults] = useState([])

  return (
    <div className="App">
      <HashRouter basename="/">
        <NavigationBar />
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<HomePage setResults={setResults} results={results}/>} />
                <Route path="/new-round" element={<NewRoundForm setResults={setResults} results={results}/>} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;
