import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from 'src/auth/interfaces/user.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  role: Role;
}
