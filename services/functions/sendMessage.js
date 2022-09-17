import handler from "../util/handler";

export const main = handler(async (event) => {
    return { statusCode: 200, body: "Message sent" };
});