import { axiosInstance } from './instance';
import { CartDTO } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>('/cart')).data;
};

export const updateItemQuantity = async (ItemId: number, quantity: number): Promise<CartDTO> => {
	return (await axiosInstance.patch<CartDTO>('/cart/' + ItemId, { quantity })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
};
