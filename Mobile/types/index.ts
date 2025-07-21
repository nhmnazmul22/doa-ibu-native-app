export interface Doa {
  _id: string;
  thumbnail: string;
  title: string;
  shortDes: string;
  favorite: boolean;
  duration?: string;
}

export interface Mother {
  _id: string;
  profileImg: string;
  name: string;
  email: string;
  following: string;
  followers: string;
  Doas: Doa[];
}
