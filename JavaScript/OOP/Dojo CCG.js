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
  constructor(name, cost, text, magnitude) {
    super(name, cost);
    this.text = text;
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
    if (this.text === "Increase Power") {
      target.power += this.magnitude;
    } else if (this.text === "Reduce Resilience") {
      target.resilience -= this.magnitude;
    }
  }
}

const unit1 = new Unit("abood", 3, 5, 10);
const effect1 = new Effect("Red", 2, "Increase Power", 3);
const unit2 = new Unit("razeq", 3, 5, 10);
const effect2 = new Effect("Black", 2, "Reduce Resilience", 3);

unit1.attack(unit2); // This decreases unit2's resilience
effect1.play(unit1); // This increases unit1's power
effect2.play(unit2); // This decreases unit2's resilience

console.log(unit1);
console.log(unit2);
