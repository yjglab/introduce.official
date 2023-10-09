import { SERVER_PORT } from '@shared/constants/global.constants';
import { Config } from './config.interface';

export const GLOBAL_CONFIG: Config = {
  nest: {
    port: SERVER_PORT,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Hoolter API 문서',
    description: 'Hoolter API 문서입니다.',
    version: '1',
    path: '/api',
  },
  security: {
    expiresIn: 3600 * 24, // 24h
    bcryptSaltOrRound: 10,
  },
};
