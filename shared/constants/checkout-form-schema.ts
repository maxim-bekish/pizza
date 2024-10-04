import { z } from 'zod';
export const checkoutFormSchema = z.object({
	firstName: z.string().min(2, { message: 'Имя должно содержать не менее двух букв' }),
	lastName: z.string().min(2, { message: 'Фамилия должно содержать не менее двух букв' }),
	email: z.string().email({ message: 'Введите корректную почту' }),
	phone: z.string().min(10, { message: 'Введите корректный телефон' }),
	address: z.string().min(5, { message: 'Введите корректный адрес' }),
	comment: z.string().optional(),
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;