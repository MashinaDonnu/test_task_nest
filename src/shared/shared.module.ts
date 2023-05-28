import { Global, Module } from '@nestjs/common';
import { ResponseService } from '@app/services/response.service';

@Global()
@Module({
  exports: [ResponseService],
  providers: [ResponseService],
})
export class SharedModule {}
