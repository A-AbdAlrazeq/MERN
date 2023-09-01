class Ninja {
  constructor(name, health, speed = 3, strength = 3) {
    this.name = name;
    this.health = health;
    this.speed = speed;
    this.strength = strength;
  }
  sayName() {
    console.log(`Ninja Name: ${this.name}`);
    return this;
  }
  showStats() {
    console.log(
      `Ninja Name: ${this.name},Health:${this.health} Speed:${this.speed} Strength:${this.strength}`
    );
    return this;
  }
  drinkSake() {
    this.health += 10;
    return this;
  }
}

const ninja = new Ninja("Abood", 100);
ninja.sayName().drinkSake().showStats();
