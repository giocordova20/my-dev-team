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

const devTeam = []  // Array to hold all the team members
const ids = []      // Array to hold IDs to maker sure they are not duplicated

function getTeamInfo () {

    //// Start with getting the Manger information then prompt user for the rest of the team. \\\\
    function managerInfo (){
        inquirer.prompt([
            {
                type: "input",
                name: "mgrName",
                message: chalk.bgBlue.white("What is your manager's name?"),
                validate: input => {
                    if (input === ""){
                        return log(chalk.magenta.bold( "\n    >> Please enter a manager name."));
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
                        return log(chalk.magenta.bold("\n    >> Please enter a valid ID Number"));
                    }
                    ids.push(input);
                    return true
                }
            },
            {
                type: "input",
                name: "mgrEmail",
                message: chalk.bgBlue.white("What is your manager's email address?"),
                validate: input => {
                    if (input === ""){
                        return log(chalk.magenta.bold("\n    >> Please enter a valid email address"));
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
                        log(chalk.magenta.bold("\n    >> Please enter a valid Office Number"));
                        return false
                    } 
                    return true
                }
            }
        
        ]).then(answers => {
            log(chalk.bgGreen.white.bold("       >> Manger was created. <<     \n   >> Continue creating your team. <<"));
            const manager = new Manager (answers.mgrName, answers.mgrID, answers.mgrEmail, answers.mgrOffice);
            devTeam.push(manager);

            // Get the Team
            getTeam();

        });


    };

    //// Provide selection to add Engineer, add Inter, or complete the team
    function getTeam (){
        inquirer.prompt([
            {
                type: "list",
                name: "teamMember",
                message: chalk.bgBlue.white("Which team member would you like to add?"),
                choices: ["Engineer", "Intern", "Team Completed"],
            }
        ]).then(answers => {
            switch (answers.teamMember){
                case "Engineer":
                    engineerInfo()
                    break;
                case "Intern":
                    internInfo()
                    break;
                case "Team Completed":
                    teamCompleted()
                    break;
            };
        });
    };

    //// Get Engineer Information \\\\
    function engineerInfo () {
        inquirer.prompt([
            {
                type: "input",
                name: "engrName",
                message: chalk.bgBlue.white("What is your engineer's name?"),
                validate: input => {
                    if (input === ""){
                        return log(chalk.magenta.bold( "\n    >> Please enter the engineer name."));
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "engrID",
                message: chalk.bgBlue.white("What is the egineer's ID Number?"),
                validate: input => {
                    if (input === ""){
                        return log(chalk.magenta.bold("\n    >> Please enter a valid ID Number"));
                    } else if (ids.includes(input)){
                        return log(chalk.magenta.bold("\n    >> This ID has been used. Enter a different ID."));

                    }
                    ids.push(input);
                    return true
                }
            },
            {
                type: "input",
                name: "engrEmail",
                message: chalk.bgBlue.white("What is your engineer's email address?"),
                validate: input => {
                    if (input === ""){
                        log(chalk.magenta.bold("\n    >> Please enter a valid email address"));
                        return false
                    } 
                    return true
                }
            },
            {
                type: "input",
                name: "engrGitHub",
                message: chalk.bgBlue.white("What is the engineer's GitHub username?"),
                validate: input => {
                    if (input === ""){
                        log(chalk.magenta.bold("\n    >> Please enter a valid GitHub username Number"));
                        return false
                    } 
                    return true
                }
            }
        ]).then(answers => {
            log(chalk.bgGreen.white.bold("       >> Engineer was created. <<     \n     >> Continue creating your team. <<"));
            
            const engineer = new Engineer (answers.engrName, answers.engrID, answers.engrEmail, answers.engrGitHub);
            devTeam.push(engineer);

            // Get the Team
            getTeam();
        });


    };
    
    //// Get Intern Information \\\\
    function internInfo () {
        inquirer.prompt([
            {
                type: "input",
                name: "intrName",
                message: chalk.bgBlue.white("What is your intern's name?"),
                validate: input => {
                    if (input === ""){
                        log(chalk.magenta.bold( "\n    >> Please enter the intern name."));
                        return false                        
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "intrID",
                message: chalk.bgBlue.white("What is the intern's ID Number?"),
                validate: input => {
                    if (input === ""){
                        return log(chalk.magenta.bold("\n    >> Please enter a valid ID Number"));
                    } else if (ids.includes(input)){
                        return log(chalk.magenta.bold("\n    >> This ID has been used. Enter a different ID."));
                    }
                    ids.push(input);
                    return true
                }
            },
            {
                type: "input",
                name: "intrEmail",
                message: chalk.bgBlue.white("What is your intern's email address?"),
                validate: input => {
                    if (input === ""){
                        log(chalk.magenta.bold("\n    >> Please enter a valid email address"));
                        return false
                    } 
                    return true
                }
            },
            {
                type: "input",
                name: "intrSchool",
                message: chalk.bgBlue.white("What is the intern's school?"),
                validate: input => {
                    if (input === ""){
                        return log(chalk.magenta.bold("\n    >> Please enter a valid school"));
                    } 
                    return true
                }
            }
        ]).then(answers => {
            log(chalk.bgGreen.white.bold("       >> Engineer was created. <<     \n     >> Continue creating your team. <<"));
            
            const intern = new Intern (answers.intrName, answers.intrID, answers.intrEmail, answers.intrSchool);
            devTeam.push(intern);


            // Get the Team
            getTeam();

        });


    };

    //// Write the HTML file in the 'output' folder
    function teamCompleted () {
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(devTeam), (err) => {
            if (err) throw err;
        });
        log(chalk.bgGreen.white("  HTML file was created in the output folder."))

    };

    managerInfo();

};

getTeamInfo();
