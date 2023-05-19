import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Main } from 'src/typeorm/entities/main'
import { Repository } from 'typeorm'
import { MainDto } from './dto/main.dto'
import { FileService, FileType } from 'src/file/file.service'

@Injectable()
export class MainService {
	constructor(
		@InjectRepository(Main) private mainRepository: Repository<Main>,
		private fileService: FileService
	) {}

	async getMain() {
		return await this.mainRepository.find()
	}

	async createMain(dto: MainDto, logo = null) {
		let logoPath = null

		if (logo) {
			logoPath = this.fileService.createFile(FileType.LOGO, logo)
		}
		const main = this.mainRepository.create({
			...dto,
			logo: logoPath
		})
		return await this.mainRepository.save(main)
	}

	async updateFindById(id: number, dto: MainDto, logo = null) {
		if (!logo) {
			await this.mainRepository.update(id, { ...dto })
		} else {
			const logoPath = this.fileService.createFile(FileType.LOGO, logo)

			await this.mainRepository.update(id, { ...dto, logo: logoPath })
		}
		return await this.mainRepository.findOneBy({ id })
	}

	async deleteFindById(id: number) {
		return await this.mainRepository.delete({ id })
	}
}
