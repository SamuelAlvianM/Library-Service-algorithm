import { BadRequestException, Injectable } from '@nestjs/common';
import { BookService } from '../book/book.service';
import { MemberService } from '../member/member.service';
import {Book} from '../book/book.entity';

@Injectable()
export class LibraryService {

    constructor ( 
        private books: BookService,
        private members: MemberService,
    ) {}

    async borrowBook( bookCode: string, memberCode: string ): Promise<void> {
        const book = await this.books.findAvailable().then(books => books.find(b => b.code === bookCode));
        const member = await this.members.findByCode(memberCode);

        if (!member) {
            throw new BadRequestException(`Member ${memberCode} not found`);
        }

        if (!book) {
            throw new BadRequestException(`Book ${bookCode} not found`);
        }

        if (member.isPenalized) {
            throw new BadRequestException('member is PENALIZED');
        }

        if (member.borrowedBooks  >= 2 ) { 
            throw new BadRequestException('member has too many books borrowed, max borrow is 2');
        }

        await this.books.updateStock(book.code, 0);

        await this.members.updateBorrowedBooks(book.code, member.borrowedBooks + 1);
    }



    async returnBook( bookCode: string, memberCode: string ): Promise<void> {
        const book = await this.books.findAvailable().then(books => books.find(b => b.code === bookCode));
        const member = await this.members.findByCode(memberCode);

        if (!member) {
            throw new BadRequestException(`Member ${memberCode} not found`);
        }

        if (!book) {
            throw new BadRequestException(`Book ${bookCode} not found`);
        }

        if (member.borrowedBooks <= 0) {
            throw new BadRequestException('member has no books borrowed');
        }


        const borrowDate = new Date();
        const currentDate = new Date();
        const calculatedTime = Math.abs(currentDate.getTime() - borrowDate.getTime());
        const calculatedDays = Math.ceil(calculatedTime / (1000 * 3600 * 24));

        if ( calculatedDays > 7) {
            const penalty = new Date();
            penalty.setDate(currentDate.getDate() + (calculatedDays - 7));

            await this.members.updatePenalty(member.code, true, penalty);

        }


        await this.books.updateStock(book.code, 1);

        await this.members.updateBorrowedBooks(book.code, member.borrowedBooks - 1);
    }
}
