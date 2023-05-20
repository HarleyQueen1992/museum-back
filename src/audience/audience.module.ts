import { Module } from '@nestjs/common'
import { AudienceService } from './audience.service'
import { AudienceController } from './audience.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Audience } from 'src/typeorm/entities/Audience'

@Module({
	imports: [TypeOrmModule.forFeature([Audience])],
	controllers: [AudienceController],
	providers: [AudienceService]
})
export class AudienceModule {}
