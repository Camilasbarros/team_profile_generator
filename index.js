const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

async function buildTeam() {
  const team = [];

  // Collect manager's information
  const manager = await collectManagerInfo();
  team.push(manager);

  let addAnotherMember = true;

  while (addAnotherMember) {
    const { memberType } = await inquirer.prompt([
      {
        type: "list",
        name: "memberType",
        message: "Add another team member:",
        choices: ["Engineer", "Intern", "Finish building the team"],
      },
    ]);

    if (memberType === "Engineer") {
      // Collect engineer's information
      const engineer = await collectEngineerInfo();
      team.push(engineer);
    } else if (memberType === "Intern") {
      // Collect intern's information
      const intern = await collectInternInfo();
      team.push(intern);
    } else {
      addAnotherMember = false;
    }
  }

  // Generate the HTML and write it to a file
  const html = render(team);
  fs.writeFileSync(outputPath, html);
  console.log(`Team HTML generated at ${outputPath}`);
}

// Start building the team
buildTeam();

async function collectManagerInfo() {
  // Use inquirer to collect manager's information
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter manager's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter manager's email:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter manager's office number:",
    },
  ]);

  // Return an object with manager's information
  return new Manager(
    answers.name,
    answers.id,
    answers.email,
    answers.officeNumber
  );
}
async function collectEngineerInfo() {
  // Use inquirer to collect engineer's information
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter engineer's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter engineer's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter engineer's email:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter engineer's GitHub username:",
    },
  ]);

  // Return an object with engineer's information
  return new Engineer(answers.name, answers.id, answers.email, answers.github);
}

async function collectInternInfo() {
  // Use inquirer to collect intern's information
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter intern's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter intern's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter intern's email:",
    },
    {
      type: "input",
      name: "school",
      message: "Enter intern's school:",
    },
  ]);

  // Return an object with intern's information
  return new Intern(answers.name, answers.id, answers.email, answers.school);
}
