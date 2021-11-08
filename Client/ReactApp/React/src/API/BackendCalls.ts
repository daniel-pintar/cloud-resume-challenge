import AWSAppSyncClient, {AUTH_TYPE} from 'aws-appsync';
import gql from 'graphql-tag';
import {Auth} from "@aws-amplify/auth";

class BackendCalls {
    private static client = new AWSAppSyncClient({
        url: process.env.GRAPHQL_ENDPOINT,
        region: process.env.AWS_REGION,
        auth: {
            type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
            jwtToken: async () => ((await Auth.currentSession()).getIdToken().getJwtToken())
        }
    });

    public static async query(query: any, variables?: {}, options?: {}) {
        return await this.client.query({
            query: gql(query),
            variables: variables,
            ...options
        });
    }

    public static async mutation(mutation: any, variables?: {}, options?: {}) {
        return await this.client.mutate({
            mutation: gql(mutation),
            variables: variables,
            ...options
        });
    }

    public static subscribe(subscription: any, callback: (value: any) => void, variables?: {}, options?: {}) {
        this.client.subscribe({
            query: gql(subscription),
            variables: variables
        }).subscribe({
            next: callback
        })
    }
}

export default BackendCalls;