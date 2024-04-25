import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { UserRoles } from './roles/entities/role-user.entity';
import { VinylsModule } from './vinyls/vinyls.module';
import { ReviewsModule } from './reviews/reviews.module';
import { Vinyl } from './vinyls/entities/vinyl.entity';
import { Review } from './reviews/entities/review.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_NAME'),
        models: [User, Role, UserRoles, Vinyl, Review],
        autoLoadModels: true,
      }),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    VinylsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
