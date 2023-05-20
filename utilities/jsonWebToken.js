import { createHmac } from "crypto"

const toBase64 = object => Buffer.from(JSON.stringify(object)).toString("base64")
const fromBase64 = b64str => JSON.parse(Buffer.from(b64str, "base64").toString())

function replaceChars(b64str) {
	const replacements = {
		"=": "",
		"+": "-",
		"/": "_"
	}

	return b64str.replace(/[=+/]/g, match => replacements[match])
}

const generateSignature = (header, payload, secret) =>
	replaceChars(
		createHmac("sha256", secret)
			.update(header + "." + payload)
			.digest("base64")
	)

export function generateJWT(payload, secret, expiresIn) {
	const headerJWT = replaceChars(toBase64({ alg: "HS256", typ: "JWT" }))
	const payloadJWT = replaceChars(
		toBase64({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 * expiresIn })
	)
	const signatureJWT = generateSignature(headerJWT, payloadJWT, secret)

	return headerJWT + "." + payloadJWT + "." + signatureJWT
}

export function verifyJWT(token, secret) {
	const [headerJWT, payloadJWT, signatureJWT] = token.split(".")

	if (
		signatureJWT !== generateSignature(headerJWT, payloadJWT, secret) ||
		payloadJWT.exp < Math.floor(Date.now() / 1000)
	)
		return null

	return fromBase64(payloadJWT)
}
