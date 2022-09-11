// const teamsInfo = [
//     'firstTeam 17/05 2',
//     'secondTeam 07/02 2',
//     'thirdTeam 24/04 1',
//     'fourthTeam 24/01 1',
//     ''
// ]

// const matchResults = [ 'firstTeam secondTeam 0 3', 'thirdTeam fourthTeam 1 1', '' ]

/**
 * Parsers team registration info and match results to generate
 * a scoreboard with wins, draws, losses, total goals, regDate and groupNum for each team
 * @param {Team registration information} teamsRegInfo 
 * @param {Results for matches between various teams in a single round} matchResults 
 * @returns 
 */
export const generateScoreboard = (teamsRegInfo, matchResults) => {
    const scoreboard = {}
    // convert input from strings to arrays
    const teamsRegInfoList = teamsRegInfo.split("\n")
    const matchResultsList = matchResults.split("\n")

    for (const teamsRegInfoString of teamsRegInfoList) {
        // check for blank string
        if (teamsRegInfoString.trim() == "") { continue } 
        const [teamName, registrationDate, groupNumber] = teamsRegInfoString.split(" ")
        // convert to date format: https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off 
        // given that YYYY-MM-DD format converts correctly and is the easiest method, 
        // we need to change the string to use hyphens in YYYY-MM-DD format
        const regDateArr = registrationDate.split("/")
        const registrationDateWithYear = new Date(new Date().getFullYear() + '-' + regDateArr[1] + '-' + regDateArr[0]);
        const teamInfoObject = {
            'registrationDate' : registrationDateWithYear,
            'groupNumber': Number(groupNumber),
            'totalGoals': 0,
            'wins': 0,
            'draws': 0,
            'losses': 0
        }
        if (teamName in scoreboard) { throw new Error('Duplicate team found: ' + teamName)}
        scoreboard[teamName] = teamInfoObject
    }

    for (const matchResultString of matchResultsList) {
        // check for blank string
        if (matchResultString.trim() == "") { continue } 
        const [firstTeamName, secondTeamName, firstTeamScore, secondTeamScore] = matchResultString.split(" ")
        if (Number(firstTeamScore) > Number(secondTeamScore)) {
            scoreboard[firstTeamName]['wins'] = scoreboard[firstTeamName]['wins'] + 1
            scoreboard[secondTeamName]['losses'] = scoreboard[secondTeamName]['losses'] + 1
        } else if (Number(firstTeamScore) < Number(secondTeamScore)) {
            scoreboard[secondTeamName]['wins'] = scoreboard[secondTeamName]['wins'] + 1
            scoreboard[firstTeamName]['losses'] = scoreboard[firstTeamName]['losses'] + 1
        } else {
            scoreboard[firstTeamName]['draws'] = scoreboard[firstTeamName]['draws'] + 1
            scoreboard[secondTeamName]['draws'] = scoreboard[secondTeamName]['draws'] + 1
        }

        // add goals
        scoreboard[firstTeamName]['totalGoals'] = scoreboard[firstTeamName]['totalGoals'] + Number(firstTeamScore)
        scoreboard[secondTeamName]['totalGoals'] = scoreboard[secondTeamName]['totalGoals'] + Number(secondTeamScore)
    }

    return scoreboard
}

/**
 * Takes in a scoreboard, calculates points/altPoints, splits the teams into their
 * respective groups 1 or 2, and sorts the teams by their points/altPoints/regDate
 * @param {Object containing details and results of all teams after a single round} scoreboard 
 */
export const rankTeams = (scoreboard) => {
    const groupOneLeaderboard = []
    const groupTwoLeaderboard = []
    
    for (const teamName in scoreboard) {
        const currTeam = scoreboard[teamName]
        
        currTeam['teamName'] = teamName
        currTeam['points'] = currTeam.wins * 3 + currTeam.draws
        currTeam['altPoints'] = currTeam.wins * 5 + currTeam.draws * 3 + currTeam.losses

        if (currTeam.groupNumber == 1) {
            groupOneLeaderboard.push(currTeam)
        } else if (currTeam.groupNumber == 2) {
            groupTwoLeaderboard.push(currTeam)
        }
    }

    groupOneLeaderboard.sort((a, b) => {
        return b.points - a.points || b.totalGoals - a.totalGoals || b.altPoints - a.altPoints || 
            a.registrationDate.getTime() - b.registrationDate.getTime()
    })

    groupTwoLeaderboard.sort((a, b) => {
        return b.points - a.points || b.totalGoals - a.totalGoals || b.altPoints - a.altPoints || 
            a.registrationDate.getTime() - b.registrationDate.getTime()
    })

    return {
        'groupOne': groupOneLeaderboard,
        'groupTwo': groupTwoLeaderboard
    }
}

// const scoreboard = generateScoreboard(teamsInfo, matchResults)
// console.log(generateScoreboard(teamsInfo, matchResults))
// console.log(rankTeams(scoreboard))