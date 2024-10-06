'use server';

import { prisma } from '@/prisma/prisma-client';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import { CheckoutFormValues } from '@/shared/constants';
import { createPayment, sendEmail } from '@/shared/lib';
import { getUserSession } from '@/shared/lib/get-user-session';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
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

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) throw new Error('Пользователь не найден');

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		});

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
			},
		});
	} catch (error) {
		console.error('Error [UPDATE_USER] ', error);
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		});

		if (user) {
			if (!user.verified) throw new Error('Почта не подтверждена');

			throw new Error('Пользователь уже существует');
		}

		const createUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		});

		const code = Math.floor(100000 + Math.random() * 900000).toString();

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createUser.id,
			},
		});

		await sendEmail(
			createUser.email,
			`Next Pizza / Подтверждение регистрации`,
			VerificationUserTemplate({
				code,
			})
		);
	} catch (error) {
		console.error('Error [CREATE_USER] ', error);
	}
}
