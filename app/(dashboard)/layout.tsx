import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Pizza | modal',
  description: 'Вкуснее уже некуда',
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
