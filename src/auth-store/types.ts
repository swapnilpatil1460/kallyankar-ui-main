export type User = {
  name: string;
  email: string;
  token: string;
  expiration: string;
  _id?: string;
  last_name: string;
  role: string;
  createdBy?: string;
  deleted?: boolean;
};

export type State = {
  user: User | null;
  isAuthenticated: boolean;
  expiration_duration: number;
  isSessionRestored: boolean;
};
