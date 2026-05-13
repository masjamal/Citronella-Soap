export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  RESELLER = 'reseller',
  AFFILIATE = 'affiliate',
  CUSTOMER = 'customer'
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  referral_code?: string;
  marketplace_link?: string;
  profile_picture?: string;
  is_active: boolean;
  created_at: string;
}
