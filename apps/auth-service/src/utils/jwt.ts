import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export function generateAccessToken(payload: object) {
  return jwt.sign(
    payload,
    env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn:
        env.ACCESS_TOKEN_EXPIRES as SignOptions["expiresIn"],
    }
  );
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET as Secret,
    {
      expiresIn:
        env.REFRESH_TOKEN_EXPIRES as SignOptions["expiresIn"],
    }
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(
    token,
    env.JWT_ACCESS_SECRET as Secret
  );
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(
    token,
    env.JWT_REFRESH_SECRET as Secret
  );
}
