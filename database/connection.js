import oracledb from "oracledb"

export default async function connection() {
	try {
		const connection = oracledb.getConnection({
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			connectString: process.env.DB_HOST + "/" + process.env.DB_NAME
		})

		return connection
	} catch (err) {
		console.error(err)
	}
}

export const outBindObject = () => ({ type: oracledb.NUMBER, dir: oracledb.BIND_OUT })
