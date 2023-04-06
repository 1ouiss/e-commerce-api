import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/orderItem.entity';
import { OrderItemController } from './controller/orderItem.controller';
import { OrderItemService } from './service/orderItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
})
export class OrderItemModule {}
