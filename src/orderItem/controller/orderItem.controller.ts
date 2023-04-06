import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrderItemService } from '../service/orderItem.service';
import { OrderItem } from '../entity/orderItem.entity';
import { OrderItemCreateDto } from '../dto/orderItem-create.dto';

@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  getAllOrderItems(): Promise<OrderItem[]> {
    return this.orderItemService.getAllOrderItems();
  }

  @Get(':id')
  getOneOrderItemById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderItem> {
    return this.orderItemService.getOneOrderItemById(id);
  }

  @Get('order/:id')
  getOrderItemsByOrderId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OrderItem[]> {
    return this.orderItemService.getOrderItemsByOrderId(id);
  }

  @Post()
  createOrderItem(@Body() data: OrderItemCreateDto): Promise<OrderItem> {
    return this.orderItemService.createOrderItem(data);
  }
}
