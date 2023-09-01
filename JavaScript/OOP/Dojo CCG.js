class Card {
  constructor(name, cost) {
    this.name = name;
    this.cost = cost;
  }
}

class Unit extends Card {
  constructor(name, cost, power, resilience) {
    super(name, cost);
    this.power = power;
    this.resilience = resilience;
  }

  attack(target) {
    if (target instanceof Unit) {
      target.takeDamage(this.power);
    } else {
      throw new Error("Target must be a unit!");
    }
  }

  takeDamage(damage) {
    this.resilience -= damage;
    if (this.resilience <= 0) {
      console.log(`${this.name} has been defeated.`);
    }
  }
}

class Effect extends Card {
  constructor(name, cost, text, stat, magnitude) {
    super(name, cost);
    this.text = text;
    this.stat = stat;
    this.magnitude = magnitude;
  }

  play(target) {
    if (target instanceof Unit) {
      console.log(`${this.name} card played on ${target.name}: ${this.text}`);
      this.modifyAttribute(target);
    } else {
      throw new Error("Target must be a unit!");
    }
  }

  modifyAttribute(target) {
    if (this.stat === "power") {
      target.power += this.magnitude;
    } else if (this.stat === "resilience") {
      target.resilience += this.magnitude;
    }
  }
}

// Step 1: Make an instance of "Red Belt Ninja"
const redBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4);

// Step 2: Make an instance of "Hard Algorithm" and play it on "Red Belt Ninja"
const hardAlgorithm = new Effect(
  "Hard Algorithm",
  2,
  "Increase resilience by 3",
  "resilience",
  3
);
hardAlgorithm.play(redBeltNinja);

// Step 3: Make an instance "Black Belt Ninja"
const blackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4);

// Step 4: Make an instance of "Unhandled Promise Rejection" and play it on "Red Belt Ninja"
const unhandledPromiseRejection = new Effect(
  "Unhandled Promise Rejection",
  1,
  "Reduce resilience by 2",
  "resilience",
  -2
);
unhandledPromiseRejection.play(redBeltNinja);

// Step 5: Make an instance of "Pair Programming" and play it on "Red Belt Ninja"
const pairProgramming = new Effect(
  "Pair Programming",
  3,
  "Increase power by 2",
  "power",
  2
);
pairProgramming.play(redBeltNinja);

// Step 6: "Red Belt Ninja" uses the attack method on "Black Belt Ninja"
redBeltNinja.attack(blackBeltNinja);

console.log(redBeltNinja);
console.log(blackBeltNinja);
