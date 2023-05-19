import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './Category'

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

	@Column({ name: 'about_me' })
	aboutMe: string

	@Column({ name: 'start_date' })
	startDate: Date

	@Column({ name: 'expiration_date' })
	expirationDate: Date

	@Column({ name: 'adult_price' })
	adultPrice: number

	@Column({ name: 'child_price' })
	childPrice: number

	@ManyToOne(() => Category, category => category.events)
	category: Category
}
