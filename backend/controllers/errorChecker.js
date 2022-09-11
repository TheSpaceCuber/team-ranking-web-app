// const teamsInfo = [
//     'firstTeam 17/05 2',
//     'secondTeam 07/02 2',
//     'thirdTeam 24/04 1',
//     'fourthTeam 24/01 1',
//     ''
// ]

// const matchResults = [ 'firstTeam secondTeam 0 3', 'thirdTeam fourthTeam 1 1', '' ]

/**
 * Checks if team info input is valid
 * @param {*} input 
 * @returns 
 */
export const isValidTeamInfo = (input) => {
    let totalNoOfTeams = 0
    for (const entry of input) {
        if (entry.trim() == "") { continue }
        totalNoOfTeams = totalNoOfTeams + 1
        if (entry.split(" ").length !== 3) { throw new Error("Invalid team info, wrong syntax for line: " + entry) }
        const [teamName, regDate, groupNum] = entry.split(" ")
        if (groupNum != 1 && groupNum != 2) { throw new Error("Invalid team info, Invalid Group Number for line: " + groupNum) }
        const regDateRegex = /^\d{2}\/\d{2}$/
        if (!regDateRegex.test(regDate)) { throw new Error("Invalid team info, Invalid Date for line: " + regDate) }
    }
    if (totalNoOfTeams != 12) {throw new Error("Invalid number of teams (should be 12): " + totalNoOfTeams)}
    return true
}


/**
 * Checks if match result input is valid
 * @param {} input 
 * @returns 
 */
export const isValidMatchResult = (input) => {
    for (const entry of input) {
        if (entry.trim() == "") { continue }
        if (entry.split(" ").length !== 4) { throw new Error("Invalid match result, wrong syntax for line: " + entry) }
        const [firstTeamName, secondTeamName, firstTeamScore, secondTeamScore] = entry.split(" ")
        const postiveNumStringRegex = /^\d+$/
        if (!(postiveNumStringRegex.test(firstTeamScore) && postiveNumStringRegex.test(secondTeamScore))) {
            throw new Error("Invalid team info, Invalid Date for line: " + regDate)
        }
    }
    return true
}