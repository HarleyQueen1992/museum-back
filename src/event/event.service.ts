import { join } from 'path'
import { Injectable, Query } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Event } from 'src/typeorm/entities/Event'
import { In, Like, Repository } from 'typeorm'
import { EventDto } from './dto/event.dto'
import { FileService, FileType } from 'src/file/file.service'
import { Audience } from 'src/typeorm/entities/Audience'
import { QueryDto } from './dto/query.dto'
import { EventUpdateDto } from './dto/event-update.dto'
import { log } from 'console'

@Injectable()
export class EventService {
	constructor(
		@InjectRepository(Event) private eventRepository: Repository<Event>,
		@InjectRepository(Audience)
		private audienceRepository: Repository<Audience>,
		private fileService: FileService
	) {}

	async pagination(query: QueryDto) {
		console.log(query);
		const limit = query.limit || 10
		const page = query.page || 0
		const audit = query.audit || null
		
		
		const [result, total] = await this.eventRepository.findAndCount({
			where: {
				audience: { id: audit && +audit  },
			},
			relations: ['audience'],
			select: {
				id: true,
				title: true,
				audience: {
					id: true,
					name: true
				},
				sub_title: true,
				preview: true,
				created_at: true
			},
			order: {
				created_at: 'DESC'
			},
			take: limit,
			skip: page * limit
		})

		return {
			result,
			total
		}
	}
	async findById(id: number) {
		return await this.eventRepository.findOne({
			where: { id },
			relations: ['audience']
		})
	}

	async createEvent(id: number, dto: EventDto, banner = null) {
		
		let bannerPath = null

		if (banner) {
			bannerPath = this.fileService.createFile(FileType.BANNER, banner)
		}
		const audits = await this.audienceRepository.findOne({
				where: { id },
			}
		)
		console.log(audits,
			dto,
			bannerPath);
		
		const event = this.eventRepository.create({
			audience: audits,
			...dto,
			banner: bannerPath
		})
		return await this.eventRepository.save(event)
	}

	async updateEventById(id: number, dto: EventUpdateDto, banner = null, preview = null) {

		
		if (!banner && !preview) {
			await this.eventRepository.update(id, { ...dto })
		} else if (!banner) {
			const previewPath = this.fileService.createFile(FileType.PREVIEW, preview)

			await this.eventRepository.update(id, {
				...dto,
				preview: previewPath
			})
		} else if (!preview) {
			const bannerPath = this.fileService.createFile(FileType.BANNER, banner)
			await this.eventRepository.update(id, {
				...dto,
				banner: bannerPath,
			})
		} else {
			const bannerPath = this.fileService.createFile(FileType.BANNER, banner)
			const previewPath = this.fileService.createFile(FileType.PREVIEW, preview)

			await this.eventRepository.update(id, {
				...dto,
				banner: bannerPath,
				preview: previewPath
			})
		}

		return await this.eventRepository.findOneBy({ id })
	}

	async deleteEventById(id: number) {
		await this.eventRepository.delete({ id })
	}
}
