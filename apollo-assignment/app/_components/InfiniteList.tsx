"use client";
import { useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        slug: string;
        image: string;
        creationAt: string;
        updatedAt: string;
    };
    images: string[];
}

interface InfiniteListProps {
    products: Product[];
    loading: boolean;
    onRemoveProduct: (productId: number) => void;
    onUpdateOrder: (productId: number, order: number) => void;
}

export default function InfiniteList({ products, onRemoveProduct, onUpdateOrder }: InfiniteListProps) {
    const [orderInputs, setOrderInputs] = useState<Map<number, string>>(new Map());

    const handleOrderChange = (productId: number, value: string) => {
        setOrderInputs((prev) => {
            const newInputs = new Map(prev);
            newInputs.set(productId, value);
            return newInputs;
        });
    };

    const handleOrderSubmit = (productId: number) => {
        const value = orderInputs.get(productId);
        if (value) {
            const orderValue = parseInt(value);
            if (!isNaN(orderValue) && orderValue > 0) {
                onUpdateOrder(productId, orderValue);
                setOrderInputs((prev) => {
                    const newInputs = new Map(prev);
                    newInputs.delete(productId);
                    return newInputs;
                });
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent, productId: number) => {
        if (e.key === "Enter") {
            handleOrderSubmit(productId);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Products of doom ({products.length})</h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage, reorder, and delete products that persist across page refreshes</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products.map((product, index) => {
                        const currentPosition = index + 1;
                        const displayValue = orderInputs.get(product.id) ?? currentPosition;

                        return (
                            <div key={product.id} className="flex flex-col bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="relative h-56 bg-slate-100 dark:bg-slate-950">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://placehold.net/600x600.png";
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 bg-white dark:bg-slate-800 text-xs font-medium rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">{product.category.name}</span>
                                    </div>
                                    <button onClick={() => onRemoveProduct(product.id)} className="absolute top-3 left-3 p-2 bg-red-500 hover:bg-red-600 hover:scale-110 text-white rounded-full shadow-lg transition-all duration-200" title="Remove product" aria-label="Remove product">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-col flex-1 p-4">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 flex-1">{product.title}</h3>
                                        <span className="text-lg font-bold text-slate-900 dark:text-white whitespace-nowrap">${product.price}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">{product.description}</p>

                                    <div className="mt-auto space-y-3">
                                        <div>
                                            <label htmlFor={`order-${product.id}`} className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                                                Display Order (Current: {currentPosition})
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    id={`order-${product.id}`}
                                                    type="number"
                                                    min="1"
                                                    value={displayValue}
                                                    onChange={(e) => handleOrderChange(product.id, e.target.value)}
                                                    onKeyPress={(e) => handleKeyPress(e, product.id)}
                                                    placeholder={`Current: ${currentPosition}`}
                                                    className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
                                                />
                                                <button onClick={() => handleOrderSubmit(product.id)} className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors" title="Apply new order">
                                                    Set
                                                </button>
                                            </div>
                                        </div>

                                        <button className="w-full py-2 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">View Details</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 dark:text-slate-400">No products available. Try refreshing or removing filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
