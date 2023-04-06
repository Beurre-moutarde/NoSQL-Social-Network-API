# NoSQL Social-Network-API

![](https://img.shields.io/badge/Created%20by-Christopher%20Lebreton%20-blue?style=for-the-badge)  
![](https://img.shields.io/badge/Database-MongoDB-yellow?style=flat-square&logo=mongoDB)  ![](https://img.shields.io/badge/npm%20package-express-orange?style=flat-square&logo=npm) ![](https://img.shields.io/badge/npm%20package-mongoose-cyan?style=flat-square&logo=npm) ![](https://img.shields.io/badge/npm%20package-moment-%3CCOLOR%3E?style=flat-square&logo=npm)

 ## Table of Contents:  
[1. Description](#Description)  
[2. Acceptance Criteria](#Acceptance-Criteria)  
[3. Walkthrough Videos](#Walkthrough-Videos)  
[4. Installation](#Installation)  
[5. Tests](#Tests)  
[6. License Details](#License-Details)  
[7. Submission](#Submission)   
[8. Questions](#Questions)  
## Description:
This API set is designed for a social network that utilizes a MongoDB database, allowing the website to effectively manage large volumes of unstructured data. The APIs utilize Express.js for routing, Mongoose ODM for object modeling, and the moment package for formatting timestamps.

## Acceptance Criteria:

The application server starts and Mongoose models are synchronized with the MongoDB database upon entering the command to invoke the application.

API GET routes for users and thoughts can be tested in Insomnia Core, returning data for each of these routes in a properly formatted JSON.

API POST, PUT, and DELETE routes can be tested in Insomnia Core to successfully create, update, and delete users and thoughts.

API POST and DELETE routes can be tested in Insomnia Core to successfully create and delete reactions to thoughts, as well as add and remove friends from a user's friend list.

## Walkthrough Videos
[User Routes](https://drive.google.com/file/d/1oI6jmpRofvItuz9Be1Cm3y87Wsy7YCbt/view)  
[Friend Routes](https://drive.google.com/file/d/1HUfrKYuI5PTnPRhLugjRgjydxb_-l4Iu/view)  
[Thought Routes](https://drive.google.com/file/d/15EyHJeS2ch2j0CWtuHcl8zsU1pqFU5FJ/view)  
[Reaction Routes](https://drive.google.com/file/d/1y-xMDb8LcGHi9Bi7v1ViYA8O1KdfK4dh/view)  

## Installation:
This repo is not to be deployed, if you wanted to, you could by doing the following:  
1. Download the repo files from the link below
2. You must have mongoDB installed
3. Run the following at the command line
```
    - npm init -y
    - npm install express
    - npm install mongoose
    - npm install moment
```
4. Start the server
```
    $ npm start
```
5. Open Insomnia Core to test API routes

## Tests:  

Testing restful API calls with Insomnia Core  

---
**`/api/users`**
* `GET` all users
* `POST` a new user:
    ```json
    // example data
    {
        "username": "lernantino",
        "email": "lernantino@gmail.com"
    }
    ```
---
**`/api/users/:userid`**
* `GET` a single user by its `_id` 
* `PUT` to update a user by its `_id`
* `DELETE` to remove user by its `_id`
---
**`/api/users/:userId/friends/:friendId`**
* `POST` to add a new friend to a user's friend list
* `DELETE` to remove a friend from a user's friend list
---
**`/api/thoughts`** 
* `GET` to get all thoughts
* `POST` to create a new thought
    ```json
    // example data
    {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
    }
    ```
---
**`/api/thoughts/:thoughtId`**
* `GET` to get a single thought by its `_id`
* `PUT` to update a thought by its `_id`
* `DELETE` to remove a thought by its `_id`
---

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction 
    ```json
    // example data
    {
    "reactionBody":"Hell Yeah!!",
    "username":"lernantino"
    }
    ```
---
**`/api/thoughts/:thoughtId/reactions/:reactionId`**
* `DELETE` remove a reaction by the `reactionId` 

## License Details: 
 This project is under no license.  

## Submission:
 [Github repository](https://github.com/Beurre-moutarde/NoSQL-Social-Network-API)

## Questions:
 Here is a link to my github:  
https://github.com/beurre-moutarde  
 Email me at:  
christopher.m.lebreton@gmail.com  
for additional questions