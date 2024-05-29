import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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
}
