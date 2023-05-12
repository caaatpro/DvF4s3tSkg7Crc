import { unlinkSync } from 'fs';
import { extname, join } from 'path';

export const imageFileFilter = (_req: any,
	file: { originalname: string; },
	callback: (arg0: Error | null,
	arg1: boolean) => void) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	callback(null, true);
};

export const avatarFileName = (req: any,
	file: { originalname: string; },
	callback: (arg0: null, arg1: string) => void) => {
	const userId = req.user.id;
	const fileExtName = extname(file.originalname);
	const randomName = Array(4)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('');
	callback(null, `${userId}-${randomName}${fileExtName}`);
};

export const eventFileName = (req: any,
	file: { originalname: string; },
	callback: (arg0: null, arg1: string) => void) => {
	const time = new Date().getTime();
	const fileExtName = extname(file.originalname);
	const randomName = Array(4)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('');
	callback(null, `${time}-${randomName}${fileExtName}`);
};

export const removeFile = (dir: string, fileName: string) => {
	const path = join(dir, fileName);
	const fullPath = join(__dirname, path);
	try {
		unlinkSync(fullPath);
	} catch (error) {
		console.error(error);
	}
};