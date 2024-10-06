import { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '',
			clientSecret: process.env.GITHUB_SECRET || '',
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: 'USER' as UserRole,
				};
			},
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) return null;

				const values = {
					email: credentials.email,
				};

				const findUser = await prisma.user.findFirst({
					where: values,
				});

				if (!findUser) return null;

				const isPasswordValid = await compare(credentials.password, findUser.password);

				if (!isPasswordValid) return null;

				if (!findUser.verified) return null;

				return {
					id: findUser.id,
					email: findUser.email,
					name: findUser.fullName,
					role: findUser.role,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
        console.log('signIn', user);
        console.log('signIn', account);
				// Если пользователь пытается авторизоваться с помощью  логина и пароля  то мы его авторизуем
				if (account?.provider === 'credentials') return true;

				// Если нет email, то мы не можем авторизовать пользователя
				if (!user.email) return false;

				const findUser = await prisma.user.findFirst({
					where: {
						OR: [
							// Если пользователь уже авторизован ранее, то
							// мы его находим по провайдеру Id
							{ provider: account?.provider, providerId: account?.providerAccountId },
							{ email: user.email },
						],
					},
				});

				// Если пользователь найден, то мы его авторизуем
				if (findUser) {
					await prisma.user.update({
						where: {
							id: findUser.id,
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId,
						},
					});

					return true;
				}

				await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || 'User #' + user.id,
						password: hashSync(user.id.toString(), 10),
						verified: new Date(),
						provider: account?.provider,
						providerId: account?.providerAccountId,
					},
				});

				return true;
			} catch (error) {
				console.error('Error [SIGNIN]', error);
				return false;
			}
		},

		async jwt({ token }) {

      console.log('jwt', token);

			if (!token.email) return token;

			const findUser = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (findUser) {
				token.id = String(findUser.id);
				token.email = findUser.email;
				token.fullName = findUser.fullName;
				token.role = findUser.role;
			}

			return token;
		},
		session({ session, token }) {
      console.log('session', session);
      console.log('session', token);

			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}
			return session;
		},
	},
};
