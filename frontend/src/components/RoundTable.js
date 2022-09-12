import React from "react"
import Table from 'react-bootstrap/Table';

/**
 * Displays all information regarding a single round from wins, losses to points.
 * @param {*} props 
 * @returns 
 */
const RoundTable = (props) => {
    return (
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
                {props.groupRoundDetails?.map((val, key) => {
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
    )
}

export default RoundTable