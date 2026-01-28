import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { BadRequestException } from '@nestjs/common';

//upload directory if it doesn't exist
const uploadDir = join(process.cwd(), 'uploads');
if (!existsSync(uploadDir)) {
	mkdirSync(uploadDir, { recursive: true });
}

const ALLOWED_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/gif',
	'image/webp',
];

// max file size: 5MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const multerConfig = {
	storage: diskStorage({
		destination: (req, file, cb) => {
			const userDir = join(uploadDir, 'posts');
			if (!existsSync(userDir)) {
				mkdirSync(userDir, { recursive: true });
			}
			cb(null, userDir);
		},
		filename: (req, file, cb) => {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			const ext = extname(file.originalname);
			cb(null, `${uniqueSuffix}${ext}`);
		},
	}),
	fileFilter: (req: any, file: any, cb: any) => {
		if (ALLOWED_TYPES.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new BadRequestException(
					`Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`,
				),
				false,
			);
		}
	},
	limits: {
		fileSize: MAX_FILE_SIZE,
	},
};