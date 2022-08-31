import handler from "../util/handler";
import dynamodb from "../util/dynamodb";

export const main = handler(async (event) => {
    const params = {
        TableName: process.env.NOTEPAD_TABLE_NAME,
        Key: {
            notepadId: event.pathParameters.id,
        },
    }

    const result = await dynamodb.get(params);
    if (!result.Item) {
        throw new Error("Item not found.");
    }

    // Return the retrived item.
    return result.Item;
});