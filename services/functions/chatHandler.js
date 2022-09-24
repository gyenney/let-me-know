import handler from "../util/handler";
import dynamodb from "../util/dynamodb";
import { ApiGatewayManagementApi } from "aws-sdk";

const TableName = process.env.CONNECTIONS_TABLE_NAME;

// TODO: This needs to be passed to the lambda function somehow during the
//       $connect route so that we can specify which notepad a given connection is in.
const NotepadId = "New notepad";


export const main = handler(async (event) => {
    if (event.requestContext) {
        let messageData = "";
        try {
            console.log(event.body);
            if (event.body) {
                const body = JSON.parse(event.body);
                messageData = body.content;
            }
            console.log("messageData:", messageData);
        } catch (e) {
            console.log("chatHandler: Error parsing msg body.");
        }

        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        console.log("Route key:", routeKey);
        const { stage, domainName } = event.requestContext;
        const apiG = new ApiGatewayManagementApi({
            endpoint: `${domainName}/${stage}`,
        });

        const postToConnection = async ({ clientId }) => {
            try {
                // Send the message to the given client.
                console.log(`Sending message to ${clientId}`)
                await apiG.postToConnection({ ConnectionId: clientId, Data: messageData }).promise();
            } catch (e) {
                if (e.statusCode == 410) {
                    // Remove stale connections
                    await dynamodb.delete({
                        TableName,
                        Key: {
                            notepadId: NotepadId,
                            clientId: connectionId,
                        },
                    });
                }
            }
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
            case 'sendmessage':
                if (event.body) {
                    console.log("sending message...");
                    // Scan DB for all connections.
                    const connections = await dynamodb.scan({ TableName, ProjectionExpression: "clientId" });
                    console.log("connections", connections);

                    // Send message to all connected users.
                    await Promise.all(connections.Items.map(postToConnection));
                    return { statusCode: 200, body: "Message sent." };
                }

                return { statusCode: 400, body: "No message present in body" };

                break;
        }
    }


});