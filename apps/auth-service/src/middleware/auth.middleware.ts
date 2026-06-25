import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  verifyAccessToken,
} from "../utils/jwt.js";

export interface AuthRequest
  extends Request {
  user?: any;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message:
        "Authorization header missing",
    });
  }

  const token =
    authHeader.replace(
      "Bearer ",
      ""
    );

  try {
    const decoded =
      verifyAccessToken(
        token
      );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
}
