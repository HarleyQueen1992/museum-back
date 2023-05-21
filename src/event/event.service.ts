import { join } from 'path'
import { Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/typeorm/entities/Event'
import { In, Like, Repository } from 'typeorm'
import { EventDto } from './dto/event.dto'
import { FileService, FileType } from 'src/file/file.service'
import { Audience } from 'src/typeorm/entities/Audience'
import { Between } from 'typeorm'
import { MoreThan } from 'typeorm'
import { LessThan } from 'typeorm'
import { Category } from 'src/typeorm/entities/Category'
import { QueryDto } from './dto/query.dto'

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event) private eventRepository: Repository<Event>,
		@InjectRepository(Category)
		private categoryRepository: Repository<Category>,
		@InjectRepository(Audience)
		private audienceRepository: Repository<Audience>,
		private fileService: FileService
	) {}

	async pagination(query: QueryDto) {
		const limit = query.limit || 10
		const page = query.page || 0
		const slug = query.slug || ''
		const date = query.date || null
		const category = query.category || null
		const audit = (query.audit && query.audit.split(',')) || null

		const [result, total] = await this.eventRepository.findAndCount({
			where: {
				name: Like('%' + slug + '%'),
				audits: { id: audit && In(audit) },
				category: {
					id: category && category
				},
				startDate: date && LessThan(date),
				expirationDate: date && MoreThan(date)
			},
			take: limit,
			skip: page * limit
		})

		return {
			result,
			total
		}
	}

	async createEvent(id: number, dto: EventDto, banner = null) {
		let bannerPath = null

		if (banner) {
			bannerPath = this.fileService.createFile(FileType.BANNER, banner)
		}
		const audits = await this.audienceRepository.find({
			where: {
				id: In(dto.audience)
			}
		})

		const category = await this.categoryRepository.findOneBy({ id })

		const event = this.eventRepository.create({
			audits,
			category,
			...dto,
			banner: bannerPath
		})
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
		await this.eventRepository.delete({ id })
	}
}
