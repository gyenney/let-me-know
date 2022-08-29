import { StorageStack } from "./StorageStack";
import { FrontendStack } from "./FrontendStack";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { App } from "@serverless-stack/resources";
import { RemovalPolicy } from "aws-cdk-lib";

/**
 * @param {App} app
 */
export default function (app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  // Remove all resources when non-prod stages are removed
  if (app.stage !== "prod") {
    app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
  }

  app.stack(StorageStack).stack(ApiStack).stack(FrontendStack).stack(AuthStack);
}
