// task.js

const fs = require("fs");

let tasks = [];
let completedTasks = [];
function add(priority, taskDetail) {
  // let tasks = [];

  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    if (fileData.length > 0) {
      tasks = fileData.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
  } catch (error) {
    
  }


  let task = {
    priority: priority,
    taskDetail: taskDetail,
    completed: false
  };
  
  if(tasks.find((task) => task.priority === priority)) {
    console.log(`Error: item with priority ${priority} already exists.`);
   return;
  }

  tasks.push(task);

  try {
    fs.writeFileSync('task.txt', tasks.map(task => `${task.priority} ${task.taskDetail}`).join('\n'));
    console.log(`Added task: \"${task.taskDetail}\" with priority ${task.priority}`);
  } catch (error) {
    console.error('Error:', error);
  }
}


function done(priority) {
  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    if (fileData.length > 0) {
      tasks = fileData.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
  } catch (error) {
    console.log('Creating New File');
  }
  
  try {
    const fileData1 = fs.readFileSync('complete.txt', 'utf8');
    if (fileData1.length > 0) {
      completedTasks = fileData1.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
  } catch (error) {
    // console.log('Creating New File');
  }

 
  let task = tasks.find((task) => task.priority === priority); // find the tasks

 if(completedTasks.includes(task)) {
    console.log(`Error: item with priority ${priority} already exists.`);
   return;
  }


  try {
    const incompletedTasks = tasks.filter((task) => task.priority !== priority);
    
    fs.writeFileSync('task.txt', incompletedTasks.map(task => `${task.priority} ${task.taskDetail}`).join('\n'));
    // items should not be added if they already exist
    if(completedTasks.includes(task)) {
      return;
    }
    completedTasks.push(task); // push the completed task to the completedTasks array
    // make empty string is ignored and there is no same task added monre than once
    completedTasks = completedTasks.filter((task) => task.taskDetail !== '');
    
    fs.writeFileSync('complete.txt', completedTasks.map(task => `${task.priority} ${task.taskDetail}`).join('\n'));
    console.log(`Marked item as done.`);
  } catch (error) {
    console.error("Error:", error);
  }
}

function del(priority) {
  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    if (fileData.length > 0) {
      tasks = fileData.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
  } catch (error) {
    
  }
 
  // let task = tasks.find((task) => task.priority === priority); // find the tasks
  if(tasks.find((task) => task.priority !== priority)){
    console.log(`Error: task with index #${priority} does not exist. Nothing deleted.`)
  }
  

  try {
    const notDeletedTasks = tasks.filter((task) => task.priority !== priority);
    fs.writeFileSync('task.txt', notDeletedTasks.map(task => `${task.priority} ${task.taskDetail}`).join('\n'));
    console.log(`Deleted task #${priority}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

function ls() {
  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    if (fileData.length > 0) {
      tasks = fileData.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
    // console.log("we reached here")
  } catch (error) {
    console.log('There are no pending tasks!');
    return;
  }

  
  let id = 1;
  // console.log(tasks)
  tasks.length>0 ? tasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} [${task.priority}]`)
  ) : console.log("There are no pending tasks!");
}
function report() {
  try {
    const fileData = fs.readFileSync('task.txt', 'utf8');
    if (fileData.length > 0) {
      tasks = fileData.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
  } catch (error) {
    // console.log('Creating New File');
  }

  try {
    const fileData = fs.readFileSync('complete.txt', 'utf8');
    if (fileData.length > 0) {
      completedTasks = fileData.split('\n').map(line => {
        const [linePriority, ...lineTaskDetail] = line.split(' ');
        return {
          priority: linePriority,
          taskDetail: lineTaskDetail.join(' '),
          completed: false
        };
      });
    }
  } catch (error) {
    // console.log('Creating New File');
  }
  let id = 0;

  console.log(`Pending: ${tasks.length}`);
  tasks.sort((a, b) => a.priority - b.priority); // sort by priority
  tasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} [${task.priority}]`)
  );
  console.log(`Completed: ${completedTasks.length}`);
  completedTasks.sort((a, b) => a.priority - b.priority);
  completedTasks.forEach((task) =>
    console.log(`${id++}. ${task.taskDetail} [${task.priority}]`)
  );
}

function help() {
  let usage = `Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`;
  console.log(usage);
}

const command = process.argv[2]; // function

switch (command) {
  case "add":
    const priority = process.argv[3];
    const taskDetail = process.argv[4];
    if (!priority || !taskDetail) {
      console.log("Error: Missing tasks string. Nothing added!");
    } else {
      add(priority, taskDetail);
    }
    break;
  case "done":
    const priorityId = process.argv[3];
    if (!priorityId) {
      console.log("Error: Missing NUMBER for marking tasks as done.");
    } else {
      done(priorityId);
    }
    break;
  case "del":
    const priorityId1 = process.argv[3];
    if (!priorityId1) {
      console.log("Error: Missing NUMBER for deleting tasks.");
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
