import { ApiRouts } from './constants';
import { axiosInstance } from './instance';
import { Product } from '@prisma/client';

export const search = async (query: string): Promise<Product[]> => {
	return (await axiosInstance.get<Product[]>(ApiRouts.SEARCH_PRODUCTS, { params: { query } })).data;
};
