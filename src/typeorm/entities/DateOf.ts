import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm'
import { Event } from './Event'
import { Time } from './Time'

@Entity({ name: 'date_of' })
export class DateOf {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'date', type: 'date' })
	date: Date

	@ManyToOne(() => Event, event => event.dates, {
		onDelete: 'CASCADE'
	})
	event: Event

	@OneToMany(() => Time, time => time.date)
	times: Time[]
}
