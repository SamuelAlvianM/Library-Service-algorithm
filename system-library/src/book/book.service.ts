import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {

    constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

    async createBook(bookData: Partial<Book>): Promise<Book> {
        const book = this.bookRepo.create(bookData);
        return this.bookRepo.save(book);
      }

    async findAllBooks(): Promise<Book[]> {
        return this.bookRepo.find();
    }

    async findOne(code: string): Promise<Book> {
        const book = await this.bookRepo.findOne({ where: { code } });
        if (!book) {
          throw new NotFoundException(`Book with code ${code} not found`);
        }
        return book;
      }
    
    async findAvailable(): Promise<Book[]> {
        return this.bookRepo.find({ where: { stock: 1 } });
    }

    async updateStock(code: string, stock: number): Promise<void> {
        await this.bookRepo.update({ code }, { stock });
    }
    

}
