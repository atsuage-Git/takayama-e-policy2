import React from 'react';
import { ViewMode } from '../types';
import { 
  Tv, 
  BookOpen, 
  LayoutGrid, 
  Printer, 
  Bookmark, 
  Maximize, 
  Minimize, 
  Search, 
  Image as ImageIcon,
  SlidersHorizontal,
  X
} from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenImageManager: () => void;
  customImageCount: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  favoritesCount,
  onOpenFavorites,
  onOpenImageManager,
  customImageCount,
  isFullscreen,
  onToggleFullscreen
}) => {
  return (
    <header className="bg-[#FAF8F3] border-b border-[#E5E2DA] sticky top-0 z-40 px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
      {/* Brand & Guidebook Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#5A5A40] text-[#FDFBF7] flex items-center justify-center font-serif italic font-bold shadow-xs">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif italic font-bold text-base md:text-lg text-[#2C2C28] tracking-tight">
              高山市 産業人材育成・企業支援 スライドブック
            </h1>
            <span className="text-[10px] font-mono font-bold bg-[#EEECE4] text-[#5A5A40] px-2 py-0.5 rounded-full border border-[#E5E2DA]">
              全20ページ
            </span>
          </div>
          <p className="text-xs text-[#8C8A7D] font-serif italic hidden sm:block">
            ファイル番号昇順（001〜709）対応 デジタルスライド・ガイドブック
          </p>
        </div>
      </div>

      {/* Middle: View Mode Tabs */}
      <div className="flex items-center bg-[#FDFBF7] p-1 rounded-full border border-[#E5E2DA] shadow-2xs self-start md:self-auto overflow-x-auto max-w-full">
        <button
          onClick={() => setViewMode('slide')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
            viewMode === 'slide'
              ? 'bg-[#5A5A40] text-[#FDFBF7] font-semibold shadow-xs'
              : 'text-[#706E64] hover:text-[#2C2C28] hover:bg-[#EEECE4]'
          }`}
          title="スライド（プレゼンテーション）表示"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>スライド</span>
        </button>

        <button
          onClick={() => setViewMode('book')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
            viewMode === 'book'
              ? 'bg-[#5A5A40] text-[#FDFBF7] font-semibold shadow-xs'
              : 'text-[#706E64] hover:text-[#2C2C28] hover:bg-[#EEECE4]'
          }`}
          title="デジタル見開きブック表示"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>見開き本</span>
        </button>

        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
            viewMode === 'grid'
              ? 'bg-[#5A5A40] text-[#FDFBF7] font-semibold shadow-xs'
              : 'text-[#706E64] hover:text-[#2C2C28] hover:bg-[#EEECE4]'
          }`}
          title="20ページ一覧カタログ表示"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>一覧</span>
        </button>

        <button
          onClick={() => setViewMode('print')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif transition-all ${
            viewMode === 'print'
              ? 'bg-[#5A5A40] text-[#FDFBF7] font-semibold shadow-xs'
              : 'text-[#706E64] hover:text-[#2C2C28] hover:bg-[#EEECE4]'
          }`}
          title="全ページ印刷・PDF出力ビュー"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>印刷/PDF</span>
        </button>
      </div>

      {/* Right Tools: Search, Image Manager, Bookmarks, Fullscreen */}
      <div className="flex items-center gap-2">
        {/* Quick Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8C8A7D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="施策・キーワード検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#FDFBF7] text-[#43423E] placeholder-[#A8A598] text-xs rounded-full pl-8 pr-7 py-1.5 border border-[#E5E2DA] focus:outline-none focus:border-[#5A5A40] w-36 md:w-48 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8A7D] hover:text-[#2C2C28]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Image Manager Button */}
        <button
          onClick={onOpenImageManager}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all font-medium ${
            customImageCount > 0
              ? 'bg-[#EEECE4] border-[#5A5A40]/40 text-[#5A5A40]'
              : 'bg-[#FDFBF7] border-[#E5E2DA] text-[#706E64] hover:bg-[#EEECE4]'
          }`}
          title="画像ファイルの一括適用・設定"
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">画像設定</span>
          {customImageCount > 0 && (
            <span className="bg-[#5A5A40] text-[#FDFBF7] font-mono text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {customImageCount}/20
            </span>
          )}
        </button>

        {/* Bookmarks */}
        <button
          onClick={onOpenFavorites}
          className={`relative p-2 rounded-full border transition-all ${
            favoritesCount > 0
              ? 'bg-[#FDFBF7] border-[#BC6C25] text-[#BC6C25]'
              : 'bg-[#FDFBF7] border-[#E5E2DA] text-[#706E64] hover:bg-[#EEECE4]'
          }`}
          title="しおり一覧"
        >
          <Bookmark className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-[#BC6C25]' : ''}`} />
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#BC6C25] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 bg-[#FDFBF7] hover:bg-[#EEECE4] text-[#706E64] hover:text-[#2C2C28] rounded-full border border-[#E5E2DA] transition-colors"
          title={isFullscreen ? '全画面を解除' : '全画面表示'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
