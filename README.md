# Node JS Cluster
6th homework assignment for [Pirple's NodeJS master class](https://pirple.thinkific.com/courses/the-nodejs-master-class).
The project includes a simple RESTful API greeting user with 'Hello' in different languages. It utilizes Cluster module for performance.

## Features
- [x] The code run across all the cores of machine it is run on

## Screencast

[See the tests in action and watch the code being explained line by line](https://www.youtube.com/watch?v=4P79amJ9D1o)

<a href="http://www.youtube.com/watch?feature=player_embedded&v=oNE8IBRIOTE
" target="_blank"><img src="http://img.youtube.com/vi/oNE8IBRIOTE/0.jpg" 
alt="Pirple Node JS Master Class Homework Assignment #6" width="300" height="200" border="10" /></a>

## Manual

### Set up
0. Download the project.
1. Open the command prompt (for Windows, click Start icon and type in `cmd`) and go to the project directory.eg. :

`cd C:/NodeJSCluster`

2. Run the test runner:

`node index.js`

Optionally, one can set DEBUG variable to print out messages in the console. Both version will result in the same output for this app. (for Windows):

`set DEBUG=* & node index.js // Print out debug messages`

`set DEBUG=cluster & node index.js `

## Printscreens
### Console output after starting the app with cluster debug messages
![HelloAPI1](https://github.com/marta-krzyk-dev/NodeJSCluster/blob/master/PrintScreens/console_output_with_debug_messages.png?raw=true)

### Console output after starting the app (w\o debug messages)
![HelloAPI2](https://github.com/marta-krzyk-dev/NodeJSCluster/blob/master/PrintScreens/console_output.png?raw=true)

