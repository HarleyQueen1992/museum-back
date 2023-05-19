import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './Event'

@Entity({ name: 'category' })
export class Category {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'name' })
	name: string

	@OneToMany(() => Event, event => event.category)
	events: Event[]
}
