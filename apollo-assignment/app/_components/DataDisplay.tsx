"use client";
import { useState, useEffect } from "react";
import InfiniteList from "./InfiniteList";
import { CardSkeleton } from "./skeletons/CardSkeleton";
import { useGetProductsQuery } from "@/graphql/generated/graphql";

const DELETED_PRODUCTS_KEY = "deleted_products";
const PRODUCT_ORDER_KEY = "product_order";

export default function DataDisplay() {
    const { data, loading, error } = useGetProductsQuery({
        variables: { offset: 0, limit: 200 },
    });
    const [deletedProductIds, setDeletedProductIds] = useState<Set<number>>(new Set());
    const [productOrderArray, setProductOrderArray] = useState<number[]>([]);

    const products = data?.products || [];

    useEffect(() => {
        const storedDeleted = localStorage.getItem(DELETED_PRODUCTS_KEY);
        if (storedDeleted) {
            setDeletedProductIds(new Set(JSON.parse(storedDeleted)));
        }

        const storedOrder = localStorage.getItem(PRODUCT_ORDER_KEY);
        if (storedOrder) {
            setProductOrderArray(JSON.parse(storedOrder));
        }
    }, []);

    useEffect(() => {
        if (deletedProductIds.size > 0) {
            localStorage.setItem(DELETED_PRODUCTS_KEY, JSON.stringify(Array.from(deletedProductIds)));
        }
    }, [deletedProductIds]);

    useEffect(() => {
        if (productOrderArray.length > 0) {
            localStorage.setItem(PRODUCT_ORDER_KEY, JSON.stringify(productOrderArray));
        }
    }, [productOrderArray]);

    const handleRemoveProduct = (productId: number) => {
        setDeletedProductIds((prev) => new Set(prev).add(productId));
        setProductOrderArray((prev) => prev.filter((id) => id !== productId));
    };

    const handleUpdateOrder = (productId: number, newPosition: number) => {
        setProductOrderArray((prev) => {
            const visibleProducts = products.filter((p) => !deletedProductIds.has(p.id));

            let currentOrder = prev.length > 0 ? [...prev] : visibleProducts.map((p) => p.id);
            currentOrder = currentOrder.filter((id) => id !== productId);

            const insertIndex = Math.max(0, Math.min(newPosition - 1, currentOrder.length));
            currentOrder.splice(insertIndex, 0, productId);

            return currentOrder;
        });
    };

    useEffect(() => {
        if (products.length > 0) {
            const storedOrder = localStorage.getItem(PRODUCT_ORDER_KEY);
            if (!storedOrder) {
                const initialOrder = products.map((p) => p.id);
                setProductOrderArray(initialOrder);
            }
        }
    }, [products]);

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Error loading products</h2>
                    <p className="text-slate-600 dark:text-slate-400">{error.message}</p>
                </div>
            </div>
        );
    }

    if (loading && products.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="mb-10">
                        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-64 mb-2 animate-pulse"></div>
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
                    </div>
                    <CardSkeleton />
                </div>
            </div>
        );
    }

    const visibleProducts = products.filter((product) => !deletedProductIds.has(product.id));

    const sortedProducts = [...visibleProducts].sort((a, b) => {
        const indexA = productOrderArray.indexOf(a.id);
        const indexB = productOrderArray.indexOf(b.id);

        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
    });

    return <InfiniteList products={sortedProducts} loading={loading} onRemoveProduct={handleRemoveProduct} onUpdateOrder={handleUpdateOrder} />;
}
