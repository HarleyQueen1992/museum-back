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
			entities: [Main],
			synchronize: true
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, 'static')
		}),
		AuthModule,
		MainModule,
		FileModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
