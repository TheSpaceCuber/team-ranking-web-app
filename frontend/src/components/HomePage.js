import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table';
import RoundTable from "./RoundTable"

const HomePage = (props) => {

    // Round details contain all the information for a single round for both groups
    const [roundDetails, setRoundDetails] = useState([])

    const api_endpoint = process.env.REACT_APP_ENV === "DEV"
        ? "http://localhost:5000/"
        : "https://lionfish-app-38qhg.ondigitalocean.app/"

    useEffect(() => {
        axios.get(api_endpoint)
            .then((res) => {
                props.setResults(res.data)
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleDelete = (id) => {
        axios.delete(api_endpoint + "delete/" + id)
            .then((res) => {
                props.setResults(props.results.filter((result) => result._id !== id))
            })
            .catch((err) => console.log(err))
    }

    const showDetails = (id) => {
        axios.get(api_endpoint + id)
            .then((res) => {
                setRoundDetails(res.data)
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
                        <RoundTable groupRoundDetails={roundDetails['groupOne']} />
                    </Row>
                    <Row>
                        <RoundTable groupRoundDetails={roundDetails['groupTwo']} />
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage