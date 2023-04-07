import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { Order } from '../entity/order.entity';
import { OrderCreateDto } from '../dto/order-create.dto';
import { OrderUpdateDto } from '../dto/order-update.dto';
import { DeleteResult } from 'typeorm';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOneOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getOneOrderById(id);
  }

  @Post()
  createOrder(@Body() data: OrderCreateDto): Promise<Order> {
    return this.orderService.createOrder(data);
  }

  @Get('user/:userId')
  getOrderByUserPending(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Order> {
    return this.orderService.getOrderByUserPending(userId);
  }

  @Put(':id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: OrderUpdateDto,
  ): Promise<Order> {
    console.log('data', data);

    return this.orderService.updateOrder(id, data);
  }

  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.orderService.deleteOrder(id);
  }
}
