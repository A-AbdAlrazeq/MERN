class User {
  constructor(name) {
    this.name = name;
    this.accountBalance = 0;
  }
  makeDeposit(amount) {
    this.accountBalance += amount;
    return this;
  }
  makeWithdrawal(amount) {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
    } else {
      console.log("Insufficient funds.");
    }
    return this;
  }
  displayBalance() {
    console.log(`User: ${this.name}, Balance: $${this.accountBalance}`);
    return this;
  }
  transferMoney(otherUser, amount) {
    if (amount <= this.accountBalance) {
      this.accountBalance -= amount;
      otherUser.accountBalance += amount;
      console.log(`${this.name} transferred $${amount} to ${otherUser.name}.`);
    } else {
      console.log("Insufficient funds for transfer.");
    }
    return this;
  }
}

const user1 = new User("Abood");
const user2 = new User("Ahmad");
const user3 = new User("Rami");

//Have the first user make 3 deposits and 1 withdrawal and then display their balance
user1
  .makeDeposit(100)
  .makeDeposit(150)
  .makeDeposit(70)
  .makeWithdrawal(200)
  .displayBalance();
//Have the second user make 2 deposits and 2 withdrawals and then display their balance
user2
  .makeDeposit(100)
  .makeDeposit(150)
  .makeWithdrawal(50)
  .makeWithdrawal(200)
  .displayBalance();
//Have the third user make 1 deposits and 3 withdrawals and then display their balance
user3
  .makeDeposit(300)
  .makeWithdrawal(150)
  .makeWithdrawal(50)
  .makeWithdrawal(200)
  .displayBalance();
// Bonus: Transfer money from User 1 to User 3
user1.transferMoney(user3, 50);
// Display balances after the transfer
user1.displayBalance();
user3.displayBalance();
