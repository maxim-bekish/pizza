import { Container, TopBar, Title, Filters, ProductCard } from '@/components/shared'
import { ProductsGroupList } from '@/components/shared/products-group-list'

export default function Home() {
	return (
		<>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />
			<Container className='pb-14 mt-10'>
				<div className='flex gap-[80px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList
								title='Пиццы'
								items={[
									{ id: 1, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 2, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 3, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 4, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 5, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 6, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 7, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
								]}
								categoryId={1}
							/>
							<ProductsGroupList
								title='Завтрак'
								items={[
									{ id: 1, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 2, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 3, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 4, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 5, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 6, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
									{ id: 7, name: 'Пицца', imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif', price: 500, items: [{ price: 550 }] },
								]}
								categoryId={1}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
