const readline =require('readline');

const rl =readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question('What is your NAME ',(name)=>{
    console.log(`Your NAME is ${name}`);
    rl.close();
});