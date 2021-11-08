import * as Amplify from "@aws-amplify/core";
import { Auth } from '@aws-amplify/auth';

const config = {
    Auth: {
        region: process.env.AWS_REGION,
        userPoolId: process.env.COGNITO_USER_POOL,
        userPoolWebClientId: process.env.COGNITO_USER_POOL_WEBCLIENT,
        identityPoolId: process.env.COGNITO_IDENTITY_POOL
    },
    "aws_project_region": process.env.AWS_REGION,
    "aws_appsync_graphqlEndpoint": process.env.GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.AWS_REGION,
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS"
};

Amplify.Amplify.configure(config);
Auth.configure(config);