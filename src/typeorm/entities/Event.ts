import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { Category } from './Category'
import { Audience } from './Audience'
import { DateOf } from './DateOf'

@Entity({ name: 'event' })
export class Event {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'name' })
	name: string

	@Column({ name: 'phone' })
	phone: string

	@Column({ name: 'address' })
	address: string

	@Column({ name: 'banner', nullable: true })
	banner: string

	@Column({ name: 'schedule' })
	schedule: string

	@Column({ name: 'description', length: 400 })
	description: string

	@Column({ name: 'about_me', type: 'text' })
	aboutMe: string

	@Column({ name: 'start_date', type: 'date' })
	startDate: Date

	@Column({ name: 'expiration_date', type: 'date' })
	expirationDate: Date

	@Column({ name: 'adult_price' })
	adultPrice: number

	@Column({ name: 'child_price' })
	childPrice: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@ManyToOne(() => Category, category => category.events, {
		onDelete: 'CASCADE'
	})
	category: Category

	@OneToMany(() => DateOf, date => date.event, {
		onDelete: 'CASCADE'
	})
	dates: DateOf[]

	@ManyToMany(() => Audience, {
		onDelete: 'CASCADE'
	})
	@JoinTable()
	audits: Audience[]
}
