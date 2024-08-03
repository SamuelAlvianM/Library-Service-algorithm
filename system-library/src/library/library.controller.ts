import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LibraryService } from './library.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('library')
@Controller('library')
export class LibraryController {
    constructor(private Library_service: LibraryService) {}

    @Post('borrow')
    @ApiOperation( { summary: 'Borrow a book'})
    @ApiBody ({
        schema: {
            properties: {
                memberId: { type: 'string'},
                bookCode: { type: 'string'},
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    async borrowBook(
        @Body('bookCode') bookCode: string,
        @Body('memberCode') memberCode: string,
    ) {
        const result = await this.Library_service.borrowBook(bookCode, memberCode);

        return {
            StatusCode: HttpStatus.OK,
            Message: 'Book borrowed successfully',
            Data: result,
        }
    }

    @Post('return')
    @ApiOperation( { summary: 'return a book' })
    @ApiBody ({
        schema: {
            properties: {
                memberCode: { type: 'string'},
                bookCode: { type: 'string'},
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    async returnBook(
        @Body('bookCode') bookCode: string,
        @Body('memberCode') memberCode: string,
    ) {
        const result = await this.Library_service.returnBook(bookCode, memberCode);

        return {
            StatusCode: HttpStatus.OK,
            Message: 'Book returned successfully',
            Data: result,
        }
    }

}
