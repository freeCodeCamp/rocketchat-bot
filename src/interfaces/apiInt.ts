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

export interface PrivateChannelDeleteInt {
  success: boolean;
}

export interface RoomInfoInt {
  room: {
    _id: string;
    name: string;
    fname: string;
    t: string;
    msgs: number;
    usersCount: number;
    u: {
      _id: string;
      username: string;
    };
    customFields: { [key: string]: unknown };
    broadcast: boolean;
    encrypted: boolean;
    ts: string;
    ro: boolean;
    default: boolean;
    sysMes: boolean;
    _updatedAt: string;
  };
  success: boolean;
}

export interface ChannelKickInt {
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

export interface ChannelInviteInt {
  channel: {
    _id: string;
    ts: string;
    t: string;
    name: string;
    usernames: string[];
    msgs: number;
    _updatedAt: string;
    lm: string;
  };
  success: boolean;
}
