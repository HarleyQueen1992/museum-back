import { Type } from 'class-transformer'
import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import * as uuid from 'uuid'

export enum FileType {
	LOGO = 'logo',
	BANNER = 'banner',
	PREVIEW = 'preview',
	NEWS = 'news'
}

@Injectable()
export class FileService {
	createFile(
		type: string,
		file: { originalname: string; buffer: string | NodeJS.ArrayBufferView }
	) {
		try {
			const fileExtension = file.originalname.split('.').pop()
			const fileName = uuid.v4() + '.' + fileExtension
			// const filePath = resolve(__dirname, '..', 'static', type)
			const filePath = resolve('images', type)
			if (!existsSync(filePath)) {
				mkdirSync(filePath, { recursive: true })
			}
			writeFileSync(join(filePath, fileName), file.buffer)
			return type + '/' + fileName
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
		}
	}
}
