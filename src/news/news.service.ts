import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FileService, FileType } from 'src/file/file.service'
import { News } from 'src/typeorm/entities/News'
import { Like, Repository } from 'typeorm'
import { QueryDto } from './dto/query.dto'
import { NewsDto } from './dto/news.dto'
import { NewsUpdateDto } from './dto/news-update.dto'

@Injectable()
export class NewsService {
	constructor(
		@InjectRepository(News) private newsRepository: Repository<News>,
		private fileService: FileService
	) {}

	async pagination(query: QueryDto) {
		const limit = query.limit || 10
		const page = query.page || 0
		const slug = query.slug || ''

		const [result, total] = await this.newsRepository.findAndCount({
			where: {
				title: Like('%' + slug + '%')
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
		return await this.newsRepository.findOneBy({ id })
	}
	async createNews(dto: NewsDto, banner = null) {
		let bannerPath = null

		if (banner) {
			bannerPath = this.fileService.createFile(FileType.NEWS, banner)
		}

		const news = this.newsRepository.create({
			...dto,
			banner: bannerPath
		})
		return await this.newsRepository.save(news)
	}
	async updateNewsById(id: number, dto: NewsUpdateDto, banner = null) {
		if (!banner) {
			await this.newsRepository.update(id, { ...dto })
		} else {
			const bannerPath = this.fileService.createFile(FileType.NEWS, banner)

			await this.newsRepository.update(id, {
				...dto,
				banner: bannerPath
			})
		}

		return await this.newsRepository.findOneBy({ id })
	}

	async deleteNewsById(id: number) {
		await this.newsRepository.delete({ id })
	}
}
