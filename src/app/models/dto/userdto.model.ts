export interface Userdto {
  user: {
    firstName: string;
    lastName: string;
    userId?: number;
    email: string;
    role?: string;
    imageUrl?: string;
  };
}
