import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lessons } from './lessons.entity';
import { Users } from './users.entity';

@Entity()
export class Evaluations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '0'})
  score: number;

  @ManyToOne(() => Lessons, lesson => lesson.evaluations) // Указание связи
  @JoinColumn({ name: 'lessonId' }) // Название столбца с внешним ключом
  lesson: Lessons;

  @ManyToOne(() => Users, user => user.evaluations) // Указание связи
  @JoinColumn({ name: 'userId' }) // Название столбца с внешним ключом
  user: Users;

  @Column()
  createdAt: Date;
}