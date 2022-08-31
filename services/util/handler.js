// Handler function which acts as a wrapper around our Lambda functions.
// Runs the lambda function in a try/catch block.
export default function handler(lambda) {
    return async function (event, context) {
        let body, statusCode;

        try {
            body = await lambda(event, context);
            statusCode = 200;
        } catch (e) {
            console.error(e);
            body = { error: e.message };
            statusCode = 500;
        };

        return {
            statusCode,
            // CORS headers (idk what this does)
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(body),
        }
    }
}