export class Payload {
  email!: string; // user email
  period!: string; // auto-login user 인지 여부를 나타냄. 30d 또는 2h
  sub!: number; // userId
}

export const ONEYEAR = '1y';
export const ONEDAY = '1d';
export const TWOHOUR = '2h';
