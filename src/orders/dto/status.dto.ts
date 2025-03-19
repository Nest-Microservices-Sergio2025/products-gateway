import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from 'src/common';
import { OrderStatusList } from "src/orders/enum/order.enum";
import { OrderStatus } from '../enum/order.enum';

export class StatusDto  {
    @IsOptional()
    @IsEnum(OrderStatusList,{
        message: `Valid status are ${OrderStatusList}`
    })
    status: OrderStatus;
}
