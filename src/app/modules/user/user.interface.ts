export interface IUser {
  username: string;
  email:string;
  password: string;
  role: 'admin'|'user';
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}