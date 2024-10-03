import { prisma } from '@/prisma/prisma-client';
/**
 * найдет или создаст корзину
 * @async
 * @param {string} token
 * @returns  вернет корзину
 */
export const findOrCreateCart = async (token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				token,
			},
		});
	}
	return userCart;
};
