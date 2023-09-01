class BankAccount {
  constructor(intRate = 0.01, balance = 0) {
    this.intRate = intRate;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return this;
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Insufficient funds: Charging a $5 fee");
      this.balance -= 5;
    }
    return this;
  }

  displayAccountInfo() {
    console.log(`Balance: $${this.balance.toFixed(2)}`);
    return this;
  }

  yieldInterest() {
    if (this.balance > 0) {
      this.balance += this.balance * this.intRate;
    }
    return this;
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.accounts = {}; // An object to store multiple accounts
  }

  createAccount(accountName, intRate = 0.01, balance = 0) {
    this.accounts[accountName] = new BankAccount(intRate, balance);
    return this;
  }

  getAccount(accountName) {
    return this.accounts[accountName];
  }

  deposit(accountName, amount) {
    const account = this.getAccount(accountName);
    account.deposit(amount);
    return this;
  }

  withdraw(accountName, amount) {
    const account = this.getAccount(accountName);
    account.withdraw(amount);
    return this;
  }

  displayUserBalance(accountName) {
    const account = this.getAccount(accountName);
    console.log(`User: ${this.name}, Account: ${accountName}`);
    account.displayAccountInfo();
    return this;
  }

  transferMoney(fromAccount, toAccount, amount) {
    const from = this.getAccount(fromAccount);
    const to = this.getAccount(toAccount);

    if (from && to) {
      from.withdraw(amount);
      to.deposit(amount);
    } else {
      console.log("Invalid account names specified.");
    }
    return this;
  }
}

const user1 = new User("Abood");
user1.createAccount("Savings", 0.02, 500);
user1.createAccount("Checking");

user1
  .deposit("Savings", 100)
  .withdraw("Savings", 50)
  .displayUserBalance("Savings");

user1
  .deposit("Checking", 200)
  .withdraw("Checking", 75)
  .displayUserBalance("Checking");

user1.transferMoney("Savings", "Checking", 50);

user1.displayUserBalance("Savings");
user1.displayUserBalance("Checking");
