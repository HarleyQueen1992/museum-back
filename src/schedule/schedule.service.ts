import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DateOf } from 'src/typeorm/entities/DateOf'
import { Repository } from 'typeorm'
import { ScheduleDto } from './dto/schedule.dto'
import { Event } from 'src/typeorm/entities/Event'
import { Time } from 'src/typeorm/entities/Time'

@Injectable()
export class ScheduleService {
	constructor(
		@InjectRepository(DateOf)
		private dateReposiyory: Repository<DateOf>,
		@InjectRepository(Event) private eventRepository: Repository<Event>,
		@InjectRepository(Time) private timeRepository: Repository<Time>
	) {}

	async findScheduleByEvent(id: number) {
		return await this.dateReposiyory.find({
			where: {
				event: { id: id }
			}
		})
	}
	async createSchedule(id: number, dto: ScheduleDto) {
		const event = await this.eventRepository.findOneBy({ id })
		if (!event) throw new BadRequestException('Event not found')
		let date = this.dateReposiyory.create({ event, date: dto.date })
		date = await this.dateReposiyory.save(date)

		for (let item of dto.times) {
			const time = this.timeRepository.create({
				date,
				time: item.time,
				countPlaces: item.countPlaces
			})
			await this.timeRepository.save(time)
		}
		return await this.dateReposiyory.findOne({
			where: {
				id: date.id
			},
			relations: ['times']
		})
	}

	async deleteDateById(id: number) {
		return await this.dateReposiyory.delete({ id })
	}
}
