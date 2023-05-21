import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DateOf } from 'src/typeorm/entities/DateOf'
import { Time } from 'src/typeorm/entities/Time'
import { Repository } from 'typeorm'
import { TimeDto } from './dto/time.dto'

@Injectable()
export class TimeService {
	constructor(
		@InjectRepository(DateOf)
		private dateRepository: Repository<DateOf>,
		@InjectRepository(Time) private timeRepository: Repository<Time>
	) {}

	async findTimeBySchedule(id: number) {
		return await this.timeRepository.find({
			where: {
				date: {
					id
				}
			}
		})
	}

	async createTimeForSchedule(id: number, dto: TimeDto) {
		const date = await this.dateRepository.findOneBy({ id })

		if (!date) throw new BadRequestException('Schedule not found')

		const time = this.timeRepository.create({ date, ...dto })

		return await this.timeRepository.save(time)
	}
}
