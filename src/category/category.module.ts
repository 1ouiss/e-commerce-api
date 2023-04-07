import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { ProductModule } from 'src/product/product.module';
import { OrderItemModule } from 'src/orderItem/orderItem.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    ProductModule,
    OrderItemModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
