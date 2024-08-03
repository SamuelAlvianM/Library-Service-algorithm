// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BookService } from './book/book.service';
import { MemberService } from './member/member.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const bookService = app.get(BookService);
  const memberService = app.get(MemberService);

  const books = [
    {
      code: "JK-45",
      title: "Harry Potter",
      author: "J.K Rowling",
      stock: 1
    },
    {
      code: "SHR-1",
      title: "A Study in Scarlet",
      author: "Arthur Conan Doyle",
      stock: 1
    },
    {
      code: "TW-11",
      title: "Twilight",
      author: "Stephenie Meyer",
      stock: 1
    },
    {
      code: "HOB-83",
      title: "The Hobbit, or There and Back Again",
      author: "J.R.R. Tolkien",
      stock: 1
    },
    {
      code: "NRN-7",
      title: "The Lion, the Witch and the Wardrobe",
      author: "C.S. Lewis",
      stock: 1
    },
  ];

  const members = [
    {
      code: "M001",
      name: "Angga",
    },
    {
      code: "M002",
      name: "Ferry",
    },
    {
      code: "M003",
      name: "Putri",
    },
  ];

  // Insert Data
  for (const book of books) {
    await bookService.createBook(book);
  }

  for (const member of members) {
    await memberService.createMember(member);
  }

  await app.close();
}

bootstrap();
