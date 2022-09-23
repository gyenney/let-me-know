import handler from "../util/handler";
import dynamodb from "../util/dynamodb";
import { ApiGatewayManagementApi } from "aws-sdk";

const TableName = process.env.CONNECTIONS_TABLE_NAME;

// TODO: This needs to be passed to the lambda function somehow during the
//       $connect route so that we can specify which notepad a given connection is in.
const NotepadId = "New notepad";


export const main = handler(async (event) => {
    if (event.requestContext) {
        let body = {};
        try {
            if (event.body) {
                body = JSON.parse(event.body);
            }
        } catch (e) {
            //
        }

        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        const { stage, domainName } = event.requestContext;
        const apiG = new ApiGatewayManagementApi({
            endpoint: `${domainName}/${stage}`,
        });

        // Send a message to a given WebSocket connection.
        const sendToOne = async (id, body) => {
            try {
                await apiG.postToConnection({
                    'ConnectionId': id,
                    'Data': Buffer.from(JSON.stringify(body))
                }).promise();
            } catch (e) {
                console.log(e);
            }
        };

        // Send a message to an array of WebSocket connections.
        const sendToAll = async (ids, body) => {
            const all = ids.map(i => sendToOne(i, body));
            return Promise.all(all);
        };

        // Add a connection in a notepad to the 'connections' db.
        const connect = async (notepadId, connectionId) => {
            const params = {
                TableName: TableName,
                Item: {
                    notepadId: NotepadId,
                    clientId: connectionId,
                },
            };

            await dynamodb.put(params);

            return { statusCode: 200, body: "Connected" };
        }

        // Remove a connection. 
        const disconnect = async (notepadId, connectionId) => {
            const params = {
                TableName: TableName,
                Key: {
                    notepadId: NotepadId,
                    clientId: connectionId,
                },
            };

            await dynamodb.delete(params);

            return { statusCode: 200, body: "Disconnected" };
        }

        switch (routeKey) {
            case '$connect':
                return connect(NotepadId, connectionId);
                break;
            case '$disconnect':
                return disconnect(NotepadId, connectionId);
                break;
            case 'sendMessage':
                // Send message to all connected users.

                // Scan DB for all connections.
                const connections = await dynamodb.scan({ TableName, ProjectionExpression: "clientId" });


                break;
        }
    }


});