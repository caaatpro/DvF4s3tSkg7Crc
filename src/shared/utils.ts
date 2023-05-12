import { compare } from 'bcrypt';

export const comparePasswords = async (userPassword: string, currentPassword: string | Buffer) => {
	return compare(currentPassword, userPassword);
};

export const toFixedTwo = (value: number) => parseFloat(value.toFixed(2));