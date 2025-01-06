"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
function addExpense(expenses, amount, category) {
    expenses.push({ amount: amount, category: category });
}
function printExpences(expenses) {
    for (var _i = 0, expenses_1 = expenses; _i < expenses_1.length; _i++) {
        var expense = expenses_1[_i];
        console.log("Amount: ".concat(expense.amount, ", Category: ").concat(expense.category));
    }
}
function totalExpenses(expenses) {
    return expenses.reduce(function (total, expense) { return total + expense.amount; }, 0);
}
function filterExpencesByCategory(expenses, category) {
    return expenses.filter(function (expense) { return expense.category === category; });
}
function expensesProgram() {
    var expenses = [];
    while (true) {
        console.log('\nExpense Tracker');
        console.log('1. Add an expense');
        console.log('2. List all expenses');
        console.log('3. Show total expenses');
        console.log('4. Filter expenses by category');
        console.log('5. Exit');
        var choice = readlineSync.question('Enter your choice: ');
        if (choice == '1') {
            var amount = readlineSync.questionInt('Enter amount: ');
            var category = readlineSync.question('Enter category: ');
            addExpense(expenses, amount, category);
        }
        else if (choice == '2') {
            console.log('\nAll Expences:');
            printExpences(expenses);
        }
        else if (choice == '3') {
            console.log('\nTotal Expenses: ', totalExpenses(expenses));
        }
        else if (choice == '4') {
            var category = readlineSync.question('Enter category to filter: ');
            console.log("\nExpenses for ".concat(category));
            var expensesFromCategory = filterExpencesByCategory(expenses, category);
            printExpences(expensesFromCategory);
        }
        else if (choice == '5') {
            console.log('Exiting the program');
            break;
        }
    }
}
expensesProgram();
