import Result from '../models/result.js'
import * as parser from './parser.js'
import * as errorChecker from './errorChecker.js'
/**
 * Returns the entire collection of results
 * @param {} req 
 * @param {*} res 
 */
export async function findAllResults(req, res) {
    try {
        // https://stackoverflow.com/questions/13847766/how-to-sort-a-collection-by-date-in-mongodb
        const results = await Result.find().sort({_id:1}) 
        res.status(200).json(results)
    } catch {
        res.status(500).json(results)
        console.log(err)
    }
}

/**
 * Returns the result from a single round
 * @param {*} req 
 * @param {*} res 
 */
export async function findResultById(req, res) {
    try {
        const result = await Result.findById(req.params.id)
        res.status(200).json(result)
    } catch {
        res.status(500).json(err)
        console.log(err)
    }
}

/**
 * Parses the given inputs for a new round and stores the result
 * @param {*} req 
 * @param {*} res 
 */
export async function submitNewRound(req, res) {
    try {
        errorChecker.isValidTeamInfo(req.body.teamInfo.split("\n"))
        errorChecker.isValidMatchResult(req.body.matchResult.split("\n"))
        
        const scoreboard = parser.generateScoreboard(req.body.teamInfo, req.body.matchResult)
        const teamRanking = parser.rankTeams(scoreboard)
        
        const result = await Result.create({
            groupOne: teamRanking.groupOne,
            groupTwo: teamRanking.groupTwo
        })
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({'message': err.message})
        console.log(err.message)
    }
}

/**
 * Deletes the results of a specified round
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function deleteResultById(req, res) {
    try {
        const result = await Result.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.sendStatus(404);
        }
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
}
