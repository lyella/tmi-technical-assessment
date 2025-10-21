'use client';

import { useState } from 'react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

interface ReviewSectionProps {
  productId: number;
}

const mockReviews: { [key: number | string]: Review[] } = {
  1: [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2024-10-15",
      title: "Absolutely love it!",
      content: "The quality exceeded my expectations. Fits perfectly and looks exactly like the pictures. Will definitely order again!",
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      author: "Michael R.",
      rating: 4,
      date: "2024-10-10",
      title: "Great product",
      content: "Very satisfied with this purchase. Good value for money. Only minor issue was shipping took a bit longer than expected.",
      helpful: 12,
      verified: true
    },
    {
      id: 3,
      author: "Jessica L.",
      rating: 5,
      date: "2024-10-05",
      title: "Highly recommend!",
      content: "This is my third purchase from this store and I'm never disappointed. Quality is consistent and customer service is excellent.",
      helpful: 18,
      verified: true
    }
  ],
  default: [
    {
      id: 1,
      author: "Alex T.",
      rating: 5,
      date: "2024-10-18",
      title: "Perfect!",
      content: "Exactly what I was looking for. Great quality and fast shipping. Would definitely recommend to friends and family.",
      helpful: 15,
      verified: true
    },
    {
      id: 2,
      author: "Emma W.",
      rating: 4,
      date: "2024-10-12",
      title: "Very pleased",
      content: "Good product overall. The quality is solid and it arrived well-packaged. One star off because it's slightly smaller than expected.",
      helpful: 8,
      verified: true
    }
  ]
};

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const reviews = mockReviews[productId] || mockReviews.default;
  const [helpfulClicks, setHelpfulClicks] = useState<{ [key: number]: boolean }>({});

  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / totalReviews) * 100
  }));

  const handleHelpful = (reviewId: number) => {
    setHelpfulClicks((prev: { [key: number]: boolean }) => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12 border-t pt-12">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{averageRating}</div>
            {renderStars(Math.round(parseFloat(averageRating)), 'lg')}
            <div className="text-sm text-gray-600 mt-2">{totalReviews} reviews</div>
          </div>
          
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm font-medium w-8">{star} ★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <p className="text-gray-600">Share your thoughts with other customers</p>
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Write a Review
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold">{review.author}</span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {renderStars(review.rating, 'sm')}
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            <h3 className="font-semibold mb-2">{review.title}</h3>
            <p className="text-gray-700 mb-4">{review.content}</p>

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => handleHelpful(review.id)}
                className={`flex items-center gap-2 ${
                  helpfulClicks[review.id] ? 'text-blue-600' : 'text-gray-600'
                } hover:text-blue-600 transition-colors`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Helpful ({review.helpful + (helpfulClicks[review.id] ? 1 : 0)})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
