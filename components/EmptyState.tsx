interface EmptyStateProps {
  title: string;
  message: string;
  icon?: 'cart' | 'search' | 'products';
  action?: {
    label: string;
    href: string;
  };
}

export default function EmptyState({ title, message, icon = 'products', action }: EmptyStateProps) {
  const getIcon = () => {
    switch (icon) {
      case 'cart':
        return (
          <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12 px-4 text-center animate-fade-in">
      {getIcon()}
      <h3 className="mt-6 text-2xl font-light text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 font-light max-w-md">{message}</p>
      {action && (
        <a
          href={action.href}
          className="mt-6 inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-sm hover:bg-gray-800 transition-colors"
        >
          {action.label}
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  );
}
