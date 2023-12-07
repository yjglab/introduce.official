import { Config } from './config.interface';

export const GLOBAL_CONFIG: Config = {
  nest: {
    port: 3040,
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
};
