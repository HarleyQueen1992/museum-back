import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Booking } from 'src/typeorm/entities/Booking'
import { Ticket } from 'src/typeorm/entities/Ticket'
import { Repository } from 'typeorm'
import { BookingDto } from './dto/booking.dto'

@Injectable()
export class BookingService {
	constructor(
		@InjectRepository(Booking) private bookingRepository: Repository<Booking>,
		@InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
	) {}

	async findBookingById(id: number) {
		// return await this.bookingRepository.findOne({
		// 	where: {
		// 		id: id
		// 	},
		// 	relations: [
		// 		'tickets',
		// 		'tickets.time',
		// 		'tickets.time.date',
		// 		'tickets.time.date.event'
		// 	],
		// 	select: {
		// 		fio: true,
		// 		id: true,
		// 		tickets: {
		// 			id: true,
					
		// 		}
		// 	}
		// })
	}
	async createBooking(dto: BookingDto) {
		// const order = {
		// 	fio: dto.fio,
		// 	email: dto.email,
		// 	phone: dto.phone
		// }

		// let booking = this.bookingRepository.create({ ...order })

		// booking = await this.bookingRepository.save(booking)

		// let tickets = []

		// for (let item of dto.tickets) {
		// 	const time = await this.timeRepository.findOne({
		// 		where: {
		// 			id: item.id
		// 		}
		// 	})

		// 	if (!time) throw new BadRequestException('Time not found')
		// 	await this.timeRepository.update(time.id, {
		// 		countPlaces: time.countPlaces - 1
		// 	})

		// 	time.countPlaces -= 1

		// 	tickets.push(
		// 		this.ticketRepository.create({
		// 			isChild: item.isChild,
		// 			booking,
		// 			time
		// 		})
		// 	)
		// }
		// await this.ticketRepository.save(tickets)
		// return await this.findBookingById(booking.id)
	}
}
