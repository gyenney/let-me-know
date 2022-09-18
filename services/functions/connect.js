import handler from "../util/handler";
import dynamodb from "../util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.CONNECTIONS_TABLE_NAME,
        Item: {
            notepadId: ,
            clientId: event.requestContext.connectionId,
        }
    }

    await dynamodb.put(params);

    return { statusCode: 200, body: "Connected" };
});