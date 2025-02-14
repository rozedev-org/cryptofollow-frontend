export const roles = ["user", "admin", "invited"];

export const user = {
  data: [
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "password123",
      loginTries: 0,
      isEnabled: true,
      picture: "https://example.com/john.jpg",
      role: "user",
    },
    {
      id: 2,
      email: "jane.doe@example.com",
      firstName: "Jane",
      lastName: "Doe",
      password: "password456",
      loginTries: 1,
      isEnabled: false,
      picture: "https://example.com/jane.jpg",
      role: "admin",
    },
  ],
  meta: {
    page: 1,
    take: 1,
    itemCount: 2,
    pageCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};
