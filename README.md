# accounts

Simple account management. 

Handles basic CRUD operations through REST API. 
Stores data in firebase.

Built with nodejs/express


# Getting started

You need a firebase configuration to run server functionality. So please add
a firebase configuration json file (firebase.config.json) needs to be in root of project. 

to start server locally there are a prepared npm command, 

- npm run server

to start only client use:

- npm run client

you can also run both at the same time with the help of concurrently

- npm run dev

# deploy through now.sh

it should be prepared to handle deployment with now.sh
Before running now.sh, please run a 'npm run build' since express is set up to use static resources in /dist


# future improvements

More robust validation of input and output.
Look into a more performant rest api, for example fastify
Move authentication to users in db (firebase)
Possibility to create users with password (and some kind of role)

## Todo

prettier 

