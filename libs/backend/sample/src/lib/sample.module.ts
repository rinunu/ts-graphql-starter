import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { CommonModule } from '@backend/common';
import { DbModule } from '@backend/db';

@Module({
  imports: [DbModule, CommonModule],
  controllers: [],
  providers: [PostService],
  exports: [PostService],
})
export class SampleModule {}
