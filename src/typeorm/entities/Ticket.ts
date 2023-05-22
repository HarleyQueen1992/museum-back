import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './Time'
import { Booking } from './Booking'

@Entity({ name: 'ticket' })
export class Ticket {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'time', type: 'time' })
	isChild: boolean

	@ManyToOne(() => Time, time => time.tickets, {
		onDelete: 'CASCADE'
	})
	time: Time

	@ManyToOne(() => Booking, booking => booking.tickets, {
		onDelete: 'CASCADE'
	})
	booking: Booking
}
