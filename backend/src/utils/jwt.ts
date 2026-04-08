import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

import { config } from '../config/unifiedConfig';
import type { AuthTokenPayload } from '../types/domain';

export const signAuthToken = (payload: AuthTokenPayload): string => {
  const options: SignOptions = {
    expiresIn: config.auth.jwtExpiresIn as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, config.auth.jwtSecret as Secret, options);
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  return jwt.verify(token, config.auth.jwtSecret) as AuthTokenPayload;
};
