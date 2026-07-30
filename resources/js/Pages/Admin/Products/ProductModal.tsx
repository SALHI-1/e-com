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
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Détails du Produit</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image section */}
                    <div className="w-full md:w-1/3">
                        {product.image_url ? (
                            <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full h-auto object-cover rounded-md border border-gray-200"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-md border border-gray-200">
                                <span className="text-gray-400">Aucune image</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Info section */}
                    <div className="w-full md:w-2/3 space-y-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                            <div className="text-sm text-gray-500 flex gap-2 mt-1">
                                <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">ID: {product.id}</span>
                                {product.category && (
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">{product.category.name}</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded border border-gray-100">
                                <span className="block text-xs text-gray-500 uppercase font-semibold">Prix</span>
                                <span className="text-lg font-bold text-gray-900">{product.price} dh</span>
                            </div>
                            <div className="bg-gray-50 p-3 rounded border border-gray-100">
                                <span className="block text-xs text-gray-500 uppercase font-semibold">Stock</span>
                                <span className={`text-lg font-bold ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                                    {product.stock}
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {product.brand && (
                                <div>
                                    <span className="font-semibold text-gray-700">Marque :</span> <span className="text-gray-600">{product.brand}</span>
                                </div>
                            )}
                            {product.volume && (
                                <div>
                                    <span className="font-semibold text-gray-700">Volume :</span> <span className="text-gray-600">{product.volume}</span>
                                </div>
                            )}
                            <div>
                                <span className="font-semibold text-gray-700">Nouveau :</span> 
                                <span className="ml-2 text-gray-600">{product.is_new ? 'Oui' : 'Non'}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Bestseller :</span> 
                                <span className="ml-2 text-gray-600">{product.is_bestseller ? 'Oui' : 'Non'}</span>
                            </div>
                        </div>

                        {product.description && (
                            <div>
                                <span className="block text-sm font-semibold text-gray-700 mb-1">Description :</span>
                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded whitespace-pre-wrap max-h-40 overflow-y-auto">
                                    {product.description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="au-btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-none"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </Modal>
    );
}
