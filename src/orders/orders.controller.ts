import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { NAST_SERVICE, ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderPaginationDto, PaginationDto } from 'src/common/dto';
import { CreateOrderDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(NAST_SERVICE) private readonly cliente: ClientProxy
    ) { }


    @Get()
    findAll(@Query() orderPaginationDto: OrderPaginationDto) {

        try {
            return this.cliente.send('findAllOrders', orderPaginationDto)
                .pipe(
                    catchError(err => { throw new RpcException(err) })
                )
        } catch (error) {
            throw new RpcException(error + 'error')
        }
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.cliente.send('createOrder', createOrderDto).pipe(
            catchError(err => { throw new RpcException(err) })
        );
    }

    @Get('id/:id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return this.cliente.send('findOneOrder', { id })
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

        return this.cliente.send('findAllOrders', {
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
        return this.cliente.send('changeOrderStatus', { id, ...statusDto })
            .pipe(
                catchError(err => { throw new RpcException(err) })
            )
    }


}
