import { getConnection } from "oracledb"

async function initialize() {
	let connection

	try {
		connection = getConnection({
			user: "ddas",
			password: "ddas",
			connectString: "ora4.ii.pw.edu.pl:1521/pdb1.ii.pw.edu.pl"
		})
	}
	catch (err) {
		console.error(err)
	}
	finally {
		if (connection) {
			try {
				await connection.close()
			}
			catch (err) {
				console.error(err)
			}
		}
	}
}

export default initialize