const { faker } = require("@faker-js/faker");
const express = require("express");

const app = express();
const port = 3000;

const createUser = () => {
  const newUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    lastName: faker.person.lastName(),
    firstName: faker.person.firstName(),
    _id: faker.string.uuid(),
  };
  return newUser;
};
const newFakeUser = createUser();
console.log(newFakeUser);

const createCompany = () => {
  const newCompany = {
    _id: faker.number.int(),
    name: faker.person.fullName(),
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
  };
  return newCompany;
};
const newFakeCompany = createCompany();
console.log(newFakeCompany);

app.get("/api/users/new", (req, res) => {
  const newUser = createUser();
  res.json(newUser);
});

app.get("/api/companies/new", (req, res) => {
  const newCompany = createCompany();
  res.json(newCompany);
});

app.get("/api/user/company", (req, res) => {
  const newUser = createUser();
  const newCompany = createCompany();
  res.json({ user: newUser, company: newCompany });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
