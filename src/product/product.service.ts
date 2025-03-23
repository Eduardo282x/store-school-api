import { Injectable } from '@nestjs/common';
import { badResponse, baseResponse } from 'src/dto/DTOBase';
import { DTOProducts } from 'src/dto/DTOProducts';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {

    constructor(private prismaService: PrismaService) {
    }

    async getProducts() {
        return this.prismaService.products.findMany();
    }

    async createProducts(product: DTOProducts) {
        try {
            await this.prismaService.products.create({
                data: {
                    product: product.product,
                    amount: product.amount,
                    tax: product.tax,
                    price: product.price,
                    total: (product.price / product.amount) * (1 + product.tax / 100)
                }
            });
            baseResponse.message = 'Producto creado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async updateProducts(product: DTOProducts, id: number) {
        try {
            await this.prismaService.products.update({
                where: {
                    id
                },
                data: {
                    product: product.product,
                    amount: product.amount,
                    tax: product.tax,
                    price: product.price,
                    total: (product.price / product.amount) * (1 + product.tax / 100)
                }
            });
            baseResponse.message = 'Producto actualizado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }

    async deleteProducts(id: number) {
        try {
            await this.prismaService.products.delete({
                where: {
                    id
                }
            });
            baseResponse.message = 'Producto eliminado';
            return baseResponse;
        } catch (error) {
            badResponse.message = error.message;
            return badResponse;
        }
    }
}
