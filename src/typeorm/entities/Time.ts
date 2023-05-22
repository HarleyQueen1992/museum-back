import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import { DateOf } from './DateOf'
import { Ticket } from './Ticket'

@Entity({ name: 'time' })
export class Time {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'time', type: 'time' })
	time: string

	@Column({ name: 'count_places' })
	countPlaces: number

	@ManyToOne(() => DateOf, date => date.times, {
		onDelete: 'CASCADE'
	})
	date: DateOf

	@OneToMany(() => Ticket, ticket => ticket.time)
	tickets: Ticket[]
}
