export enum AccountStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  BANNED = "banned",
}

export enum Role {
  USER = "user",
  PRO = "pro",
  EXPERT = "expert",
  MANAGER = "manager",
  ADMIN = "admin",
}

export enum Providers {
  Google = "google",
  Facebook = "facebook",
  Local = "local",
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar: string;
  role: Role;
  roleExpiry: Date;
  position: string;
  projects: object;
  accountStatus: AccountStatus;
  provider: Providers;
  createdAt: string;
  updatedAt: string;
}
