provider "aws" {}

provider "aws" {
  alias  = "us-east-1"
}

module "cesar-react-app" {
  source      = "app.terraform.io/DI-ON-solutions/cesar-react-app/aws"
  version     = "1.1.0"
  serviceName = var.serviceName

  providers = {
    aws           = aws
    aws.us-east-1 = aws.us-east-1
  }

  useCustomDomain = var.domain == "localhost" ? false : true
  websiteDomain   = var.domain == "localhost" ? "" : var.domain

  wafv2ARN = aws_wafv2_web_acl.reactApp.arn

  reactPath                = "${path.module}/React"

  infrastructureProperties = {
    GRAPHQL_ENDPOINT = var.appSyncAPI.uris["GRAPHQL"]
  }
}