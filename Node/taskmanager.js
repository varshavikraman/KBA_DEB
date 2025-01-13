const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tArray = [];

function showMenu() {
    console.log(`
Task Manager  
1. Add Task
2. List
3. Exit`);

    rl.question('Choose your option (1, 2 or 3): ', handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case '1':
            rl.question('Enter a task: ', (task) => {
                if (task.trim() !== '') {
                    tArray.push(task.trim());
                    console.log(`Task added: ${task}`);
                } else {
                    console.log('Please specify a valid task');
                }
                showMenu();
            });
            break;
        case '2':
            const taskList = tArray.length ? tArray.join(', ') : 'No task';
            console.log('Tasks:', taskList);
            showMenu();
            break;
        case '3':
            console.log('Exiting Task Manager. Goodbye!');
            rl.close();
            break;
        default:
            console.log('Invalid option. Please choose a valid option.');
            showMenu(); 
            break;
    }
}

showMenu();
