import { faker } from '@faker-js/faker/locale/en_US';
import { parabankUser } from './fixtures/types';

export function generateNewUserDataSet(): parabankUser {
  //const randomNumber = Math.floor(Math.random() * 900) + 100;
  const randomString = faker.string.alpha({ length: 6 });
  const randomNumber = faker.number.int({ min: 1000, max: 9999 });
  const randomDomain = faker.helpers.arrayElement([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
  ]);
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phoneNumber: faker.phone.number(),
    ssNumber: 'AAA-GG-SSSS',

    //   userName: faker.internet.email({
    //     lastName: randomNumber as unknown as string,
    //   }),
    userName: `${randomString}${randomNumber}@${randomDomain}`,
    password: faker.internet.password(),
  };
}
