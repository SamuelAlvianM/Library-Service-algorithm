import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { LibraryModule } from './library/library.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/member.entity';
import { Book } from './book/book.entity';

@Module({
  imports: [
    BookModule, 
    MemberModule, 
    LibraryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5000,
      username: 'postgres',
      password: '12345678',
      database: 'Library',
      entities: [Book, Member],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
