import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { WebSocketStack } from "./WebSocketStack";

export function FrontendStack({ stack, app }) {
    const { api } = use(ApiStack);
    const { auth } = use(AuthStack);
    const { ws } = use(WebSocketStack);

    // Define our React app.
    const site = new ReactStaticSite(stack, "ReactSite", {
        path: "frontend",
        // Pass in our environment variables.
        environment: {
            REACT_APP_API_URL: api.url,
            REACT_APP_REGION: app.region,
            REACT_APP_USER_POOL_ID: auth.userPoolId,
            REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
            REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
            REACT_APP_WEBSOCKET_URL: ws.url,
        },
    });

    // Show the url in the output
    stack.addOutputs({
        SiteUrl: site.url,
    });
}