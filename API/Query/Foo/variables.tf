variable "serviceName" {
  type = string
  description = "Name of service"
}

variable "eventBusARN" {
  type        = string
  description = "Name of the AWS EventBridge"
  default     = "default"
}