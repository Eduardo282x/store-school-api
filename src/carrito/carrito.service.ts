import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOCarrito } from 'src/dto/DTOCarrito';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CarritoService {

    constructor(private prismaService: PrismaService) {
    }

    async getCarrito() {
        return this.prismaService.carrito.findMany({
            include: {
                product: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    async createCarrito(carrito: DTOCarrito) {
        try {
            const findProduct = await this.prismaService.inventory.findFirst({
                where: {
                    productId: carrito.productId
                },
                include: {
                    product: true
                }
            })

            if(carrito.amount > findProduct.amount) {
                badResponse.message = 'No hay suficiente producto';
                return badResponse;
            }

            await this.prismaService.carrito.create({
                data: {
                    productId: carrito.productId,
                    amount: carrito.amount,
                    total: findProduct.product.total * carrito.amount,
                }
            });

            baseResponse.message = 'Carrito creado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async updateCarrito(carrito: DTOCarrito, id: number) {
        try {
            const findProduct = await this.prismaService.inventory.findFirst({
                where: {
                    productId: carrito.productId
                },
                include: {
                    product: true
                }
            })

            if(carrito.amount > findProduct.amount) {
                badResponse.message = 'No hay suficiente producto';
                return badResponse;
            }

            await this.prismaService.carrito.update({
                where: {
                    id
                },
                data: {
                    productId: carrito.productId,
                    amount: carrito.amount,
                    total: findProduct.product.total * carrito.amount,
                }
            });
            baseResponse.message = 'Carrito actualizado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async deleteCarrito(id: number) {
        try {
            await this.prismaService.carrito.delete({
                where: {
                    id
                }
            });
            baseResponse.message = 'Carrito eliminado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async clearCarrito() {
        try {
            await this.prismaService.carrito.deleteMany();
            baseResponse.message = 'Carrito limpiado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }
}
