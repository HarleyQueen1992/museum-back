import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FileModule } from './file/file.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CategoryModule } from './category/category.module'
import { Category } from './typeorm/entities/Category'
import { EventModule } from './event/event.module'
import { Audience } from './typeorm/entities/Audience'
import { AudienceModule } from './audience/audience.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'admin',
			password: 'secret',
			database: 'museum',
			entities: [Category, Event, Audience],
			synchronize: true,
			autoLoadEntities: true
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'static')
		}),
		AuthModule,
		FileModule,
		CategoryModule,
		EventModule,
		AudienceModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
