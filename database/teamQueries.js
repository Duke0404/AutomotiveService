export async function getAllTeams(conn) {
	const query =
		"SELECT TEAM_ID, TEAM_NAME, EMPLOYEE_NAME, PURPOSE FROM TEAM JOIN EMPLOYEE ON TEAM_LEADER_ID = EMPLOYEE_ID"

	return await conn.execute(query)
}

export async function getTeam(conn, teamId) {
	const query =
		"SELECT TEAM_ID, TEAM_NAME, EMPLOYEE_NAME, PURPOSE FROM TEAM JOIN EMPLOYEE ON TEAM_LEADER_ID = EMPLOYEE_ID WHERE TEAM_ID = :1"
	const values = [teamId]

	return await conn.execute(query, values)
}

export async function checkTeamExists(conn, teamId) {
	const query = "SELECT TEAM_ID FROM TEAM WHERE TEAM_ID = :1"
	const values = [teamId]

	const result = await conn.execute(query, values)

	return result.rows.length === 1
}

export async function createTeam(conn, teamId, teamName, purpose, teamLeaderId) {
	const query = purpose
		? "INSERT INTO TEAM (TEAM_ID, TEAM_NAME, PURPOSE, TEAM_LEADER_ID) VALUES (:1, :2, :3, :4)"
		: "INSERT INTO TEAM (TEAM_ID, TEAM_NAME, TEAM_LEADER_ID) VALUES (:1, :2, :3)"

	const values = purpose
		? [teamId, teamName, purpose, teamLeaderId]
		: [teamId, teamName, teamLeaderId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getTeam(conn, teamId) : null
}

export async function updateTeam(conn, teamId, teamName, purpose, teamLeaderId) {
	const query = purpose
		? "UPDATE TEAM SET TEAM_NAME = :1, PURPOSE = :2, TEAM_LEADER_ID = :3 WHERE TEAM_ID = :4"
		: "UPDATE TEAM SET TEAM_NAME = :1, TEAM_LEADER_ID = :2 WHERE TEAM_ID = :3"
	const values = purpose
		? [teamName, purpose, teamLeaderId, teamId]
		: [teamName, teamLeaderId, teamId]

	const result = await conn.execute(query, values, { autoCommit: true })

	return result.rowsAffected === 1 ? await getTeam(conn, teamId) : null
}

export async function deleteTeam(conn, teamId) {
	const delDetails = await getTeam(conn, teamId)

	const query = "DELETE FROM TEAM WHERE TEAM_ID = :1"
	const values = [teamId]

	const result = await conn.execute(query, values, { autoCommit: true })

	const delCheck = (await getTeam(conn, teamId)).rows.length === 0

	return result.rowsAffected === 1 && delCheck ? delDetails : null
}
