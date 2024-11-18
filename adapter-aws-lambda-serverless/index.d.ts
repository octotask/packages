import { Octotask } from "octotask";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { ApplicationFunction } from "octotask/lib/types";

export * from "octotask";

export function createLambdaFunction(
  app: ApplicationFunction,
  options: { octotask: Octotask }
): (
  event: APIGatewayProxyEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;
