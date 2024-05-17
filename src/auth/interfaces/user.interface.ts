export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

// type User = {
//   id: string;
//   userName: string;
//   password: string;
//   role: Role;
// };

export interface IAuthenticate {
  token: string;
  user: {
    id: string;
    userName: string;
    password: string;
    role: Role;
  };
}

