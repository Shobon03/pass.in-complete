import { faker } from "@faker-js/faker";
import { Attendee } from "../components/attendee-list";

export const attendees: Attendee[] = Array.from({ length: 204 }).map(() => {
  return {
    id: faker.number.int({ min: 10000, max: 20000 }),
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(),
    createdAt: faker.date.recent({ days: 30 }),
    checkedIdAt: faker.date.recent({ days: 7 }),
  };
});
