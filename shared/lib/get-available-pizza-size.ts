import { ProductItem } from '@prisma/client';
import { pizzaSizes, PizzaType } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

export const getAvailablePizzaSize = (type: PizzaType, items: ProductItem[]): Variant[] => {
	const filteredPizzasByType = items.filter(items => items.pizzaType === type);
	return pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value)),
	}));
};
