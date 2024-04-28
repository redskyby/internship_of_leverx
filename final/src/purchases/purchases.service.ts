import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { User } from '../users/entities/user.entity';
import { Vinyl } from '../vinyls/entities/vinyl.entity';
import { InjectModel as InjectMongooseModel } from '@nestjs/mongoose';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { Model } from 'mongoose';
import { User as UserMongo } from './schemas/user.schema';
import { Purchase as PurchaseMongo } from './schemas/purchases.schema';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectSequelizeModel(User) private userRepository: typeof User,
    @InjectSequelizeModel(Vinyl) private vinylRepository: typeof Vinyl,
    @InjectMongooseModel(UserMongo.name) private userModel: Model<UserMongo>,
    @InjectMongooseModel(PurchaseMongo.name)
    private purchaseModel: Model<PurchaseMongo>,
  ) {}

  public async create(dto: CreatePurchaseDto) {
    const { email, vinylId, count } = dto;

    const candidate = await this.userRepository.findOne({ where: { email } });

    if (!candidate) {
      throw new NotFoundException('Нет такого пользователя.');
    }

    const vinyl = await this.vinylRepository.findOne({
      where: { id: vinylId },
    });

    if (!vinyl) {
      throw new NotFoundException('Нет такой пластинки.');
    }

    let mongoUser = await this.userModel.findOne({ email: email });

    if (!mongoUser) {
      mongoUser = await new this.userModel(candidate.dataValues);

      await mongoUser.save();
    }

    const checkPurchase = await this.purchaseModel.findOne({
      description: vinyl.dataValues.description,
    });

    if (checkPurchase) {
      throw new ForbiddenException('Такая покупка уже есть в вашей корзине.');
    }

    const newPurchase = await new this.purchaseModel({
      ...vinyl.dataValues,
      count: count,
      userId: candidate.dataValues.id,
    });

    await newPurchase.save();

    await this.userModel.updateOne(
      { id: candidate.dataValues.id },
      { $push: { purchases: newPurchase.id } },
    );

    return newPurchase;
  }

  public async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });

    return user;
  }

  public async findPurchaseById(id: number) {
    const purchase = await this.purchaseModel.findOne({ id: id });

    return purchase;
  }

  public async remove(id: number) {
    const newPurchase = await this.purchaseModel.findOne({ id: id });

    if (!newPurchase) {
      throw new NotFoundException('Такой покупки нет в вашей корзине.');
    }

    await this.userModel.updateOne(
      { id: newPurchase.userId },
      { $set: { purchases: [] } },
    );

    await this.purchaseModel.deleteOne({ id: id });

    return { message: 'Покупка успешна удалена' };
  }
}
