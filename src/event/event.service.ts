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

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event) private eventRepository: Repository<Event>,
		@InjectRepository(Audience)
		private audienceRepository: Repository<Audience>,
		private fileService: FileService
	) {}

	async pagination(query: any) {
		const limit = query.limit || 10
		const page = query.page || 0
		const slug = query.slug || ''
		const date = query.date || null
		const audit = (query.audit && query.audit.split(',')) || null

		const [result, total] = await this.eventRepository.findAndCount({
			// relations: ['audits'],
			where: {
				name: Like('%' + slug + '%'),
				audits: { id: audit && In(audit) },
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

	async createEvent(dto: EventDto, banner = null) {
		let bannerPath = null

		if (banner) {
			bannerPath = this.fileService.createFile(FileType.BANNER, banner)
		}
		const audits = await this.audienceRepository.find({
			where: {
				id: In(dto.audience)
			}
		})

		const event = this.eventRepository.create({
			audits,
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
