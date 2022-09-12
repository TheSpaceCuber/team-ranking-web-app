import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NewRoundForm = (props) => {
    const [teamInfo, setTeamInfo] = useState("")
    const [matchResult, setMatchResult] = useState("")

    const navigate = useNavigate()

    const api_endpoint = process.env.REACT_APP_ENV === "DEV" 
        ? "http://localhost:5000/"
        : "https://lionfish-app-38qhg.ondigitalocean.app/"

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(1)
        axios.post(api_endpoint + "new-round", { teamInfo, matchResult })
            .then(res => {
                console.log(res.data)
                props.setResults([...props.results, res.data])
            })
            .catch((err) => {
                alert(err.response.data.message)
                console.log(err.response.data.message)
            })
        navigate('/')
        // navigate(0)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Col>
                        <div className='mt-5'>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Team Info</Form.Label>
                                <Form.Control as="textarea" rows="12"
                                    onChange={(e) => { setTeamInfo(e.target.value) }} />
                            </Form.Group>
                        </div>
                    </Col>
                    <Col>
                        <div className='mt-5'>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Match Results</Form.Label>
                                <Form.Control as="textarea" rows="12"
                                    onChange={(e) => { setMatchResult(e.target.value) }} />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className='mt-5'>
                <Button variant="primary" type="submit">Submit</Button>
            </div>
        </Form>
    )
}

export default NewRoundForm