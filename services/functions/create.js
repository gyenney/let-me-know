import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        // TODO: Get this from process env vars
        TableName: "Notepads",
        Item: {
            // The attributes of the item to be created.
            notepadId: event.pathParameters.id, // Id of the notepad from the path 
            msgTimestamp: Date.now(),
            userId: 123,
            message: data.content,
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});