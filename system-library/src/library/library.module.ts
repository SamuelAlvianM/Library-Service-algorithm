import { Module } from '@nestjs/common';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { BookModule } from '../book/book.module';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [BookModule, MemberModule],
  providers: [LibraryService],
  controllers: [LibraryController]
})
export class LibraryModule {}
