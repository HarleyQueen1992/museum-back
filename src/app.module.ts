import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { Main } from './typeorm/entities/main'
import { MainModule } from './main/main.module'
import { FileModule } from './file/file.module'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CategoryModule } from './category/category.module'
import { Category } from './typeorm/entities/Category'
import { EventModule } from './event/event.module'

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
			entities: [Main, Category, Event],
			synchronize: true,
			autoLoadEntities: true
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'static')
		}),
		AuthModule,
		MainModule,
		FileModule,
		CategoryModule,
		EventModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
