import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluations } from './evaluations.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 100})
  name: string;

  @Column({length: 30})
  email: string;

  @OneToMany(() => Evaluations, evaluation => evaluation.lesson) // Указание связи
  evaluations: Evaluations[];
}