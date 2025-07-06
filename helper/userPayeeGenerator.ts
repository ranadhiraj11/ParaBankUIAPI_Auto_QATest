import { faker } from '@faker-js/faker';

export type User = {
  firstName: string;
  lastname: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
};

// Generate random user details
export function generateUser(): User {
  const base = faker.internet.username().toLowerCase().replace(/[^a-z0-9]/gi, '').slice(0, 8); // max 8 chars
  //const randomSuffix = faker.string.alphanumeric(7).toLowerCase();
  const randomSuffix = faker.string.uuid().substring(0,8).toLowerCase() 
  const username = `${base}${randomSuffix}`.slice(0, 15); // final check to ensure length

  return {
    firstName: faker.person.firstName(),
    lastname: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.number.int({ min: 1000, max: 9999 }).toString(),
    username,
    password: 'Test@1234',
  }
}

export type Payee = {
  payeeName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  account: string;
  amount: string
}

export function generatePayee(): Payee {

  return {
    payeeName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    account: faker.number.int({ min: 1000, max: 9999 }).toString(),
    amount: '50'
  }
}
