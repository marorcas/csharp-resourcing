# Job Resourcing Application (C# version)

[![Backend CI](https://github.com/marorcas/csharp-resourcing/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/marorcas/csharp-resourcing/actions/workflows/backend-ci.yml)

[![Frontend CI](https://github.com/marorcas/csharp-resourcing/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/marorcas/csharp-resourcing/actions/workflows/frontend-ci.yml)

## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Features](#features)
- [Design](#design)
- [Build Steps](#build-steps)
- [Usage](#usage)
- [Known Issues](#known-issues)
- [Future Goals](#future-goals)
- [Changelog](#changelog)

## Description

A full-stack application that allows a user to assign employees to jobs. Backend built with C# & .NET, frontend built with TypeScript & React.

## Demo

- Include hosted link
- Include images of app

## Features

Key features of the project.

## Design

- Design goals
- Figma screenshots
- Why did I implement it the way I did?

## Build Steps

- How to build/run project
- Use proper code snippets if there are commands to run

## Usage

Instructions and examples on how to use the project.

## Known Issues

- Remaining bugs

## Future Goals

Planned future features and improvements:

## Changelog

### 4/11/2024

- Created basic setup for backend
- Created MySQL database 
- Created data models for job and temp 
- Created many to many relationship between job and temp
- Set up database on backend
- Added migrations to keep track of database model changes
- Created a DTO for creating a job
- Created a DTO for updating a job
- Created an interface for job repository
- Created a job repository with functions to create a job, get all jobs, get job by id, get jobs by assigned status, update job by id and delete job by id
- Edited repository functions to remove any business logic and focus on data access and persistence
- Removed get jobs by assigned status function from repository and moved it to job service instead
- Created interface for job service
- Created job service with functions to create a job, get all jobs, get jobs by id, get jobs by assigned status, update job by id and delete job by id
- Created job controller with functions to create a job, get all jobs, get jobs by id, get jobs by assigned status, update job by id and delete job by id
- Combined get all and get by assgined functions to a single function in job controller
- Created a DTO for creating a temp
- Created a DTO for updating a temp
- Created an interface for temp repository
- Created a temp repository with functions to create a temp, get all temps, get a temp by id, update a temp by id and delete a temp by id
- Created interface for temp service
- Created temp service with functions to create a temp, get all temps, get a temp by id, update a temp by id and delete a temp by id
- Created temp controller with functions to create a temp, get all temps, get a temp by id, update a temp by id and delete a temp by id
- Created basic setup for frontend
- Added basic styling for frontend

### 5/11/2024

- Created jobs context provider
- Created temps context provider 
- Created function to fetch all jobs for frontend
- Displayed jobs from backend on frontend
- Created function to fetch all temps for frontend
- Displayed temps from backend on frontend
- Created date time converter on the backend to render dates in "dd-mm-yyyy" format on frontend
- Created basic form to create a job

### 6/11/2024

- Implemented react datepicker for start date and end date fields of job creation form
- Created form to create a temp

### 7/11/2024

- Created a context for selected link for the side bar
- Created filter feature for jobs
- Created filter feature for temps
- Created form to edit job
- Created form to edit temp
- Implemented many to many relationship functionality in backend

### 8/11/2024

- Created a database seeder to generate fake data using Bogus
- Created two chart components to display insights of data on the frontend

### 11/11/2024

- Created a context for form submission status

### 13/11/2024

- Added tick animation for successful submission of job forms
- Added message to tick animation
- Added tick animation for successful submission of temp forms
- Added search bar feature to jobs and people pages
- Added section for jobs due today on the dashboard page
- Set up xunit testing suite
- Created github workflows folder

### 19/11/2024

- Set up frontend testing suite
- Created separate ci pipelines for frontend and backend

### 20/11/2024

- Created a test for job creation
- Created tests for get all jobs
- Created tests for get job by id
- Created tests for get temps assigned to job
- Created tests for update job by id
- Created tests for delete job by id
- Created a test for temp creation
- Created tests for get all temps
- Created tests for get temp by id
- Created tests for update temp by id
- Created tests for delete temp by id

### 4/12/2024

- Created Dockerfiles for backend and frontend
- Created Docker compose file

### 5/12/2024

- Created database on AWS RDS
- Connected backend to AWS database
- Updated fake data seeder to only populate database if empty

### 7/12/2024

- Updated fake data seeder to delete all data and then create new data each time app is launched

### 8/12/2024

- Created file for environment variables
- Added workflow badges for CI pipelines