import { prisma } from '../utils/database/config.database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../constants/jwt';
import { UserData, UserResponse } from '../types/auth.types';
import { transformUserData } from '../transformers/user.transformers';

export const registerUser = async (data: UserData):  Promise<UserResponse> => {
  const { name, email, password, role } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: {
        connect: { name: role }
      },
    },
    include: {
      role: true
    }
  });

  return transformUserData(user);
};

export const loginUser = async (email: string, password: string):  Promise<{ token: string, userData: UserResponse }> => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });
  
  if (!user) throw new Error('Invalid email or password.');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password.');

  const token = jwt.sign({ userId: user.id, role: user.role.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION
  });

  const userData = transformUserData(user);

  return { token, userData };
};
