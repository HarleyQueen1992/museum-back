import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'main' })
export class Main {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'logo', nullable: true })
	logo: string

	@Column({ name: 'phone' })
	phone: string

	@Column({ name: 'email' })
	email: string

	@Column({ name: 'address' })
	address: string

	@Column({ name: 'vk_link' })
	vk_link: string

	@Column({ name: 'inst_link' })
	inst_link: string

	@Column({ name: 'telegram_link' })
	telegram_link: string
}
