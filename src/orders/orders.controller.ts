import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDto, PaginationDto } from 'src/common/dto';
import { CreateOrderDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(ORDER_SERVICE) private readonly productsClient: ClientProxy
    ) { }


    @Get()
    findAll(@Query() orderPaginationDto: OrderPaginationDto) {
        //return orderPaginationDto;
        return this.productsClient.send('findAllOrders', orderPaginationDto)
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.productsClient.send('createOrder', createOrderDto).pipe(
            catchError(err => { throw new RpcException(err) })
        );
    }

    @Get('id/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return this.productsClient.send('findOneOrder', { id })
                .pipe(
                    catchError(err => { throw new RpcException(err) })
                )
        } catch (error) {
            throw new RpcException(error + 'error')
        }

    }

    @Get(':status')
    findAllByStatus(
        @Param() statusDto: StatusDto,
        @Query() paginationDto: PaginationDto
    ) {

        return this.productsClient.send('findAllOrders', {
            ...statusDto,
            ...paginationDto
        }).pipe(
            catchError(err => { throw new RpcException(err) })
        )
    }

    @Patch(':id')
    changeStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() statusDto: StatusDto
    ) {
        /* return {
            id,
            ...statusDto
        } */
        return this.productsClient.send('changeOrderStatus', { id, ...statusDto })
            .pipe(
                catchError(err => { throw new RpcException(err) })
            )
    }


}
