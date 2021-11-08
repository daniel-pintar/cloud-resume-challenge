![](https://blob-di-on-solutions.s3.eu-central-1.amazonaws.com/internal/images/sphere/CESAR_Banner.jpg)

# CESAR for AWS Hyperscaler

CESAR is an abbreviation for Cloud Event Driven Software Architecture and provides a common layer between business logic
and cloud providers. This architecture takes care of a standardized layer with modules so the developer can focus on the
real thing, namely the development of business logic.

---

Table of contents:

- [CESAR for AWS Hyperscaler](#cesar-for-aws-hyperscaler)
    - [What is Infastructure-as-Code?](#what-is-infastructure-as-code)
    - [HashiCorp Terraform](#hashicorp-terraform)
    - [CESAR Structure](#cesar-structure)
    - [Why do we encapsulate the Terraform files in a separate repository?](#why-do-we-encapsulate-the-terraform-files-in-a-separate-repository)
    - [Schema](#schema)
    - [File structure and definition guideline](#file-structure-and-definition-guideline)
    - [CESAR Modules](#cesar-modules)
        - [CESAR AWS Lambda](#cesar-aws-lambda)
        - [CESAR AWS React App](#cesar-aws-react-app)
  - [What is BFF?](#what-is-bff)
  - [So what is the development workflow?](#so-what-is-the-development-workflow)
- [Developer Guide](#developer-guide)
  - [Preliminaries](#preliminaries)
  - [Architecture](#architecture)
    - [Modules](#modules)
    - [EventBridge](#eventbridge)
    - [LamDION](#lamdion)
    - [AppSync I](#appsync-i)
    - [Frontend client](#frontend-client)
    - [AppSync II](#appsync-ii)
  - [CI/CD Pipeline](#cicd-pipeline)
    - [1. Terraform Workspace](#1-terraform-workspace)
    - [2. Terraform Execution Mode](#2-terraform-execution-mode)
    - [3. Terraform Team](#3-terraform-team)
    - [4. External infastructure properties](#4-external-infastructure-properties)
    - [4. AWS Credentials](#4-aws-credentials)
    - [5. CircleCI](#5-circleci)
 
 ---

### What is Infastructure-as-Code?

Infrastructure as code (IaC) is the process of managing and provisioning software or compute resources in data centers
through machine-readable definition files, rather than physical hardware configuration or interactive configuration
tools (for example in comparison to how much time it takes to install a classical MySQL/MariaDB server). The IT
infrastructure managed by this process comprises both physical equipment, such as bare-metal servers, as well as virtual
machines, and associated configuration resources. You may use a version control system for the definitions (at
DI-ON.solutions we use GitHub via Terraform HCL files). You can either use scripts or declarative definitions, rather
than manual processes, but the term most often refers to declarative approaches.

### HashiCorp Terraform

Terraform is an open-source infrastructure as code software tool created by HashiCorp. Users define and provision data
center infrastructure using a declarative configuration language known as HashiCorp Configuration Language (HCL). At
DI-ON.solutions we are using HashiCorp Terraform Cloud. The cloud plan synchronizes the current state of the
infrastructure deployment and knows always which changes are made which means every developer can deploy independently
and thus makes the development in teams easier.

The large benefit of Terraform is that they are supporting a number of cloud infrastructure providers such as Amazon Web
Services, Microsoft Azure, IBM Cloud, Google Cloud Platform, DigitalOcean, Oracle Cloud Infrastructure, VMware vSphere,
and OpenStack. Thus, at DI-ON.solutions we want to run our applications in the best-case as a Multi-Platform Cloud
Application (combining the best services from different cloud providers).

### CESAR Structure

This architecture is split into different modules. The following CESAR Modules exist at the moment:

- Serverless / Function-as-a-Service Modules:
    - CESAR AWS Lambda  
      [https://github.com/DI-ON-solutions/CESAR-AWS-Lambda](https://github.com/DI-ON-solutions/CESAR-AWS-Lambda)


- React App
    - CESAR AWS React App
      [https://github.com/DI-ON-solutions/CESAR-AWS-ReactApp](https://github.com/DI-ON-solutions/CESAR-AWS-ReactApp)

### Why do we encapsulate the Terraform files in a separate repository?

At first you may think why is all this additional overhead necessary? Isn't it better to put all the files into the
CESAR module? But the advantage is obvious. After the git repository integration you can't update the files anymore
because git isn't made for keeping track of update dependencies. Thus we must develope a better solution with which you
can keep your terraform module up to date. That's the reason why we built a dedicated terraform module.

### Schema

![](https://blob-di-on-solutions.s3.eu-central-1.amazonaws.com/internal/images/CESAR_Stack.png)

Following modules are planned:

- CESAR AWS React Native
- CESAR Azure
- CESAR Azure Function
- CESAR Azure React App
- CESAR Azure React Native

### File structure and definition guideline

```
CESAR Project
│ main.tf
│ outputs.tf
│ variables.tf
| package.json
└───Event
    └───Handler
        └───CESAR AWS Lambda
    └───Presenter
        └───CESAR AWS Lambda
└───Client
    └───CESAR AWS React App
    └───CESAR AWS React Native App
└───API
    └───Query
        └───CESAR AWS Lambda
    └───Mutation
        └───CESAR AWS Lambda
```

The main concept of the CESAR file structure is that evey layer can operate on its own. This is important to decouple
the development and break the entire project into small teams (1 - max. 2 persons for a single component). Further more
every participant can develop, test and deploy his own component.

1. The top level layer only operates as the **glue** of the entire project. At this hierarchy we don't implement big
   infastructure / business logics.  
   **Only combining Event, Client and API layer.**
2. Link AWS AppSync with its resolver inside the API module.
3. AWS EventBridge is created in the root folder.

## CESAR Modules

As described above CESAR is split into small modules. Every module provides a special component. Some components can
exist multiple times for different cloud providers.

### CESAR AWS Lambda

![](https://blob-di-on-solutions.s3.eu-central-1.amazonaws.com/internal/images/sphere/CESAR_AWS_Lambda_Banner.jpg)

You can get it from:
[https://github.com/DI-ON-solutions/CESAR-AWS-Lambda](https://github.com/DI-ON-solutions/CESAR-AWS-Lambda)

This module delivers at bottom AWS Lambda for your CESAR application.

> **!Important!**  
> Currently CESAR AWS Lambda use the Node.JS 12.x runtime.
> At DI-ON.solutions we use JavaScript for the frontend and backend systems.
>
> **Why?**  
> The advantage of using one language for both worlds is obvious: Smaller teams can deliver faster, because there is
> no need for an intensive "mind switch", the same language can be used for the frontend and backend.
>
> Further more the new "serverless" approach turned everything upside down. In the early stages of software development an application booted once and was kept alive.
> Thus, applications ran sometimes for many months. This paradigm hasn't been mapped to the serverless world. Inside this new world an application lives only for the time it executes. Before and after the execution the application is dead.

Benefits of the Module:

- :white_check_mark: Predefined file structure
- :white_check_mark: Pre-configured terraform code and linked with terraform-aws-cesar-lambda (internal terraform
  module)
- :white_check_mark: Fast subscription on a CESAR event (Interplay of terraform and LamDION (own node module - more
  information below))
- :white_check_mark: Required node modules are already configured

> **Slogan**  
> Clone and Play

#### Terraform:

We created a custom Terraform module terraform-aws-cesar-lambda which defines the necessary ressources.

- AWS Lambda
- AWS Lambda Layer
- Archive the index.js & index.js.map file and upload it
- Archive the sharedLayer.js & sharedLayer.js.map file and also upload it
- Create an AWS Lambda trigger (if you want) to an CESAR event on AWS EventBridge

### Why has every Lambda function an entire stack?

Every CESAR AWS Lambda module has its own complete stack to save the agile and dynamic workflow.

Benefits of this approach:

- :white_check_mark: Smaller teams & single responsibility
- :white_check_mark: Break down the large software project into micro components / microservices
- :white_check_mark: Self-sufficient component can develop, test and deploy
- :white_check_mark: Required node modules are already configured
- :white_check_mark: Shared layer only contains librarys which are necessary for AWS Lambda (remove unused overhead)  
  In the early times of DI-ON.solutions we provided a shared layer which contained all dependencies, also the
  dependencies which aren't used by the current lambda function itself. Thus, the function slowed down.

> **Important**  
> Code sharing is an anti-pattern. It indirectly creates complex dependencies.

### CESAR AWS React App

![](https://blob-di-on-solutions.s3.eu-central-1.amazonaws.com/internal/images/sphere/CESAR_AWS_React_App_Banner.jpg)

You can get it from:
[https://github.com/DI-ON-solutions/CESAR-AWS-ReactApp](https://github.com/DI-ON-solutions/CESAR-AWS-ReactApp)

This module gives your CESAR application all components to run a React application and implements the BFF (Backend for
frontend) pattern.

### What is BFF?

With the advent and success of the web, the de facto way of delivering user interfaces has shifted from thick-client
applications to interfaces delivered via the web, a trend that has also enabled the growth of SAAS-based solutions in
general. The benefits of delivering a user interface over the web were huge - primarily as the cost of releasing new
functionality was significantly reduced as the cost of client-side installs was (in most cases) eliminated altogether.

This simpler world didn't last long though, as the age of the mobile followed shortly afterwards. Now we had a problem.
We had server-side functionality which we wanted to expose both via our desktop web UI, and via one or more mobile UIs.
With a system that had initially been developed with a desktop-web UI in mind, we often faced a problem in accommodating
these new types of user interface, often as we already had a tight coupling between the desktop web UI and our backed
services.

The BFF (Backend for frontend) is tightly coupled to a specific user experience, and will typically be maintained by the
same team as the user interface, thereby making it easier to define and adapt the API as the UI requires, while also
simplifying the process of lining up the release of both client and server components. This is the reason why we
integrated the AWS AppSync service into the React module, because every React app has now its own interface into the
backend (but only partially).

The BFF is tightly focused on a single UI, and just that UI. That allows it to be focused, and will therefore be
smaller.

### So what is the development workflow?

1. At the beginning the frontend and backend team finds together to discuss how the interface between the backend and
   frontend should look like.
2. The GraqhQL Schema will be implemented.
3. Every section (frontend and backend team) can now develop separately from each other:

- The frontend team develops the UI and can test the interaction with mocking the backend calls.
- The backend team develops its entire backend (event handler and presentation model) and connects its services with the
  AWS AppSync service.

Benefits of the Module:

- :white_check_mark: Predefined file structure
- :white_check_mark: Pre-configured terraform code and linked with terraform-aws-cesar-react-app (internal terraform
  module)
- :white_check_mark: Pre-configured App Sync
- :white_check_mark: Required node modules are already configured

#### Terraform:

We created a custom Terraform module terraform-aws-cesar-react-app which defines the necessary ressources and steps:

- AWS S3 Bucket (static website configuration)
- CloudFront
- AWS AppSync (skeleton)
- Write .env file
- Execute Webpack (This is not included in the terraform files anymore - you need to start webpack by yourself and rerun terraform again)
- Upload the static files to AWS S3 Bucket

# Developer Guide

## Preliminaries

- Add `aws_credentials` in the root directory and copy the credentials from the AWS single sign on screen by
  choosing `Command line or programmatic access` and copy Option 2. You need to redo this step at least once a day.

In the root `main.tf` file, overwrite this section with appropriate values:

```hcl
provider "aws" {
  shared_credentials_file = "./aws_credentials"
  profile = "XXXXXXXXXXXX_DION_Internal_Development"
  region = "eu-west-1"
}
```

- Make sure you have an `.npmrc` file, in order to let npm access the npm packages stored on the DION GitHub package
  registry.
  Follow [this guide](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to
  obtain a GitHub access token. It's best practice to store it in `~/.npmrc`, with the following contents:

```
@di-on-solutions:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=TOKEN
```

- The template might not always use the latest versions of all terraform modules, so make sure to review the `main.tf`
  file in each subdirectory and choose the latest version if you start a new project. You can check the modules source
  on GitHub to find out what the latest version is.(package.json/dependencies/@di-on-solutions/lambdion &&
  main.tf/cesar-lambda/version).
  [https://github.com/DI-ON-solutions/LamDION/packages/536285](https://github.com/DI-ON-solutions/LamDION/packages/536285)
  
- Before you can start with the development or with the building you must install all required dependencies in the project root folder and all its subfolders. This can be
done manually or with the install script, which can be run with `npm run install` (from the project root folder).

- The same goes for building - do it manually in every subfolder or just run: `npm run build`.

## Architecture

### Modules

CESAR is split into various modules. From the point of view of Terraform, we need to instantiate the modules we need in
the root directory in the `main.tf` file. By default you already see a module there:

```hcl
module "Foo" {
  providers = {
    aws = aws
  }

  source       = "./Event/Handler/Foo"
  serviceName  = local.serviceName
  // other variables...
}
```

With that statement, we make use of the module and it will be part of our infrastructure when we run `terraform apply`. We
specify the source as the directory of the module, in which its terraform files reside. In particular,
this `./Event/Handler/Foo` directory contains a `variables.tf`, which contain the variables we need to set in order to
instantiate the module. For instance, in our `main.tf` in the root directory, we instantiate the `Foo` module.

Now, if you want to also add a mutation resolver for AppSync, you need to instantiate a module in the API module, 
along these lines:

```hcl
module "DemoMutation" {
  source = "./Mutation/DemoMutation"
  // other variables...
}
```

### EventBridge

By default, the template defines an EventBridge in its `main.tf` file
with `resource "aws_cloudwatch_event_bus" "messenger"`. The modules are then connected with each other by passing
the `arn` of the event bus as a variable:

```hcl

module "EventHandler" {
  eventBusARN = aws_cloudwatch_event_bus.messenger.arn
  // other variables...
}

module "MutationResolver" {
  eventBusARN = aws_cloudwatch_event_bus.messenger.arn
  // other variables...
}
```

Note that `triggeredByEventBridge = true or false` value has to be according to your lambda functionality.

### LamDION

[LamDION](https://github.com/DI-ON-solutions/LamDION) abstracts common functionality that we need in an event driven
architecture.

We can use LamDION to write a lambda function, e.g. a mutation resolver lambda that writes to EventBridge. We can then also use it to
write the handler lambda that is invoked by EventBridge.

In the mutation resolver we use a `LamDION.Bootstrap` and for the handler we use a `LamDION.AWSEventBridgeBoostrap`.
Refer to the [event section](https://github.com/DI-ON-solutions/LamDION#event) in the Readme for code examples.

Please note that each LamDION project defines its own `EventPayload.ts`. Even though the resolver and the handler
communicate using this common interface, they do not share this file. That means both source directories need a copy of
this file that needs to be in sync, in order to communicate successfully.

### AppSync I

- Update the `appsync.graphql` or create a new schema file in your `API` directory and create your schema in there, ignoring all
  errors from your IDE. These errors are shown because AWS extended the capabilities of GraphQL.
  See [this guide](https://docs.aws.amazon.com/appsync/latest/devguide/designing-your-schema.html) for more.

- The AppSync setup currently lives alongside the `API` in its `main.tf` file. You can create a
  separate `.tf` file for every AWS AppSync and add the resolver setup in there (simply for more separation of concerns).

- You will need a few IAM permissions for the resolver. You can check out
  the [terraform demo project](https://github.com/DI-ON-solutions/terraform-demo-project) to see the permission setup
  for a simple resolver.

First you need to instantiate the mutation or query itself:
```hcl
module "DemoMutation" {
  source = "./Mutation/DemoMutation"
  // other variables...
}
``` 

The important resource you need is the data source:

```hcl
resource "aws_appsync_datasource" "demo_mutation_data_source" {
  api_id = aws_appsync_graphql_api.appSyncAPI.id
  name = "cesar_appsync_demo_mutation"
  type = "AWS_LAMBDA"
  service_role_arn = aws_iam_role.demoMutationRole.arn
  lambda_config {
    function_arn = module.DemoMutation.lambdaArn
  }
}
```

Since the rest of the infrastructure lives outside of the module, we need to import those information. To that end, we
declare it as a variable in `API/variables.tf`:

```hcl
variable "dynamoDBARN" {
  type = string
}
```

It is really necessary to output the entire AppSync resource in the `outputs.tf` file.
```hcl
output "appSyncAPI" {
  value = aws_appsync_graphql_api.appSyncAPI
}
```


### Frontend client
Our frontend clients live in the `Client` folder. To connect with an AppSync which is declared in the `API` folder
we need to link them:

In the root module:
```hcl
module "API" {
  source = "./API"
  serviceName = local.serviceName
}

module "ReactApp" {
  providers = {
    aws = aws
    aws.us-east-1 = aws.us-east-1
  }

  source = "./Client/ReactApp"
  serviceName = local.serviceName
  appSyncAPI = module.API.appSyncAPI
  // other variables...
}
```

In the React submodule we use the AWS AppSync resource information to get the endpoint:
````hcl
module "cesar-react-app" {
  source      = "app.terraform.io/DI-ON-solutions/cesar-react-app/aws"
  serviceName = var.serviceName
  providers = {
    aws           = aws
    aws.us-east-1 = aws.us-east-1
  }

  infrastructureProperties = {
    GRAPHQL_ENDPOINT = var.appSyncAPI.uris["GRAPHQL"]
  }
  // other variables...
}
````

Now we've successfully connected the AppSync with our React, even though they live in two separate modules.

### AppSync II

This part is about API (GRAPHQL).

- Once you have your AppSync configured and you succesfully deployed it, you have to go to your AppSync
  module in your `Management Console`.

- Export your schema in your `React folder` and follow the steps regarding amplify from the homepage of the module. We only need `amplify codegen`.

- Create a `client` authorization where you want to make the
  requests. https://docs.amplify.aws/lib/graphqlapi/authz/q/platform/js. The client is already configured and all dependencies are also still available. You can find it under the folder `Client/ReactApp/React/src/API`

- Fetch data using graphql-tag. https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js

```ts
import gql from "graphql-tag";

await client.mutate({mutation: gql(deleteTask), variables: {name: deleteTodo}});
await client.query({query: gql(getAllTasks), variables: {}});
```

**.SCSS**

Use the following command `./node_modules/.bin/tsm "src/**/*.scss" -w` in order to have your `.scss.d.ts` files
automatically created. Without them you cannot use any style.

```ts
import * as stylesheet from "./style.scss";

className = {stylesheet.input}
```

## CI/CD Pipeline

To deliver our application on production stage we are using the plattform CircleCI to run our tests and the deployment
itself. A final CircleCI deployment setup is in the CESAR-AWS template included. To finish the setup for CI/CD pipeline
you must follow these steps:

### 1. Terraform Workspace

- New workspace under the terraform company ``DI-ON-solutions``

- Choose the ``CLI-driven workflow``

- Name the Workspace with following format **`ProjectName`-`Branch`**. If you not follow the structure CircleCI will
  fail!!

### 2. Terraform Execution Mode

Change the execution mode to `Local`. Your plans and applies occur on machines you control (on CircleCI). Terraform
Cloud is only used to store and synchronize state.

- Go to the workspace

- Select `Settings` > `General` and change the execution mode to `Local`

### 3. Terraform Team

To give CircleCI a restrictive access to only this workspace we need to create a Terraform Team. The name for the team
can be choosen by your self (we recommend to use the same name as the workspace).

- Go in the navigation bar to the page `Settings`

- Create team under `Teams` > `Create team`

- Afterwards check that the visibility is set to `Secret`

- Click the button `Create a team token` and safe it for using it later in your CircleCI setup

- Go back to your workspace and click `Settings` > `Team Access` and add the current created team (Apply `Write`
  permission to team)
  Change the execution mode to `Local`. Your plans and applies occur on machines you control (on CircleCI). Terraform
  Cloud is only used to store and synchronize state.

### 4. External infastructure properties

Sometime sou are using external services (for example: Stripe). In this case you must include those information in your
architecture. This will be done by your root `variables.tf` file. In this file you configure for example the API key for
third-party services. But in most cases you would have different values in your development, evaluation or production
stages. That's the reason why you must add/modify a terraform `.tfvars` file for the different branches.

In the basic configuration of this CESAR template your CircleCI pipeline will run only on the `master` branch. In this
case you must add under `.circleci` > `master` > `terraform.tfvars` your values for the production
stage [More information on the offical page of Terraform](https://www.terraform.io/docs/language/values/variables.html#variable-definitions-tfvars-files)
.

**Please keep in mind to create a folder with the branch name and a terraform.tfvars file for every branch which runs on
CircleCI. If not, your pipeline will fail**

### 4. AWS Credentials

To give CircleCI the permissions to apply the infastructure to your AWS account, you must create an IAM user on the AWS
Account.

- Login in to your AWS production account

- Go to the IAM service

- Click `Access management` > `Users` > `Add user`

- Username: `CircleCI`

- Access type: `Programmatic access`

- Select: `Attach existing policies directly` and select permission `AdministratorAccess`

- Afterwards please safe the AWS credentials for the CircleCI environment variables

### 5. CircleCI

- Go to our CircleCI DI-ON.solutions organization and add your project

- Click `Project Settings` > `Environment Variables`

- Add following variables:

| Environment variable        | Description         |
| --------------------------- |---------------------|
| AWS_ACCESS_KEY_ID           | AWS IAM User credentials |
| AWS_SECRET_ACCESS_KEY       | AWS IAM User credentials      |
| NPM_TOKEN                   | NPM Access Token to download LamDION from GitHub |
| TERRAFORM_TOKEN             | Terraform Team Token      |
| TERRAFORM_WORKSPACE_PREFIX  | Prefix of your Terraform Workspace |

How you generate an NPM token can you read in this file under Architecture > LamDION
