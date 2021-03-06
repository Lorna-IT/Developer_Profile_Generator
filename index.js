const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {

  return inquirer.prompt([
    {
      type: "input",
      message: "Ener your GitHub username:",
      name: "username",
    },
    {
      type: "list",
      message: "Whaat is your favorite color?",
      name: "color",
      choices: ["green", "red", "blue", "purple", "pink"]
    },
    
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });

  // got this from activites ?

  // async function init() {
  //   console.log("hi")
  //   try {
  //     const answers = await promptUser();
  
  //     const html = generateHTML(answers);
  
  //     await writeFileAsync("index.html", html);
  
  //     console.log("Successfully wrote to index.html");
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }
  
  // init();
  