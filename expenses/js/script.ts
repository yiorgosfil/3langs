import * as readlineSync from 'readline-sync'

type Expenses = {
  amount: number
  category: string
}

function addExpense(expenses: Expenses[], amount: number, category: string): void {
  expenses.push({ amount, category })
}

function printExpences(expenses: Expenses[]): void {
  for (const expense of expenses) {
    console.log(`Amount: ${expense.amount}, Category: ${expense.category}`)
  }
}

function totalExpenses(expenses: Expenses[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

function filterExpencesByCategory(expenses: Expenses[], category: string): Expenses[] {
  return expenses.filter(expense => expense.category === category)
}

function expensesProgram(): void {
  const expenses: Expenses[] = []

  while (true) {
    console.log('\nExpense Tracker')
    console.log('1. Add an expense')
    console.log('2. List all expenses')
    console.log('3. Show total expenses')
    console.log('4. Filter expenses by category')
    console.log('5. Exit')

    const choice = readlineSync.question('Enter your choice: ')

    if (choice == '1') {
      const amount = readlineSync.questionInt('Enter amount: ')
      const category = readlineSync.question('Enter category: ')
      addExpense(expenses, amount, category)
    } else if (choice == '2') {
      console.log('\nAll Expences:')
      printExpences(expenses)
    } else if (choice == '3') {
      console.log('\nTotal Expenses: ', totalExpenses(expenses))
    } else if (choice == '4') {
      const category = readlineSync.question('Enter category to filter: ')
      console.log(`\nExpenses for ${category}`)
      const expensesFromCategory = filterExpencesByCategory(expenses, category)
      printExpences(expensesFromCategory)
    } else if (choice == '5') {
      console.log('Exiting the program')
      break
    }
  }
}

expensesProgram()
