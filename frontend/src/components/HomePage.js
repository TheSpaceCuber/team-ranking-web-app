import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';

const HomePage = (props) => {
    
    const [resultDetails, setResultDetails] = useState([])

    const api_endpoint = process.env.REACT_APP_ENV === "DEV"
        ? "http://localhost:5000/"
        : "https://lionfish-app-38qhg.ondigitalocean.app/"
    
    useEffect(() => {
        axios.get(api_endpoint)
            .then((res) => {
                console.log('useEffect triggered on Homepage')
                props.setResults(res.data)
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = (id) => {
        axios.delete(api_endpoint + "delete/" + id)
            .then((res) => {
                console.log(props.results.filter((result) => result._id !== id))
                props.setResults(props.results.filter((result) => result._id !== id))
            })
            .catch((err) => console.log(err))
    }

    const showDetails = (id) => {
        axios.get(api_endpoint + id)
            .then((res) => {
                setResultDetails(res.data)
            })
            .catch((err) => console.log(err))
    }
    return (
        <Container className='mt-3'>
            <Row>
                <Col sm={3}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.results.map((val, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            {key + 1}
                                        </td>
                                        <td>
                                            <Button onClick={() => showDetails(val._id)} size="sm" variant="primary">Show</Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => handleDelete(val._id)} size="sm" variant="danger">Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Button onClick={() => window.location.reload(false)} size="sm" variant="primary">Refresh Results</Button>
                </Col>
                <Col>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Team (G1)</th>
                                    <th>Wins</th>
                                    <th>Draws</th>
                                    <th>Losses</th>
                                    <th>Points</th>
                                    <th>Total Goals</th>
                                    <th>Alt Points</th>
                                    <th>Registration Date</th>
                                    <th>Qualify?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Justification for adding question mark below: 
                            https://stackoverflow.com/questions/69080597/%C3%97-typeerror-cannot-read-properties-of-undefined-reading-map */}
                                {resultDetails['groupOne']?.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.teamName}</td>
                                            <td>{val.wins}</td>
                                            <td>{val.draws}</td>
                                            <td>{val.losses}</td>
                                            <td>{val.points}</td>
                                            <td>{val.totalGoals}</td>
                                            <td>{val.altPoints}</td>
                                            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString */}
                                            <td>{new Date(val.registrationDate).toLocaleDateString('en-GB')}</td>
                                            <td>{key < 4 ? "Y" : "N"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Team (G2)</th>
                                    <th>Wins</th>
                                    <th>Draws</th>
                                    <th>Losses</th>
                                    <th>Points</th>
                                    <th>Total Goals</th>
                                    <th>Alt Points</th>
                                    <th>Registration Date</th>
                                    <th>Qualify?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultDetails['groupTwo']?.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.teamName}</td>
                                            <td>{val.wins}</td>
                                            <td>{val.draws}</td>
                                            <td>{val.losses}</td>
                                            <td>{val.points}</td>
                                            <td>{val.totalGoals}</td>
                                            <td>{val.altPoints}</td>
                                            <td>{new Date(val.registrationDate).toLocaleDateString('en-GB')}</td>
                                            <td>{key < 4 ? "Y" : "N"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage