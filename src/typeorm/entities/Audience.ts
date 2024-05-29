import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Event } from './Event'

@Entity({ name: 'audience' })
export class Audience {
	@PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
	id: number

	@Column({ name: 'name' })
	name: string

	@OneToMany(() => Event, event => event.audience)
	events: Event[]
}
