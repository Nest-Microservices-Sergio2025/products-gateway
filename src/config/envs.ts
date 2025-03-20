
import 'dotenv/config'
import * as joi from 'joi'

interface EnvsVars {
    PORT: number

    NATS_SERVERS: string[]
    //DATABASE_URL: string

    //PRODUCTS_MICROSERVICE_HOST : string
    //PRODUCTS_MICROSERVICE_PORT : number
    //
    //ORDERS_MICROSERVICE_HOST: string
    //ORDERS_MICROSERVICE_PORT: number

}

const envSchema = joi.object<EnvsVars>({
    PORT: joi.number().default(3000),

    NATS_SERVERS: joi.array().items(joi.string()).required()

    //PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    //PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    //
    //ORDERS_MICROSERVICE_HOST: joi.string().required(),
    //ORDERS_MICROSERVICE_PORT: joi.number().required(),

}).unknown(true)

const { error, value: EnvsVars } = envSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
})

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const envs: EnvsVars = {
    PORT: EnvsVars.PORT,

    NATS_SERVERS: EnvsVars.NATS_SERVERS
    // PRODUCTS_MICROSERVICE_HOST: EnvsVars.PRODUCTS_MICROSERVICE_HOST,
    // PRODUCTS_MICROSERVICE_PORT: EnvsVars.PRODUCTS_MICROSERVICE_PORT,
    //
    // ORDERS_MICROSERVICE_HOST: EnvsVars.ORDERS_MICROSERVICE_HOST,
    // ORDERS_MICROSERVICE_PORT: EnvsVars.ORDERS_MICROSERVICE_PORT,


}
