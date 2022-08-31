import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.NOTEPAD_TABLE_NAME,
        Item: {
            notepadId: data.notepadId,
            mainIdentifier: data.notepadName,
            createdAt: Date.now(),
        },
    };

    await dynamoDb.put(params);

    return params.Item;

});