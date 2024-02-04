import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'news' })
export class News {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: number

	@Column({ name: 'body', type: 'text' })
	body: string

	@Column({ name: 'title' })
	title: string

	@Column({ name: 'banner' })
	banner: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
