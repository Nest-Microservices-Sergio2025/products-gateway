import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NAST_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
    controllers: [OrdersController],
    providers: [],
    imports: [NatsModule]

})
export class OrdersModule { }
