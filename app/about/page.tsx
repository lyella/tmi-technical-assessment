export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">About TMI Store</h1>
      
      <div className="space-y-8 text-gray-600 font-light leading-relaxed">
        <section>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2020, TMI Store began with a simple mission: to provide quality products with exceptional customer service. What started as a small online shop has grown into a trusted destination for thousands of customers worldwide.
          </p>
          <p>
            We believe in the power of thoughtful design and sustainable practices. Every product in our collection is carefully curated to meet our high standards of quality, functionality, and style.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality First</h3>
              <p>We never compromise on quality. Each product is tested and verified to meet our rigorous standards.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Focused</h3>
              <p>Your satisfaction is our priority. We're here to ensure you have the best shopping experience possible.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sustainability</h3>
              <p>We're committed to reducing our environmental impact through responsible sourcing and packaging.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Innovation</h3>
              <p>We continuously evolve to bring you the latest products and shopping technologies.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Why Choose Us</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Wide selection of quality products across multiple categories</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Fast and reliable shipping with tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>30-day hassle-free returns on all orders</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Secure payment processing and data protection</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-gray-900 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>Responsive customer support team ready to help</span>
            </li>
          </ul>
        </section>

        <section className="bg-gray-900 text-white p-8 rounded-sm -mx-4 sm:mx-0">
          <h2 className="text-2xl font-medium mb-4">Join Our Community</h2>
          <p className="mb-6">
            Be part of our growing community of satisfied customers. Follow us on social media for exclusive deals, new arrivals, and style inspiration.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Facebook</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Instagram</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Twitter</a>
          </div>
        </section>
      </div>
    </div>
  );
}
