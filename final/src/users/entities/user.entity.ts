import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { UserCreateInterface } from '../../interfaces/user-create.interface';

// UserCreateInterface -  template for creating a user

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreateInterface> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;
}
