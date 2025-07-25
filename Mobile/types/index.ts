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

export interface PresetsColors {
  primary: string;
  secondary: string;
  darkText: string;
  bodyBackground: string;
  success: string;
  warning: string;
}

export interface Donation {
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
  order_id: string;
  amount: number;
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

  // Subscription Info
  subscriptionType?: "free" | "premium" | "donate";
  subscriptionStatus?: "active" | "inactive";
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  subscriptionRenewalDate?: Date;

  // Donation Summary
  isDonated?: boolean;
  lastDonationDate?: Date;
  totalDonations?: number;
  totalSpent?: number;

  // Detailed Records
  donations?: Donation[];
  pendingPayments?: PendingPayment[];
  subscriptions?: Subscription[];
}
