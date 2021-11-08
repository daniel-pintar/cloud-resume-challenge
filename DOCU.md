# Project Documentation Template

Table of contents:

* [Project overview](#project-overview)
* [Short description](#short-description)
* [Installation guide](#installation-guide)
    * [Steps](#steps)
    * [Special attention](#special-attention)

## Project Overview

| Attribute                             | Value              |
|---------------------------------------|--------------------|
| **Project name**                      |  |
| **Project number**                    |  |
| **Order number / customer reference** |  |
| **Project contract**                  | Statement of Work / Service accounting |

## Short description

*Only five sentences*

## Installation guide

### Steps
All steps are happening on the root level of the file structure.

- Manual installation
  1. `terraform init`
  2. `terraform apply`


- CI/CD pipeline installation
  1. Adjust the terraform variable file in  `.circleci/<BRANCH>/terraform.tfvars`  
     For example: `.circleci/master/terraform.tfvars`
  2. Commit your changes into the master branch
  3. CircleCI pipeline is started by an action on the master branch

### Special attention

*Steps or tasks during the installation which need special attention*

## Roadmap

### Known bottlenecks
###  