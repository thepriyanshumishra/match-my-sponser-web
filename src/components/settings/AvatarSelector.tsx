import React, { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { User, Sparkles, Bot, Smile, Zap } from 'lucide-react';

interface AvatarSelectorProps {
    currentAvatarUrl?: string;
    onSelect: (url: string) => void;
}

const CATEGORIES = [
    { id: 'adventurer', name: 'Adventurer', icon: Sparkles, style: 'adventurer' },
    { id: 'fun-emoji', name: 'Fun Emoji', icon: Smile, style: 'fun-emoji' },
    { id: 'bottts', name: 'Robots', icon: Bot, style: 'bottts' },
    { id: 'lorelei', name: 'Lorelei', icon: Zap, style: 'lorelei' },
];

const DEFAULT_AVATAR = "https://api.dicebear.com/9.x/initials/svg?seed=Guest&backgroundColor=e5e7eb&textColor=374151";

export function AvatarSelector({ currentAvatarUrl, onSelect }: AvatarSelectorProps) {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
    const [customSeed, setCustomSeed] = useState('');

    // Generate 20 seeds for the current category
    const seeds = Array.from({ length: 20 }, (_, i) => `${activeCategory}-${i}`);

    const getAvatarUrl = (style: string, seed: string) => {
        return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Choose an Avatar</h3>
                <button
                    type="button"
                    onClick={() => onSelect(DEFAULT_AVATAR)}
                    className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                >
                    <User size={16} />
                    Use Default Silhouette
                </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() => setActiveCategory(category.id)}
                            className={clsx(
                                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                                isActive
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            )}
                        >
                            <Icon size={16} />
                            {category.name}
                        </button>
                    );
                })}
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 max-h-64 overflow-y-auto p-2 scrollbar-thin">
                {seeds.map((seed) => {
                    const style = CATEGORIES.find(c => c.id === activeCategory)?.style || 'adventurer';
                    const url = getAvatarUrl(style, seed);
                    const isSelected = currentAvatarUrl === url;

                    return (
                        <button
                            key={seed}
                            type="button"
                            onClick={() => onSelect(url)}
                            className={clsx(
                                'relative aspect-square rounded-full overflow-hidden transition-all duration-200 hover:scale-110',
                                isSelected ? 'ring-4 ring-indigo-600 ring-offset-2' : 'hover:ring-2 hover:ring-indigo-300 ring-offset-1'
                            )}
                        >
                            <Image
                                src={url}
                                alt={`Avatar ${seed}`}
                                fill
                                className="object-cover bg-gray-50"
                            />
                        </button>
                    );
                })}
            </div>

            <p className="text-xs text-gray-500 text-center">
                Powered by <a href="https://dicebear.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">DiceBear</a>
            </p>
        </div>
    );
}
