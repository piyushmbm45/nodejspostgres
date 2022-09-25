# Nodejs And Postgresql CRUD

## Table Of Content
  - [Description](#description)
  - [Technologies Framework](#technologies-framework)
  - [Learning Objective](#learning-objective)
  - [Scope Of Functionalities](#scope-of-functionalities)
  - [Setup](#setup)

## Description

I just wanted to learn how to connect nodejs with postgresql and how to perform crud operation.

| Api End Point       | Request Type | Body                       | Query Params | Path Params |
| :------------------ | :----------- | :------------------------- | :----------- | :---------- |
| /api/getusers       | get          | no                         | no           | no          |
| /api/getuser/:id    | get          | no                         | no           | id          |
| /api/createuser     | post         | name, email, dob, password | no           | no          |
| /api/deleteuser/:id | post         | no                         | no           | id          |
| /api/updateuser/:id | post         | name, email                | no           | id          |

## Technologies Framework

- Nodejs 16.14.2
- NPM 8.5.0
- Postgresql 14.5

## Learning Objective

- How Nodejs server created using Express library
- Hashing and Salting of password before saving password in Database
- Nodejs Events for better consoling of which request is accessed by user and when
- Env and EnvExample file

## Scope Of Functionalities

- This is Complete backend we can integrate it with frontend
- Add Better error handling
- Add more data on body like Age, Profile Picture, Mobile No. etc.

## Setup

- To run this project, fork it.
- Before running the server.js file first install the all dependencies in computer. You can see used dependencies in Package.json file.( or directly run npm i)
- See env.example file and add environment variable according to it.
- Also don't forget to create a table users in Postgresql with command (CREATE TABLE users(ID TEXT PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, EMAIL TEXT NOT NULL, DOB TEXT NOT NULL, PASSWORD TEXT NOT NULL);)
