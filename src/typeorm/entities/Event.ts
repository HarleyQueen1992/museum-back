import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Audience } from './Audience'
import { Ticket } from './Ticket'

@Entity({ name: 'event' })
export class Event {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'title' })
	title: string

	@Column({ name: 'sub_title' })
	sub_title: string

	@Column({ name: 'banner', nullable: true })
	banner: string

	@Column({ name: 'preview', nullable: true })
	preview: string

	@Column({ name: 'description'})
	description: string

	@Column({ name: 'about_me', type: 'text' })
	aboutMe: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date


	@ManyToOne(() => Audience, audience => audience.events, {
		onDelete: 'CASCADE'
	})
	audience: Audience

	@OneToMany(() => Ticket, ticket => ticket.event)
	tickets: Ticket[]

	
}
