import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Ticket } from './Ticket'

@Entity({ name: 'booking' })
export class Booking {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'fio' })
	fio: string

	@Column({ name: 'email' })
	email: string

	@Column({ name: 'phone' })
	phone: string

	@OneToMany(() => Ticket, ticket => ticket.booking)
	tickets: Ticket[]
}
