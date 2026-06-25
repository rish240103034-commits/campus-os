import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js";

import {
  register,
  login,
} from "../services/auth.service.js";

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const user =
      await register(req.body);

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed",
    });
  }
}

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const result =
      await login(req.body);

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed",
    });
  }
}
export async function meController(
  req: AuthRequest,
  res: Response
) {
  return res.json({
    success: true,
    user: req.user,
  });
}
