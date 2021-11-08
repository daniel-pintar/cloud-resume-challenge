provider "aws" {}

resource "random_pet" "appSyncName" {}

resource "aws_appsync_graphql_api" "appSyncAPI" {
  authentication_type = "API_KEY"
  name                = "${var.serviceName}-${random_pet.appSyncName.id}-API"

  schema = file("${path.module}/appsync.graphql")
}

resource "aws_wafv2_web_acl_association" "appSyncWAFAssociation" {
  resource_arn = aws_appsync_graphql_api.appSyncAPI.arn
  web_acl_arn = aws_wafv2_web_acl.appSyncWAF.arn
}

module "Mutation-Foo" {
  providers = {
    aws = aws
  }

  source       = "./Mutation/Foo"
  serviceName  = var.serviceName
  eventBusARN = var.eventBusARN
}

module "Query-Foo" {
  providers = {
    aws = aws
  }

  source       = "./Query/Foo"
  serviceName  = var.serviceName
  eventBusARN = var.eventBusARN
}