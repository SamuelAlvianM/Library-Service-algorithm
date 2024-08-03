import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ unique: true})
        code: string;

    @Column()
        name: string;

    @Column( {default: 0})
        borrowedBooks: number;

    @Column ({ default: false})
        isPenalized: boolean;

    @Column({ type: 'timestamp', nullable: true})
        penaltyEndDate: Date;


}