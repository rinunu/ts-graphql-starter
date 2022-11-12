import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonModule } from '@backend/common';
import { DbModule } from '@backend/db';

@Module({
  imports: [DbModule, CommonModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
