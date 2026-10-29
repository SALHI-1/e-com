import Modal from '@/Components/Modal';

export default function ProductModal({
    product,
    show,
    onClose
}: {
    product: any;
    show: boolean;
    onClose: () => void;
}) {
    if (!product) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="p-4 sm:p-6 max-h-[88vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                    <h2 className="text-lg sm:text-xl font-bold text-[#0F204B]">Product Details</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                    {/* Image section */}
                    <div className="w-full md:w-1/3 shrink-0">
                        {product.image_url ? (
                            <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full max-h-60 sm:max-h-72 object-contain bg-gray-50 rounded-xl border border-gray-200"
                            />
                        ) : (
                            <div className="w-full h-44 sm:h-56 bg-gray-50 flex items-center justify-center rounded-xl border border-gray-200">
                                <span className="text-xs text-gray-400">No image available</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Info section */}
                    <div className="w-full md:w-2/3 space-y-3 sm:space-y-4">
                        <div>
                            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug">{product.name}</h3>
                            <div className="text-xs text-gray-500 flex flex-wrap gap-1.5 mt-1">
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-mono font-medium">ID: #{product.id}</span>
                                {product.category && (
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">{product.category.name}</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">Price</span>
                                <span className="text-base sm:text-lg font-bold text-gray-900">{product.price} dh</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="block text-[10px] text-gray-500 uppercase font-bold tracking-wider">Stock</span>
                                <span className={`text-base sm:text-lg font-bold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                                    {product.stock} {product.stock < 5 ? '(Low)' : ''}
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs sm:text-sm">
                            {product.brand && (
                                <div>
                                    <span className="font-semibold text-gray-500">Brand:</span>{' '}
                                    <span className="text-gray-800">{product.brand}</span>
                                </div>
                            )}
                            {product.volume && (
                                <div>
                                    <span className="font-semibold text-gray-500">Volume:</span>{' '}
                                    <span className="text-gray-800">{product.volume}</span>
                                </div>
                            )}
                            <div>
                                <span className="font-semibold text-gray-500">New Product:</span>{' '}
                                <span className="text-gray-800">{product.is_new ? 'Yes' : 'No'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-500">Best Seller:</span>{' '}
                                <span className="text-gray-800">{product.is_bestseller ? 'Yes' : 'No'}</span>
                            </div>
                        </div>

                        {product.description && (
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Description</span>
                                <div className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed border border-gray-100">
                                    {product.description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="mt-5 sm:mt-6 flex justify-end">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs sm:text-sm font-semibold transition-colors text-center"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
}

