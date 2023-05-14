import connection from "../database/connection.js"
import checkAccess, { checkRoleClearance } from "../database/accessQueries.js"
import {
	getAllTeams,
	checkTeamExists,
	createTeam,
	updateTeam,
	deleteTeam
} from "../database/teamQueries.js"

const teamFromArray = team => ({
	teamId: team[0],
	teamName: team[1],
	teamLeader: team[2],
	purpose: team[3]
})

export async function getAllController(req, res) {
	const user = req.user

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 1)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const teams = await getAllTeams(conn)

		const result = {
			count: teams.rows.length,
			teams: teams.rows.map(team => teamFromArray(team))
		}

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function createController(req, res) {
	const user = req.user
	const { teamId, teamName, purpose, teamLeaderId } = req.body

	if (
		!teamId ||
		!teamName ||
		!teamLeaderId ||
		typeof teamId !== "number" ||
		typeof teamName !== "string" ||
		(typeof purpose !== "string" && typeof purpose !== "undefined") ||
		typeof teamLeaderId !== "number" ||
		teamId <= 0 ||
		teamId % 1 !== 0 ||
		teamId.toString().length >= 38 ||
		teamLeaderId <= 0 ||
		teamLeaderId % 1 !== 0 ||
		teamLeaderId.toString().length >= 38 ||
		teamName.length >= 20 ||
		(purpose && purpose.length >= 50) ||
		teamLeaderId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 3)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTeamExists(conn, teamId)
		if (exists) return res.status(409).json({ error: "Conflict" })

		const team = await createTeam(conn, teamId, teamName, purpose, teamLeaderId)
		if (!team) return res.status(500).json({ error: "Internal server error" })

		const result = teamFromArray(team.rows[0])

		res.status(201).json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function updateController(req, res) {
	const user = req.user
	const { teamId, teamName, purpose, teamLeaderId } = req.body

	if (
		!teamId ||
		!teamName ||
		!teamLeaderId ||
		typeof teamId !== "number" ||
		typeof teamName !== "string" ||
		(typeof purpose !== "string" && typeof purpose !== "undefined") ||
		typeof teamLeaderId !== "number" ||
		teamId <= 0 ||
		teamId % 1 !== 0 ||
		teamId.toString().length >= 38 ||
		teamLeaderId <= 0 ||
		teamLeaderId % 1 !== 0 ||
		teamLeaderId.toString().length >= 38 ||
		teamName.length >= 20 ||
		(purpose && purpose.length >= 50) ||
		teamLeaderId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 3)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTeamExists(conn, teamId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const team = await updateTeam(conn, teamId, teamName, purpose, teamLeaderId)
		if (!team) return res.status(500).json({ error: "Internal server error" })

		const result = teamFromArray(team.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}

export async function deleteController(req, res) {
	const user = req.user
	const { teamId } = req.body

	if (
		!teamId ||
		typeof teamId !== "number" ||
		teamId <= 0 ||
		teamId % 1 !== 0 ||
		teamId.toString().length >= 38
	)
		return res.status(400).json({ error: "Bad request" })

	try {
		const conn = await connection()

		const access = await checkAccess(conn, user, true)
		if (!access) return res.status(401).json({ error: "Unauthorized" })

		const roleClearance = await checkRoleClearance(conn, user, 3)
		if (!roleClearance) return res.status(403).json({ error: "Forbidden" })

		const exists = await checkTeamExists(conn, teamId)
		if (!exists) return res.status(404).json({ error: "Not found" })

		const team = await deleteTeam(conn, teamId)
		if (!team) return res.status(400).json({ error: "Bad request" })

		const result = teamFromArray(team.rows[0])

		res.json(result)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
}
