import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import * as uuid from 'uuid'

export enum FileType {
	LOGO = 'logo',
	BANNER = 'banner'
}

@Injectable()
export class FileService {
	createFile(type: FileType, file): string {
		try {
			const fileExtension = file.originalname.split('.').pop()
			const fileName = uuid.v4() + '.' + fileExtension
			const filePath = resolve(__dirname, '..', 'static', type)
			if (!existsSync(filePath)) {
				mkdirSync(filePath, { recursive: true })
			}
			writeFileSync(resolve(filePath, fileName), file.buffer)
			return type + '/' + fileName
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
