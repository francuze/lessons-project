import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluations } from './evaluations.entity';

@Entity()
export class Lessons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 20})
  code: string;

  @OneToMany(() => Evaluations, evaluation => evaluation.lesson) // Указание связи
  evaluations: Evaluations[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Используем CURRENT_TIMESTAMP по умолчанию
  createdAt: Date;
}