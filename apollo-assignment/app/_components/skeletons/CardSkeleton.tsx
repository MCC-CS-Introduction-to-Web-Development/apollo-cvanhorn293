export const CardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="flex flex-col bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
                    {/* Image Skeleton */}
                    <div className="h-56 bg-slate-200 dark:bg-slate-700"></div>

                    {/* Content Skeleton */}
                    <div className="flex flex-col flex-grow p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            {/* Title Skeleton */}
                            <div className="flex-1 space-y-2">
                                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                            </div>
                            {/* Price Skeleton */}
                            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                        </div>
                        {/* Description Skeleton */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                        </div>
                        {/* Button Skeleton */}
                        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded mt-auto"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
