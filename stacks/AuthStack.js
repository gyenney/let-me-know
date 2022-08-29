import * as iam from "aws-cdk-lib/aws-iam";
import { Auth, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }) {
    const { api } = use(ApiStack);

    // Create a Cognito User Pool and Identity Pool
    const auth = new Auth(stack, "Auth", {
        // TODO: We can have user's sign-up in other ways, such as with a username or phone-number.
        // NOTE: This can't be changed after first created.
        login: ["email", "phone"]
    });

    // Specify the resources our authenticated users have access to.
    auth.attachPermissionsForAuthUsers(stack, [
        // Allow access to the API
        api,
    ]);

    // Show the auth resources in the output.
    stack.addOutputs({
        Region: app.region,
        UserPoolId: auth.userPoolId,
        IdentityPoolId: auth.cognitoIdentityPoolId,
        UserPoolClientId: auth.UserPoolClientId,
    });

    return {
        auth,
    };
}