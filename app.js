const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const log = console.log;

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const devTeam = [] // Array to hold all the team members

function getTeamInfo () {

    // Start with getting the Manger information then prompt user for the rest of the team.
    function managerInfo (){

        inquirer.prompt([
            {
                type: "input",
                name: "mgrName",
                message: chalk.bgBlue.white("What is your manager's name?"),
                validate: input => {
                    if (input === ""){
                        log(chalk.magenta.bold( "\n    >> Please enter a manager name."));
                        return false                        
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "mgrID",
                message: chalk.bgBlue.white("What is your manager's ID Number?"),
                validate: input => {
                    if (input === ""){
                    // if (input === "" || parseInt(input)=== false){
                        log(chalk.magenta.bold("\n    >> Please enter a valid ID Number"));
                        return false
                    } 
                    return true
                }
            },
            {
                type: "input",
                name: "mgrEmail",
                message: chalk.bgBlue.white("What is your manager's email address?"),
                validate: input => {
                    if (input === ""){
                    // if (input === "" || parseInt(input)=== false){
                        log(chalk.magenta.bold("\n    >> Please enter a valid email address"));
                        return false
                    } 
                    return true
                }
            },
            {
                type: "input",
                name: "mgrOffice",
                message: chalk.bgBlue.white("What is your manager's Office Number?"),
                validate: input => {
                    if (input === ""){
                    // if (input === "" || parseInt(input)=== false){
                        log(chalk.magenta.bold("\n    >> Please enter a valid Office Number"));
                        return false
                    } 
                    return true
                }
            }
        
        ]).then(answers => {
            console.log("");
            console.log("answers: ", answers);
            console.log("");
            
            // Get the Team
            getTeam();
            
        });


    };


    function getTeam (){
        inquirer.prompt([
            {
                type: "list",
                name: "teamMember",
                message: chalk.bgBlue.white("Which team member would you like to add?"),
                choices: ["Engineer", "Intern", "Team Build Finished"],
                validate: input => {
                    if (input === ""){
                        log(chalk.magenta.bold( "\n    >> Please enter a manager name."));
                        return false                        
                    }
                    return true;
                }
            }
        ]).then(answers => {
            console.log("");
            console.log("answers: ", answers);
            console.log("");
        });













    };












    managerInfo();

};

getTeamInfo();
