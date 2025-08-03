export interface Doa {
  _id?: string;
  thumbnail?: string;
  title: string;
  shortDes: string;
  favoriteUsers?: [string];
  duration?: string;
  audioLink?: string;
  motherDetails?: Mother;
}

export interface Mother {
  _id?: string;
  profilePicture?: string;
  fullName: string;
  email: string;
  followers?: [string];
  role?: string;
}

export interface PresetsColors {
  primary: string;
  secondary: string;
  darkText: string;
  bodyBackground: string;
  success: string;
  warning: string;
}

export interface Donation {
  userDetails: User;
  order_id: string;
  amount: number;
  method: string;
  date: Date;
}

export interface PendingPayment {
  order_id: string;
  type: "donation" | "subscription";
  amount: number;
  method: string;
  date: Date;
}

export interface Subscription {
  userDetails: User;
  amount: number;
  order_id?: string;
  startDate: Date;
  endDate: Date;
  method: string;
  status: "active" | "expired" | "cancelled";
  date: Date;
}

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  profilePicture?: string;
  role?: "user";
  extraRole?: string;
  subscriptionType?: "free" | "premium" | "donate";
  subscriptionStatus?: "active" | "inactive";
  isDonated?: boolean;
}

export interface Pricing {
  _id?: string;
  title: string;
  shortDes: string;
  type: string;
  price: string;
  features: {
    text: string;
    available: boolean;
  }[];
}
