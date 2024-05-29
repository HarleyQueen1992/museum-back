import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FileModule } from './file/file.module'
import { join, resolve } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { EventModule } from './event/event.module'
import { Audience } from './typeorm/entities/Audience'
import { AudienceModule } from './audience/audience.module'
import { Ticket } from './typeorm/entities/Ticket'
import { Booking } from './typeorm/entities/Booking'
import { BookingModule } from './booking/booking.module'
import { News } from './typeorm/entities/News'
import { NewsModule } from './news/news.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'admin',
			password: 'secret',
			database: 'sky_park',
			entities: [
				Event,
				Audience,				Ticket,
				Booking,
				News
			],
			synchronize: true,
			autoLoadEntities: true
		}),
		ServeStaticModule.forRoot({
			rootPath: resolve(__dirname, 'static')
		}),
		AuthModule,
		FileModule,
		EventModule,
		AudienceModule,
		BookingModule,
		NewsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
