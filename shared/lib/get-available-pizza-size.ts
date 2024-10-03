import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

/**
 * Given a type of pizza and an array of products, this function returns an array of Variants
 * that represent the available pizza sizes for that type of pizza.
 *
 * @param type - type of pizza (e.g. 1 for traditional pizza, 2 for thin pizza)
 * @param items - array of products
 * @returns - array of Variants
 */
export const getAvailablePizzaSize = (type: PizzaType, items: ProductItem[]): Variant[] => {
	const filteredPizzasByType = items.filter(items => items.pizzaType === type);
	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
	}));
};
