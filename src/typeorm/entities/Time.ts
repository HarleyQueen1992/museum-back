import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './Event'
import { DateOf } from './DateOf'

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
}
