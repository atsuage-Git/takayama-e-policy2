import React, { useState } from 'react';
import { GuidebookPage } from '../types';
import { CATEGORIES } from '../data/guidebookData';
import { 
  Bookmark, 
  Eye, 
  ArrowUpRight, 
  Sparkles, 
  Phone, 
  Filter
} from 'lucide-react';

interface GridViewerProps {
  pages: GuidebookPage[];
  onSelectPage: (index: number) => void;
  customImages: Record<number, string>;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (page: GuidebookPage) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const GridViewer: React.FC<GridViewerProps> = ({
  pages,
  onSelectPage,
  customImages,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  selectedCategory,
  setSelectedCategory
}) => {
  const [filterAudience, setFilterAudience] = useState<string>('all');

  const filteredPages = pages.filter((page) => {
    const matchCategory = selectedCategory === 'all' || page.category === selectedCategory;
    const matchAudience = filterAudience === 'all' || page.targetAudience.some(a => a.includes(filterAudience));
    return matchCategory && matchAudience;
  });

  return (
    <div className="flex-1 bg-[#FDFBF7] p-4 md:p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Filter and Controls Bar */}
        <div className="bg-[#FAF8F3] rounded-2xl p-4 shadow-xs border border-[#E5E2DA] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
            <span className="text-xs font-serif font-bold text-[#8C8A7D] mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#5A5A40]" /> 分類:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? 'bg-[#5A5A40] text-[#FDFBF7] border-[#5A5A40] shadow-2xs font-semibold'
                    : 'bg-[#FDFBF7] text-[#706E64] hover:bg-[#EEECE4] border-[#E5E2DA]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Target Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-serif font-bold text-[#8C8A7D] whitespace-nowrap">対象者別:</span>
            <select
              value={filterAudience}
              onChange={(e) => setFilterAudience(e.target.value)}
              className="bg-[#FDFBF7] border border-[#E5E2DA] rounded-full px-3 py-1.5 text-xs text-[#43423E] focus:outline-none focus:border-[#5A5A40] shadow-2xs"
            >
              <option value="all">すべての対象者</option>
              <option value="企業">市内企業向け</option>
              <option value="学生">学生・若者向け</option>
              <option value="若手">若手社員・求職者向け</option>
              <option value="創業">新規創業者・第2創業</option>
              <option value="市外">市外進出・サテライト</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-[#8C8A7D] px-1">
          <span className="font-serif italic">表示中: <strong className="text-[#2C2C28]">{filteredPages.length}</strong> 件の制度 / 取り組み</span>
          <span className="font-mono text-[11px] text-[#A8A598]">ファイル番号昇順（001 〜 709）</span>
        </div>

        {/* Grid of 20 Pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPages.map((page) => {
            const originalIndex = pages.findIndex(p => p.id === page.id);
            const hasCustomImage = !!customImages[page.id];

            return (
              <div
                key={page.id}
                className="bg-[#FAF8F3] rounded-2xl border border-[#E5E2DA] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-[#5A5A40]"
              >
                {/* Card Header Top */}
                <div 
                  className="px-4 py-2.5 text-[#FDFBF7] flex items-center justify-between"
                  style={{ backgroundColor: page.themeColor.primary }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-black/15 px-2 py-0.5 rounded-full">
                      NO.{page.fileNumber}
                    </span>
                    <span className="text-[11px] font-serif italic tracking-wider text-[#FDFBF7]/90">
                      P.{page.id}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(page.id);
                    }}
                    className={`p-1 rounded-full hover:bg-black/10 transition-colors ${
                      isFavorite(page.id) ? 'text-[#BC6C25]' : 'text-[#FDFBF7]/80'
                    }`}
                    title="しおりに保存"
                  >
                    <Bookmark className={`w-4 h-4 ${isFavorite(page.id) ? 'fill-[#BC6C25]' : ''}`} />
                  </button>
                </div>

                {/* Card Image Thumbnail or Graphic */}
                <div 
                  onClick={() => onSelectPage(originalIndex)}
                  className="relative aspect-[16/10] bg-[#FDFBF7] cursor-pointer overflow-hidden border-b border-[#E5E2DA] group-hover:opacity-95"
                >
                  {hasCustomImage ? (
                    <img 
                      src={customImages[page.id]} 
                      alt={page.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full p-4 flex flex-col justify-between bg-[#FDFBF7]">
                      <div className="flex items-start justify-between">
                        <span 
                          className="text-[10px] font-medium px-2.5 py-0.5 rounded-full border border-[#E5E2DA] bg-[#FAF8F3] text-[#706E64]"
                        >
                          {page.categoryLabel}
                        </span>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-[#2C2C28] text-sm leading-snug line-clamp-2">
                          {page.title}
                        </div>
                        <p className="text-[11px] font-serif italic text-[#706E64] mt-1 line-clamp-1">
                          {page.subtitle}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-[#2C2C28]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3.5 py-1.5 bg-[#FDFBF7] text-[#43423E] text-xs font-serif font-bold rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#5A5A40]" /> スライドで開く
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-[#2C2C28] text-sm leading-snug hover:text-[#BC6C25] cursor-pointer"
                        onClick={() => onSelectPage(originalIndex)}>
                      {page.title}
                    </h3>
                    <p className="text-xs text-[#5A5852] mt-1.5 line-clamp-2 leading-relaxed">
                      {page.summary}
                    </p>
                  </div>

                  {/* Benefits / Details */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E5E2DA] text-xs">
                    {page.subsidyOrBenefit && (
                      <div className="flex items-start gap-1.5 text-[#43423E]">
                        <Sparkles className="w-3.5 h-3.5 text-[#BC6C25] flex-shrink-0 mt-0.5" />
                        <span className="font-medium line-clamp-1 text-[11px]">{page.subsidyOrBenefit}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-[#8C8A7D] text-[11px]">
                      <Phone className="w-3 h-3 text-[#A8A598] flex-shrink-0" />
                      <span className="truncate">{page.contactDepartment}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-4 py-2.5 bg-[#FDFBF7] border-t border-[#E5E2DA] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#A8A598] font-mono truncate max-w-[130px]">
                    {page.fileName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenDetails(page)}
                      className="px-2.5 py-1 text-[#706E64] hover:text-[#2C2C28] hover:bg-[#EEECE4] rounded-full font-medium transition-colors"
                    >
                      解説
                    </button>
                    <button
                      onClick={() => onSelectPage(originalIndex)}
                      className="px-3 py-1 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] rounded-full font-medium transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <span>表示</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
