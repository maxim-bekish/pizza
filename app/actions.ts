'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate } from '@/shared/components';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies();
		const cartToken = cookieStore.get('cartToken')?.value;

		if (!cartToken) {
			throw new Error('Cart token not found');
		}
		/* находим корзину для токена */
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		});

		/* если корзина не найдены вызываем ошибку */
		if (!userCart) {
			throw new Error('Cart not found');
		}

		/* если корзина пустая вызываем ошибку */
		if (userCart.totalAmount === 0) {
			throw new Error('Cart is empty');
		}

		/* создаем заказ */
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		});

		/* очищаем  корзину */
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		});

		/* очищаем  список товара из корзины */
		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		});

    /* создаем платеж */
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: `Оплата заказа #${order.id}`,
		});

    /* если платеж не создался вызываем ошибку */
		if (!paymentData) {
			throw new Error('Payment data not found');
		}

    /* обновляем статус заказа */
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		});

		const paymentUrl = paymentData.confirmation.confirmation_url;

    /* отправляем письмо */
		await sendEmail(
			data.email,
			`Next Pizza / оплатите заказ #${order.id}`,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl,
			})
		);

    /* возвращаем ссылку на оплату */
		return paymentUrl;
	} catch (error) {
		console.log('[CreateOrder] Server error ', error);
	}
}
