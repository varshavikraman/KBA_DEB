const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tArray = [];

function showMenu() {
    console.log(`
Task Manager  
A. Add Task
B. List
C. Exit`);

    rl.question('Choose your option (A, B or C): ', handleOption);
}

function handleOption(option) {
    switch (option.trim()) {
        case 'A':
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
        case 'B':
             if(tArray.length !==0) {
                tArray.forEach((task,index)=>{
                    console.log(`${index+1}.${task}`)
                })
             }
             else{
                console.log('No Task Added')
             }
            showMenu();
            break;
        case 'C':
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
