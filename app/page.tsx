import Link from 'next/link';
import { getAllProducts, getAllCategories } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);
  
  // Get featured products (first 8 products)
  const featuredProducts = products.slice(0, 8);
  
  return (
    <div className="animate-fade-in">
      {/* Hero Section - Allbirds Style with Background Image */}
      <section className="relative bg-gray-50 py-20 md:py-32 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-gray-50" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-4 animate-fade-in">New Arrivals</p>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Simple, Sustainable Style
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Discover thoughtfully designed products made with natural materials for everyday comfort
            </p>
            
            {/* Search Bar */}
            <div className="mb-10 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <SearchBar products={products} variant="hero" />
            </div>
            
            <div className="flex justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Link
                href="/products"
                className="inline-block bg-gray-900 text-white font-medium px-10 py-4 rounded-sm hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Shop All
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section - Allbirds Style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16 text-gray-900">Shop by Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group relative overflow-hidden rounded-sm bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 animate-scale-in"
                style={{animationDelay: `${categories.indexOf(category) * 0.1}s`}}
              >
                <div className="aspect-square flex flex-col items-center justify-center p-8">
                  <div className="mb-4 text-gray-600 group-hover:text-gray-900 transition-all duration-300 group-hover:scale-110">
                    {category === 'electronics' && (
                      <span className="text-5xl">📱</span>
                    )}
                    {category === 'jewelery' && (
                      <span className="text-5xl">💎</span>
                    )}
                    {category === "men's clothing" && (
                      <span className="text-5xl">👔</span>
                    )}
                    {category === "women's clothing" && (
                      <span className="text-5xl">👗</span>
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 capitalize text-center">
                    {category === 'jewelery' ? 'jewelry' : category}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section - Allbirds Style */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">New Arrivals</h2>
            <Link
              href="/products"
              className="text-gray-900 hover:text-gray-600 font-light flex items-center group transition-all duration-300"
            >
              View All
              <svg
                className="w-5 h-5 ml-1 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} trending={index < 4} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section - Allbirds Sustainability Focus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">Our Approach</h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Every product is thoughtfully designed with sustainability and comfort in mind
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Sustainable Materials</h3>
              <p className="text-gray-600 font-light leading-relaxed">We use natural, renewable materials wherever possible to reduce environmental impact</p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Comfort First</h3>
              <p className="text-gray-600 font-light leading-relaxed">Designed for all-day wear with materials that breathe and adapt to your day</p>
            </div>
            
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-6">
                <svg className="w-12 h-12 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3 text-gray-900">Transparency</h3>
              <p className="text-gray-600 font-light leading-relaxed">From materials to manufacturing, we're committed to doing things the right way</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
