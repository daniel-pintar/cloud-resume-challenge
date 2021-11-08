terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "DI-ON-solutions"

    workspaces {
      name = ""
    }
  }
}

provider "aws" {
  shared_credentials_file = "./aws_credentials"
  profile = "1111111111111111_DION_App_Deployment"
  region = "eu-west-1"
}

provider "aws" {
  shared_credentials_file = "./aws_credentials"
  profile = "1111111111111111_DION_App_Deployment"
  alias = "us-east-1"
  region = "us-east-1"
}

resource "random_integer" "eventBusNameNumber" {
  max = 99999999999999999
  min = 1000000000000
}

resource "aws_cloudwatch_event_bus" "messenger" {
  name = "event-bus-${random_integer.eventBusNameNumber.id}"
}

module "cesar-eventstore" {
  providers = {
    aws = aws
  }

  source       = "app.terraform.io/DI-ON-solutions/cesar-eventstore/aws"
  version      = "2.0.5"
  eventBusARN = aws_cloudwatch_event_bus.messenger.arn
  serviceName  = local.serviceName
}

module "API" {
  providers = {
    aws = aws
  }

  source = "./API"
  serviceName = local.serviceName
  eventBusARN = aws_cloudwatch_event_bus.messenger.arn
}

module "ReactApp" {
  providers = {
    aws = aws
    aws.us-east-1 = aws.us-east-1
  }

  source = "./Client/ReactApp"
  serviceName = local.serviceName
  appSyncAPI = module.API.appSyncAPI
}

module "Foo" {
  providers = {
    aws = aws
  }

  source       = "./Event/Handler/Foo"
  serviceName  = local.serviceName
  eventBusARN = aws_cloudwatch_event_bus.messenger.arn
}