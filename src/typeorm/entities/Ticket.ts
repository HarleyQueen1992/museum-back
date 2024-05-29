import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './Event'

@Entity({ name: 'ticket' })
export class Ticket {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'title' })
	title: string

	@Column({ name: 'sub_title' })
	sub_title: string

	@ManyToOne(() => Event, event => event.tickets, {
		onDelete: 'CASCADE'
	})
	event: Event

	@Column({ name: 'price' })
	price: number
}
