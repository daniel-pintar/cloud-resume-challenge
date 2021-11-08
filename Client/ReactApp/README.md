![](https://blob-di-on-solutions.s3.eu-central-1.amazonaws.com/internal/images/sphere/CESAR_AWS_React_App_Banner.jpg)

# CESAR React App hosted on AWS
This module delivers for your CESAR application all components to run a React application and implements the BFF (Backend for frontend) pattern.

The terraform module workflow:
1. Create infrastructure
2. Write .env.automated file (based on your `infrastructureProperties`)
2. Run npm install in React directory
3. Run npm build in React directory
4. Upload static files to AWS S3 Bucket

## How to use?
This module can be used in two ways:
1. **Random AWS CloudFront Domain (xxxx.cloudfront.net)**
   ```terraform
    module "cesar-react-app" {
        source  = "app.terraform.io/DI-ON-solutions/cesar-react-app/aws"
        version = "1.0.4"
    
        providers = {
          aws = aws
          aws.us-east-1 = aws.us-east-1
        }
        
        useCustomDomain = false
        reactPath = "${path.module}/React"
    }
    ```
    Set **useCustomDomain = false** and AWS CloudFront will issue a domain for you. Of course AWS provides you a default SSL certificate.


2. **Bring-your-own-Domain to AWS CloudFront**  
   To use this feature you must create in the same account an AWS Route53 domain zone  
   [https://aws.amazon.com/de/route53/](https://aws.amazon.com/de/route53/)

   ```terraform
   module "cesar-react-app" {
        source  = "app.terraform.io/DI-ON-solutions/cesar-react-app/aws"
        version = "1.0.4"
      
      providers = {
        aws = aws
        aws.us-east-1 = aws.us-east-1
      }
      
      useCustomDomain = true
      websiteDomain = "test.di-on.solutions"
      reactPath = "${path.module}/React"
   }
   ```
   If you set **useCustomDomain = true** you must set the variable **websiteDomain**.


For variable description please review the terraform module page.  
[https://app.terraform.io/app/DI-ON-solutions/modules/show/DI-ON-solutions/cesar-react-app/aws/1.0.1](https://app.terraform.io/app/DI-ON-solutions/modules/show/DI-ON-solutions/cesar-react-app/aws/1.0.1)

## Overwrite AWS providers in the module
```terraform
   provider "aws" {
      region     = "eu-west-1"
      access_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      secret_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   }
   
   provider "aws" {
      region     = "us-east-1"
      alias      = "us-east-1"
      access_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      secret_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   }
   
   providers = {
      aws = aws
      aws.us-east-1 = aws.us-east-1
   }
```
