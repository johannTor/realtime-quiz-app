# Realtime Quiz App

A realtime quiz app I created with React in order to practice using the [Socket.IO](https://socket.io) library.

[The quiz server repository](https://github.com/johannTor/realtime-quiz-server)

## What the app features

* The ability to create questions and answers
* Sharable links to created quizes
* A list of connected users
* The quiz creator controls when to start the quiz and to go to the next question
* The quiz creator can see which users have answered the questions
* Once the quiz ends a scoreboard is shown along with correct answers

## Dependencies
* React Router Dom
* uuid
* Socket IO

## To Add/Fix:

* There's only one scoring system right now, users can only pick one correct answer even if there are multiple correct ones. Therefore he'll get a maximum of one point for each question
* Keep a history of the user answers. Show it to the user or the creator at the end result screen.
* Possibly enable users to connect while quiz has already started.
