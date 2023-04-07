import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';
import { OrderItemModule } from 'src/orderItem/orderItem.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), OrderItemModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
