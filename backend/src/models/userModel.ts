export interface User {
  username: string;
  password: string;
}

const users: User[] = [
  { username: 'admin', password: 'admin123' },
];

export class UserModel {
  static findUser(username: string): User | undefined {
    return users.find(user => user.username == username);
  }
}
