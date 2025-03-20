import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NAST_SERVICE, } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject(NAST_SERVICE) private readonly cliente: ClientProxy
    ) { }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.cliente.send({ cmd: 'create_products' }, createProductDto)
    }

    @Get()
    finAllProduct(@Query() paginationDto: PaginationDto) {

        //return paginationDto
        return this.cliente.send({ cmd: 'find_all' }, {})
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {

        return this.cliente.send({ cmd: 'find_one_product' }, { id })
            .pipe(
                catchError(err => { throw new RpcException(err) })
            )

        /*  try {

             const product = await firstValueFrom(
                 this.cliente.send({ cmd: 'find_one_product' }, { id })
             )

             return product

         } catch (error) {

             throw new RpcException(error)

         } */

    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.cliente.send({ cmd: 'delete_product' }, { id })
            .pipe(
                catchError(err => { throw new RpcException(err) })
            )
    }

    @Patch(':id')
    patchProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {

        //return { id, ...updateProductDto }
        return this.cliente.send({ cmd: 'update_product' }, { id, ...updateProductDto })
            .pipe(
                catchError(err => { throw new RpcException(err) })
            )

    }

}
