import { Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/typeorm/entities/Event'
import { Like, Repository } from 'typeorm'
import { EventDto } from './dto/event.dto'
import { FileService, FileType } from 'src/file/file.service'

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event) private eventRepository: Repository<Event>,
		private fileService: FileService
	) {}

	async pagination(query: any) {
		const limit = query.limit || 10
		const page = query.page || 0
		const slug = query.slug || ''

		const [result, total] = await this.eventRepository.findAndCount({
			where: {
				name: Like('%' + slug + '%')
			},
			take: limit,
			skip: page * limit
		})

		return {
			result,
			total
		}
	}

	async createEvent(dto: EventDto, banner = null) {
		let bannerPath = null

		if (banner) {
			bannerPath = this.fileService.createFile(FileType.BANNER, banner)
		}
		const event = this.eventRepository.create({ ...dto, banner: bannerPath })
		return await this.eventRepository.save(event)
	}

	async updateEventById(id: number, dto: EventDto, banner = null) {
		if (!banner) {
			await this.eventRepository.update(id, { ...dto })
		} else {
			const bannerPath = this.fileService.createFile(FileType.BANNER, banner)

			await this.eventRepository.update(id, { ...dto, banner: bannerPath })
		}

		return await this.eventRepository.findOneBy({ id })
	}

	async deleteEventById(id: number) {
		return await this.eventRepository.delete({ id })
	}
}
