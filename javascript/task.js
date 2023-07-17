// task.js

const fs = require("fs");

let tasks = [];
let completedTasks = [];
function add(priority, taskDetail) {
  try {
    const fileData = fs.readFileSync("task.txt", "utf8");
    tasks = JSON.parse(fileData);
  } catch (error) {
    // create New file if there is no task.txt file
    console.log("Creating New File");
  }

  // let maxId = 0
  let task = {
    // id: maxId + 1,
    priority: priority,
    taskDetail: taskDetail,
    completed: false,
  };

  tasks.push(task);

  try {
    fs.writeFileSync("task.txt", JSON.stringify(tasks, null, 2));
    console.log(`Task aded sucessful`);
  } catch (error) {
    console.error("Error:", error);
  }
}

function done(priority) {
  try {
    const fileData = fs.readFileSync("task.txt", "utf8");
    tasks = JSON.parse(fileData);
  } catch (error) {
    console.log("Creating new file ...");
  }
  // fetch the completed task from the completed.txt file
  try {
    const fileData1 = fs.readFileSync("complete.txt", "utf8");
    completedTasks = JSON.parse(fileData1);
  } catch (error) {
    console.log("Creating new file ...");
  }

  let task = tasks.find((task) => task.priority === priority); // find the tasks

  try {
    // find the tasks with are not the task to be completed
    const incompletedTasks = tasks.filter((task) => task.priority !== priority);
    fs.writeFileSync("task.txt", JSON.stringify(incompletedTasks, null, 2)); // overwrite the task
    completedTasks.push(task); // push the completed task to the completedTasks array
    fs.writeFileSync("complete.txt", JSON.stringify(completedTasks, null, 2)); // write the completed task to the completed.txt file
    console.log(`Task completed sucessful`);
  } catch (error) {
    console.error("Error:", error);
  }
}

function del(priority) {
  try {
    const fileData = fs.readFileSync("task.txt", "utf8");
    tasks = JSON.parse(fileData);
  } catch (error) {
    console.log("All Tasks are completed");
    return;
  }

  let task = tasks.find((task) => task.priority === priority); // find the tasks

  try {
    // find the tasks with are not the task to be deleted
    const incompletedTasks = tasks.filter((task) => task.priority !== priority);
    fs.writeFileSync("task.txt", JSON.stringify(incompletedTasks, null, 2)); // overwrite the task
    console.log(`Task deleted sucessful`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// method to list all the tasks by according to priority
function ls() {
  try {
    const fileData = fs.readFileSync("task.txt", "utf8");
    tasks = JSON.parse(fileData);
  } catch (error) {
    console.log("All Tasks are completed");
    return;
  }

  let id = 0;
  tasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} - ${task.priority}`)
  );
}
// method to print the report of number of completed and incompleted tasks
function report() {
  try {
    const fileData = fs.readFileSync("task.txt", "utf8");
    tasks = JSON.parse(fileData);
  } catch (error) {
    console.log("All Tasks are completed");
  }

  try {
    const fileData1 = fs.readFileSync("complete.txt", "utf8");
    // console.log(fileData1);
    // the data in the file is in object form so we need to parse it not in json format
    completedTasks = JSON.parse(fileData1);
    console.log(completedTasks);
  } catch (error) {
    console.log("All Tasks are completed");
  }

  let id = 0;

  console.log(`Pending Tasks: ${tasks.length}`);
  //list according to priority in ascending order
  tasks.sort((a, b) => a.priority - b.priority);
  tasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} - [${task.priority}]`)
  );
  console.log(`Completed Tasks: ${completedTasks.length}`);
  //list according to priority in ascending order
  completedTasks.sort((a, b) => a.priority - b.priority);
  completedTasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} - [${task.priority}]`)
  );
}

const command = process.argv[2]; // function

switch (command) {
  case "add":
    const priority = process.argv[3];
    const taskDetail = process.argv[4];
    if (!priority || !taskDetail) {
      console.log("Usage: node task.js add <priority> <taskDetail>");
    } else {
      add(priority, taskDetail);
    }
    break;
  case "done":
    const priorityId = process.argv[3];
    if (!priorityId) {
      console.log("Usage: node task.js complete <id>");
    } else {
      done(priorityId);
    }
    break;
  case "del":
    const priorityId1 = process.argv[3];
    if (!priorityId1) {
      console.log("Usage: node task.js complete <id>");
    } else {
      del(priorityId1);
    }
    break;
  case "ls":
    ls();
    break;
  case "report":
    report();
    break;
  default:
    console.log("Usage: node task.js <command>");
    console.log("Commands: add, remove, complete, list");
    break;
}
