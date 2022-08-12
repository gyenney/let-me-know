import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function FrontendStack({ stack, app }) {
    const { api } = use(ApiStack);

    // Define our React app.
    const site = new ReactStaticSite(stack, "ReactSite", {
        path: "frontend",
        // Pass in our environment variables.
        // TODO: Add auth config.
        environment: {
            REACT_APP_API_URL: api.url,
            REACT_APP_REGION: app.region,
        },
    });

    // Show the url in the output
    stack.addOutputs({
        SiteUrl: site.url,
    });
}