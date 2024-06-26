import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { UserRoles } from './entities/role-user.entity';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, UserRoles, User]), AuthModule],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
