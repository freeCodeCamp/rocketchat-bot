export interface LoginResponseInt {
  status: string;
  data: {
    authToken: string;
    userId: string;
  };
}

export interface UserInfoInt {
  user: {
    _id: string;
    createdAt: string;
    type: string;
    roles: string[];
    username: string;
  };
}
