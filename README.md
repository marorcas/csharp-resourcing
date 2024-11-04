# Job Resourcing Application (C# version)

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