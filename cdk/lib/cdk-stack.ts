import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpUrlIntegration, HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

import * as lambda from 'aws-cdk-lib/aws-lambda';


export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const api = new apigateway.HttpApi(this, 'CoolBooksApi');

    const fn = new lambda.Function(this, 'HandlerEntrypoint', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset("/home/arturob/Documentos/Pita/coolbooks/lambda/"),
    });


    const bookStoreDefaultIntegration = new HttpLambdaIntegration('BooksIntegration', fn);

    api.addRoutes(
      {
        path: '/books',
        methods: [apigateway.HttpMethod.GET],
        integration: new HttpUrlIntegration('BooksIntegration', 'https://example.com')
      },

    )

    api.addRoutes(
      {
        path: '/books2',
        methods: [apigateway.HttpMethod.GET],
        integration: bookStoreDefaultIntegration
      }

    )



    // const dataStack = new cdk.Stack(this, 'DataStack', {});

    // const appStack = new cdk.Stack(this, 'AppStack', {});
  }
}
