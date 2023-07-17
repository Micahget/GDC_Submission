// task.js

const fs = require('fs');

let tasks = [];
function add(priority, taskDetail) {

  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    tasks = JSON.parse(fileData);
  } catch (error) {
    // create New file if there is no task.txt file
    console.log("Creating New File")
  }

// let maxId = 0
  let task = {
    // id: maxId + 1,
    priority: priority,
    taskDetail: taskDetail,
    completed: false
  };

  tasks.push(task);

  try {
    fs.writeFileSync('task.txt', JSON.stringify(tasks, null, 2));
    console.log(`Task aded sucessful`);
  } catch (error) {
    console.error('Error:', error);
  }
}

function done(priority){
    try {
        const fileData = fs.readFileSync('task.txt', 'utf8');
        tasks = JSON.parse(fileData);
      } catch (error) {
        console.log("Creating new file ...")
      }

      let task = tasks.find(task => task.priority === priority); // find the tasks
      task.completed = true;

      try {
        const incompletedTasks = tasks.filter(task => task.priority !== priority); //filter the completed task
        fs.writeFileSync('task.txt', JSON.stringify(incompletedTasks, null, 2));
        console.log(`Task completed sucessful`);
        fs.appendFileSync('complete.txt', JSON.stringify(task, null, 2));
      } catch (error) {
        console.error('Error:', error);
      }
}

function del(priority){
  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    tasks = JSON.parse(fileData);
  }
  catch (error) {
    console.log("All Tasks are completed");
    return;
  }

  let task = tasks.find(task => task.priority === priority); // find the tasks

  try {
    // find the tasks with are not the task to be deleted
    const incompletedTasks = tasks.filter(task => task.priority !== priority);
    fs.writeFileSync('task.txt', JSON.stringify(incompletedTasks, null, 2)); // overwrite the task
    console.log(`Task deleted sucessful`);
  }
  catch (error) {
    console.error('Error:', error);
  }

}

const command = process.argv[2]; // function

switch (command) {
  case 'add':
    const priority = process.argv[3];
    const taskDetail = process.argv[4];
    if (!priority || !taskDetail) {
      console.log('Usage: node task.js add <priority> <taskDetail>');
    } else {
      add(priority, taskDetail);
    }
    break;
  case 'done':
    const priorityId = process.argv[3];
    if (!priorityId) {
      console.log('Usage: node task.js complete <id>');
    } else {
      done(priorityId);
    }
    break;
  case 'del':
    const priorityId1 = process.argv[3];
    if (!priorityId1) {
      console.log('Usage: node task.js complete <id>');
    } else {
      del(priorityId1);
    }
    break;
  default:
    console.log('Usage: node task.js <command>');
    console.log('Commands: add, remove, complete, list');
    break;
}

