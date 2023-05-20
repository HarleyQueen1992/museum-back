import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'audience' })
export class Audience {
	@PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
	id: number

	@Column({ name: 'name' })
	name: string
}
