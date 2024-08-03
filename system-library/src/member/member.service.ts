import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  async createMember(memberData: Partial<Member>): Promise<Member> {
    const member = this.memberRepository.create(memberData);
    return this.memberRepository.save(member);
  }

  async updatePenalty(code: string, isPenalized: boolean, penaltyEndDate: Date): Promise<void> {
    await this.memberRepository.update({ code }, { isPenalized, penaltyEndDate });
  }

  async updateBorrowedBooks(code: string, borrowedBooks: number): Promise<void> {
    await this.memberRepository.update({ code }, { borrowedBooks });
  }

  async findByCode(code: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { code } });
  }
}