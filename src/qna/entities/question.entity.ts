import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToOne(() => Answer, (answer) => answer.question)
  answer: Answer;
}
