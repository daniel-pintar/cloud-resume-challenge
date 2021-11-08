provider "aws" {}

module "cesar-lambda" {
  source  = "app.terraform.io/DI-ON-solutions/cesar-lambda/aws"
  version = "1.2.0"
  providers = {
    aws = aws
  }
  functionName = "FunctionName"
  serviceName = var.serviceName
  path = path.module

  triggeredByEventBridge = true
  eventBusARN = var.eventBusARN

  eventEmitterTopic = ""
  eventEmitterComponent = ""
}