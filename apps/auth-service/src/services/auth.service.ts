import { prisma } from "../prisma/client.js";
import {
  RegisterInput,
  LoginInput,
} from "../types/auth.types.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.js";

export async function register(
  data: RegisterInput
) {
  const existingUser =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const role =
    await prisma.role.findUnique({
      where: {
        name: data.role,
      },
    });

  if (!role) {
    throw new Error(
      "Role not found"
    );
  }

  const passwordHash =
    await hashPassword(
      data.password
    );

  return prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: role.id,
    },
    include: {
      role: true,
    },
  });
}

export async function login(
  data: LoginInput
) {
  const user =
    await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        role: true,
      },
    });

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const validPassword =
    await comparePassword(
      data.password,
      user.passwordHash
    );

  if (!validPassword) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role.name,
  };

  return {
    accessToken:
      generateAccessToken(
        payload
      ),

    refreshToken:
      generateRefreshToken(
        payload
      ),

    user: {
      id: user.id,
      email: user.email,
      firstName:
        user.firstName,
      lastName:
        user.lastName,
      role:
        user.role.name,
    },
  };
}
