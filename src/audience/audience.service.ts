import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Audience } from 'src/typeorm/entities/Audience'
import { Repository } from 'typeorm'
import { AudienceDto } from './dto/audience.dto'

@Injectable()
export class AudienceService {
	constructor(
		@InjectRepository(Audience) private audienceRepository: Repository<Audience>
	) {}

	async findAll() {
		return await this.audienceRepository.find()
	}

	async createAudience(dto: AudienceDto) {
		const audience = this.audienceRepository.create({ ...dto })

		return await this.audienceRepository.save(audience)
	}

	async updateAudienceById(id: number, dto: AudienceDto) {
		await this.audienceRepository.update(id, { ...dto })

		return await this.audienceRepository.findOneBy({ id })
	}

	async deleteAudienceById(id: number) {
		return await this.audienceRepository.delete(id)
	}
}
