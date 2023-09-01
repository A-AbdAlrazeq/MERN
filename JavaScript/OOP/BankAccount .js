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
    console.log(`Balance: $${this.balance.toFixed(2)}`); //if the balance is 100, using .toFixed(2) will display it as "100.00"
    return this;
  }

  yieldInterest() {
    if (this.balance > 0) {
      this.balance += this.balance * this.intRate;
    }
    return this;
  }
}

// Create two BankAccount instances
const account1 = new BankAccount(0.02, 500);
const account2 = new BankAccount(0.03, 1000);

// Perform operations on the first account using chaining
account1
  .deposit(100)
  .deposit(200)
  .deposit(300)
  .withdraw(350)
  .yieldInterest()
  .displayAccountInfo();

// Perform operations on the second account using chaining
account2
  .deposit(500)
  .deposit(300)
  .withdraw(200)
  .withdraw(100)
  .withdraw(150)
  .withdraw(100)
  .yieldInterest()
  .displayAccountInfo();
