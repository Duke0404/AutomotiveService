import oracledb from "oracledb"

export default async function connection() {
	try {
		const connection = oracledb.getConnection({
			user: "ddas",
			password: "ddas",
			connectString: "ora4.ii.pw.edu.pl:1521/pdb1.ii.pw.edu.pl"
		})

		return connection
	} catch (err) {
		console.error(err)
	}
}

export const outBindObject = () => ({ type: oracledb.NUMBER, dir: oracledb.BIND_OUT })
