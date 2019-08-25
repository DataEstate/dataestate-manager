# Data Estate Manager
v0.

Project for managing Estates and Assets. This is a React project designed to work as a component to be integrated with PHP/Installation .NET core based applications. This project is a work-in-progress and will be integrated with the __Data Estate Core__ .NET Core app. Data Estate developers should get access tot he active Bitbucket repo. 

## Requirements
* NPM or YARN for installing relevant dependencies. 
* A valid Data Estate API Key. 
This componenet doesn't have its own backend, but instead gets resources from Data Estate API. 


## Installation
This is a private repository. For Data Estate Developers, please see the active private repo in Bitbucket. Otherwise, clone the project and use 
**`npm install`**
to install all relevant dependencies. After installation, you will need to add the environment variables for it to work. Currently only support the API URL and API Key mode. Use *sample.env* as your basis. Environment config's naming convention should be: 
* .env or .env.production - for Production. 
* .env.development for Development build. 

## Testing
This project uses jest for testing. Please ensure that **setupJest.js** is present, so that it'll correctly set the global fetch to fetch-mock during testing. 
