'use client';

import { useState } from 'react';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) and overnight shipping options are also available at checkout.'
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a flat shipping fee of $5.99.'
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package in real-time.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we ship within the United States only. We\'re working on expanding our international shipping options soon.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy on all items. Products must be unused, in original packaging, and in the same condition you received them.'
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact our customer service team at support@tmistore.com with your order number. We\'ll provide you with a prepaid return label and instructions.'
      },
      {
        q: 'When will I receive my refund?',
        a: 'Refunds are processed within 5-7 business days after we receive your return. The refund will be credited to your original payment method.'
      },
      {
        q: 'Are there any items that cannot be returned?',
        a: 'Sale items, gift cards, and items marked as final sale are not eligible for returns. All other products can be returned within 30 days.'
      }
    ]
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.'
      },
      {
        q: 'Can I save my payment information for future purchases?',
        a: 'Yes, you can securely save your payment methods to your account for faster checkout on future orders.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'We currently don\'t offer payment plans, but we\'re exploring options like Afterpay and Klarna for future implementation.'
      }
    ]
  },
  {
    category: 'Products & Availability',
    questions: [
      {
        q: 'How do I know if an item is in stock?',
        a: 'All in-stock items will have an "Add to Cart" button. If an item is out of stock, you\'ll see an "Out of Stock" message instead.'
      },
      {
        q: 'Can I pre-order items that are out of stock?',
        a: 'Pre-orders are available for select items. If pre-order is available, you\'ll see a "Pre-Order" button on the product page.'
      },
      {
        q: 'Are product images accurate?',
        a: 'We strive to display accurate product images and descriptions. However, colors may vary slightly due to monitor settings.'
      },
      {
        q: 'Do you restock popular items?',
        a: 'Yes! We regularly restock our popular items. Sign up for email notifications on product pages to be notified when items are back in stock.'
      }
    ]
  },
  {
    category: 'Account & Privacy',
    questions: [
      {
        q: 'Do I need an account to make a purchase?',
        a: 'No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and view order history.'
      },
      {
        q: 'How do I reset my password?',
        a: 'Click on "Forgot Password" on the login page. You\'ll receive an email with instructions to reset your password.'
      },
      {
        q: 'Can I change my shipping address after placing an order?',
        a: 'If your order hasn\'t shipped yet, contact us immediately and we\'ll update the address. Once shipped, we cannot change the delivery address.'
      },
      {
        q: 'How is my personal information used?',
        a: 'We use your information solely to process orders and improve your shopping experience. Please review our Privacy Policy for complete details.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
          Find answers to common questions about orders, shipping, returns, and more.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((section, sectionIdx) => (
          <div key={sectionIdx} className="bg-white border border-gray-200 rounded-sm p-6">
            <h2 className="text-2xl font-light text-gray-900 mb-6">{section.category}</h2>
            <div className="space-y-4">
              {section.questions.map((faq, faqIdx) => {
                const itemId = `${sectionIdx}-${faqIdx}`;
                const isOpen = openItems.includes(itemId);
                
                return (
                  <div key={faqIdx} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full flex items-start justify-between text-left py-2 group"
                    >
                      <span className="font-medium text-gray-900 pr-4 group-hover:text-gray-600 transition-colors">
                        {faq.q}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-gray-600 font-light leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-sm p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-3">Still Have Questions?</h3>
        <p className="text-gray-600 font-light mb-6">
          Can't find the answer you're looking for? Our customer support team is here to help.
        </p>
        <a
          href="/contact"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-sm hover:bg-gray-800 transition-all duration-300 font-medium"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
