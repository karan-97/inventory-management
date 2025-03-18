import { UserResponse } from '../types/auth.types';

export const transformUserData = (user: any): UserResponse => {
    return {
        id: user.id,
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role.name
    };
};