const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let expenses = new Map();

function showMenu() {
  console.log('\nExpense Tracker');
  console.log('1. Add Expense');
  console.log('2. Show Expenses by Month');
  console.log('3. Exit');
  rl.question('Select an option: ', handleUserInput);
}

function handleUserInput(option) {
  switch (option) {
    case '1':
      addExpense();
      break;
    case '2':
      showExpenses();
      break;
    case '3':
      console.log('Exiting...');
      rl.close();
      break;
    default:
      console.log('Invalid option. Try again.');
      showMenu();
  }
}

function addExpense() {
  rl.question('Enter Expense category : ', category => {
    rl.question('Enter amount: ', amount => {
      rl.question('Enter date (YYYY-MM-DD): ', date => {
        let month = date.slice(5, 7);
        amount = parseFloat(amount) || 0;

        if (!expenses.has(month)) {
          expenses.set(month, 0);
        }
        expenses.set(month, expenses.get(month) + amount);

        console.log('Expense added successfully!');
        showMenu();
      });
    });
  });
}

function showExpenses() {
  rl.question('Enter month (1-12): ', month => {
    month = month.padStart(2, '0');
    console.log(`Total expenses for month ${month}: ${expenses.get(month) || 0}`);
    showMenu();
  });
}

showMenu();
