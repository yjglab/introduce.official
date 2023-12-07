export enum AccountStatus {
  PENDING = "pending",
  VERIFIED = "verified",
  BANNED = "banned",
}

export enum Role {
  USER = "user",
  PREMIUM = "premium",
  MODERATOR = "moderator",
  ADMIN = "admin",
}

export enum Providers {
  Google = "google",
  Facebook = "facebook",
  Local = "local",
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  provider: Providers;
  email: string;
  displayName: string;
  avatar: string;
  role: Role;
  position: string;
  projectPosts: object;
  accountStatus: AccountStatus;
}
