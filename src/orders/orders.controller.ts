import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(ORDER_SERVICE) private readonly productsClient: ClientProxy
    ) { }


    @Get()
    findAll() {
        return this.productsClient.send('findAllOrders', {})
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.productsClient.send('createOrder', createOrderDto);
    }



    @Get(':id')
    findOne(@Param('id') id: string) {
    }


}
