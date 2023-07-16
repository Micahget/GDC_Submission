
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
