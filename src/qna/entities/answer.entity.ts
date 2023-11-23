import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 800 })
  content: string;

  // 상대 테이블에 FK칼럼이 존재
  @OneToOne(() => Question)
  @JoinColumn()
  question: Question;
}
