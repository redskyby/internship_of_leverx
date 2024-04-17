import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { UserCreate } from './user-create';

// UserCreate - шаблон для создания пользователя

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreate> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  name: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  lastName: string;

  @Column({ type: DataTypes.STRING, allowNull: false })
  password: string;

  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  email: string;
}
