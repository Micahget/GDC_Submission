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
  try {
    const fileData1 = fs.readFileSync("complete.txt", "utf8");
    completedTasks = JSON.parse(fileData1);
  } catch (error) {
    console.log("Creating new file ...");
  }

  let task = tasks.find((task) => task.priority === priority); // find the tasks

  try {
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
    const incompletedTasks = tasks.filter((task) => task.priority !== priority);
    fs.writeFileSync("task.txt", JSON.stringify(incompletedTasks, null, 2)); // overwrite the task
    console.log(`Task deleted sucessful`);
  } catch (error) {
    console.error("Error:", error);
  }
}

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
    completedTasks = JSON.parse(fileData1);
    console.log(completedTasks);
  } catch (error) {
    console.log("All Tasks are completed");
  }

  let id = 0;

  console.log(`Pending Tasks: ${tasks.length}`);
  tasks.sort((a, b) => a.priority - b.priority); // sort by priority
  tasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} - [${task.priority}]`)
  );
  console.log(`Completed Tasks: ${completedTasks.length}`);
  completedTasks.sort((a, b) => a.priority - b.priority);
  completedTasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} - [${task.priority}]`)
  );
}

function help() {
  console.log(`Usage :-
  ./task.js add 2 hello world        #Add a new item with priority 2
  ./task ls                          #List all pending items, sorted by priority
  ./task del Number                 #Delete item with given number
  ./task done Number                #Mark item with given number as done
  ./task report                      #Show statistics
  ./task help                        #Show usage`);
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
  case "help":
    help();
    break;
  default:
    help();
    break;
}
