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

export interface RoleListInt {
  users: [
    {
      _id: string;
      username: string;
      type: string;
      status: string;
      active: boolean;
      name: string;
    }
  ];
  success: boolean;
}

export interface PrivateChannelCreateInt {
  group: {
    _id: string;
    name: string;
    t: string;
    usernames: [string];
    msgs: number;
    u: {
      _id: string;
      username: string;
    };
    ts: string;
    ro: boolean;
    sysMes: boolean;
    _updatedAt: string;
  };
  success: boolean;
}
