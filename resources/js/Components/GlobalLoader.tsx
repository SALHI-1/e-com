import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function GlobalLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const removeStart = router.on('start', () => setLoading(true));
        const removeFinish = router.on('finish', () => setLoading(false));

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm transition-opacity duration-300">
            <div className="relative flex items-center justify-center">
                {/* Modern double spinner */}
                <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="w-12 h-12 border-4 border-gray-200 border-b-blue-400 rounded-full animate-spin absolute right-2 top-2" style={{ animationDirection: 'reverse' }}></div>
            </div>
        </div>
    );
}
