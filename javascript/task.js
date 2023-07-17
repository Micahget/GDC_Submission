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


const command = process.argv[2]; // function
const priority = process.argv[3]; // priority
const taskDetail = process.argv[4];

if( command == 'add'){
  add(priority, taskDetail)
}
else if( command == 'done'){
  done(priority)
}

