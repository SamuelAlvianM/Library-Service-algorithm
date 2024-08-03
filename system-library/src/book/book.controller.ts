import { Controller, Param, Patch, Put } from '@nestjs/common';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Get } from '@nestjs/common';

@Controller('book')
export class BookController {

    constructor (  private bookService: BookService) {}


    @Get()
    async getBook(): Promise<Book[]> {
        return this.bookService.findAllBooks();
    }

    @Get(':code')
    async getActiveBook(@Param('code') code: string): Promise<Book> {
        return this.bookService.findOne(code);
    }

    @Patch(':code')
    async updateBook(code: string, stock: number): Promise<void> {
        return this.bookService.updateStock(code, stock);
    }
}
