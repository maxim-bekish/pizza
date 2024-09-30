import { ApiRouts } from './constants';
import { axiosInstance } from './instance';
import { Ingredient } from '@prisma/client';

export const getAll = async (): Promise<Ingredient[]> => {
	return (await axiosInstance.get<Ingredient[]>(ApiRouts.INGREDIENTS)).data;
};
