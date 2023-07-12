import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Question {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  text: string;

  @Column()
  type: string;

  @Column('jsonb', { nullable: true })
  options: string[];

  @Column('jsonb', { nullable: true })
  tags: string[];
}
