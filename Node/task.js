const task=[];
const args=process.argv.slice(2);
const command = args[0];
const task1=args[1];
if(command=='add'){
    if(task1){
        task.push(task1);
        console.log(`Task Added:${task1}`);
        console.log(task1);

    }
    else{
        console.log('Please specify a task to add.');
    }
}
else{
    console.log('Invalid Command');
}