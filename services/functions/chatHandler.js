import handler from "../util/handler";

export const main = handler(async (event) => {
    if (event.requestContext) {
        const connectionId = event.requestContext.connectionId;
        const routeKey = event.requestContext.routeKey;
        let body = {};
        try {
            if (event.body) {
                body = JSON.parse(event.body);
            }
        } catch (e) {
            //
        }

        switch (routeKey) {
            case '$connect':
                break;
            case '$disconnect':
                break;
            case 'sendMessage':
                // Send message to all connected users.
                break;
        }
    }


});