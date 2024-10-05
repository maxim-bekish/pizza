import { z } from 'zod';

export const passwordSchema = z.string().min(3, 'Пароль должен содержать не менее 3 символов');

export const formLoginSchema = z.object({
	email: z.string().email('Введите корректную почту'),
	password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, 'Введите имя и фамилию'),
			phone: z.string().min(2, 'Введите телефон'),
			confirmPassword: passwordSchema,
		})
	)
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
