import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { OrderItemModule } from 'src/orderItem/orderItem.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderItemModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
