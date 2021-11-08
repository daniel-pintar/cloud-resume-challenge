resource "random_pet" "waf" {}

resource "aws_wafv2_web_acl" "appSyncWAF" {
  name = "AppSync-Managed-WAF-${random_pet.waf.id}"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name = "AWS-AWSManagedRulesBotControlRuleSet"
    priority = 0

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name = "AWSManagedRulesBotControlRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "AWS-AWSManagedRulesBotControlRuleSet-${random_pet.waf.id}"
      sampled_requests_enabled = true
    }
  }

  rule {
    name = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 1

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "AWSManagedRulesKnownBadInputsRuleSet-${random_pet.waf.id}"
      sampled_requests_enabled = true
    }
  }

  rule {
    name = "AWSManagedRulesCommonRuleSet"
    priority = 2

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "AWSManagedRulesCommonRuleSet-${random_pet.waf.id}"
      sampled_requests_enabled = true
    }
  }

  rule {
    name = "AWSManagedRulesAnonymousIpList"
    priority = 3

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name = "AWSManagedRulesAnonymousIpList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "AWSManagedRulesAnonymousIpList-${random_pet.waf.id}"
      sampled_requests_enabled = true
    }
  }

  rule {
    name = "AWSManagedRulesAmazonIpReputationList"
    priority = 4

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        name = "AWSManagedRulesAmazonIpReputationList"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name = "AWSManagedRulesAmazonIpReputationList-${random_pet.waf.id}"
      sampled_requests_enabled = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name = "AppSync-Managed-WAF-${random_pet.waf.id}"
    sampled_requests_enabled = true
  }
}