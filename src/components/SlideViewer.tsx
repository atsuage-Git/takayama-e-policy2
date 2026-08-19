import React, { useState, useEffect } from 'react';
import { GuidebookPage } from '../types';
import { PageSlideGraphic } from './PageSlideGraphic';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Bookmark, 
  Info, 
  PenLine, 
  Share2, 
  Check,
  Upload
} from 'lucide-react';

interface SlideViewerProps {
  pages: GuidebookPage[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  customImages: Record<number, string>;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  notes: Record<number, string>;
  onSaveNote: (pageId: number, note: string) => void;
  onOpenDetails: (page: GuidebookPage) => void;
  onUploadImage?: (pageId: number, file: File) => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  pages,
  currentPageIndex,
  onPageChange,
  customImages,
  isFavorite,
  onToggleFavorite,
  notes,
  onSaveNote,
  onOpenDetails,
  onUploadImage
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPage = pages[currentPageIndex] || pages[0];

  useEffect(() => {
    setCurrentNote(notes[currentPage.id] || '');
    setIsZoomed(false);
  }, [currentPage.id, notes]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentPageIndex < pages.length - 1) {
          onPageChange(currentPageIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentPageIndex > 0) {
          onPageChange(currentPageIndex - 1);
        }
      } else if (e.key === 'f') {
        onToggleFavorite(currentPage.id);
      } else if (e.key === 'z') {
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, pages.length, currentPage.id, onPageChange, onToggleFavorite]);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}#page=${currentPage.id} - 【高山市ガイドブック P.${currentPage.id}】${currentPage.title}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveNote = () => {
    onSaveNote(currentPage.id, currentNote);
    setShowNoteEditor(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FDFBF7] text-[#43423E] overflow-hidden select-none">
      {/* Top Slide Toolbar */}
      <div className="bg-[#FAF8F3] border-b border-[#E5E2DA] px-4 md:px-8 py-2.5 flex items-center justify-between gap-3 text-xs">
        {/* Page title & Category info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 bg-[#FDFBF7] px-3 py-1 rounded-full border border-[#E5E2DA] shadow-2xs">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A8A598]">PAGE</span>
            <span className="font-serif italic font-bold text-[#BC6C25]">
              {String(currentPageIndex + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[#8C8A7D] font-mono text-[11px] hidden sm:inline truncate max-w-[240px]">
            {currentPage.fileName}
          </span>
          <span 
            className="text-[11px] px-2.5 py-0.5 rounded-full font-medium hidden md:inline border border-[#E5E2DA] bg-[#EEECE4] text-[#5A5852]"
          >
            {currentPage.categoryLabel}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Zoom toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className={`p-2 rounded-full transition-colors border border-[#E5E2DA] ${
              isZoomed ? 'bg-[#5A5A40] text-[#FDFBF7]' : 'bg-[#FDFBF7] hover:bg-[#EEECE4] text-[#5A5A40]'
            }`}
            title="拡大・縮小 (Zキー)"
          >
            {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => onToggleFavorite(currentPage.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors border ${
              isFavorite(currentPage.id)
                ? 'bg-[#BC6C25] text-white border-[#BC6C25]'
                : 'bg-[#FDFBF7] hover:bg-[#EEECE4] text-[#5A5A40] border-[#E5E2DA]'
            }`}
            title="しおりに保存 (Fキー)"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite(currentPage.id) ? 'fill-white' : ''}`} />
            <span className="hidden sm:inline font-medium text-xs">
              {isFavorite(currentPage.id) ? '保存済' : 'しおり'}
            </span>
          </button>

          {/* Note toggle */}
          <button
            onClick={() => setShowNoteEditor(!showNoteEditor)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors border ${
              notes[currentPage.id]
                ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                : 'bg-[#FDFBF7] hover:bg-[#EEECE4] text-[#5A5A40] border-[#E5E2DA]'
            }`}
            title="メモを記入"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium text-xs">メモ</span>
          </button>

          {/* Details Drawer */}
          <button
            onClick={() => onOpenDetails(currentPage)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] rounded-full transition-all shadow-xs text-xs font-medium"
            title="施策の詳細と連絡先"
          >
            <Info className="w-3.5 h-3.5 text-[#D6D2C9]" />
            <span className="hidden sm:inline">制度詳細</span>
          </button>

          {/* Share */}
          <button
            onClick={handleCopyShare}
            className="p-2 bg-[#FDFBF7] hover:bg-[#EEECE4] text-[#5A5A40] rounded-full border border-[#E5E2DA] transition-colors"
            title="リンクをコピー"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-[#5A5A40]" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Slide Viewer Canvas */}
      <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-auto bg-[#FDFBF7]">
        {/* Navigation Arrow Left */}
        <button
          onClick={() => currentPageIndex > 0 && onPageChange(currentPageIndex - 1)}
          disabled={currentPageIndex === 0}
          className={`absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
            currentPageIndex === 0
              ? 'opacity-20 cursor-not-allowed border-[#E5E2DA] bg-[#FAF8F3] text-[#A8A598]'
              : 'border-[#E5E2DA] bg-[#FDFBF7] text-[#43423E] hover:bg-[#5A5A40] hover:text-[#FDFBF7] shadow-sm'
          }`}
          title="前のページ (←キー)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Display Container with 16:10 / 4:3 Proportion */}
        <div className="w-full max-w-4xl max-h-[76vh] aspect-[16/10] flex items-center justify-center shadow-md rounded-2xl overflow-hidden border border-[#E5E2DA] bg-[#FAF8F3] transition-all">
          <PageSlideGraphic 
            page={currentPage} 
            customImageSrc={customImages[currentPage.id]}
            isZoomed={isZoomed}
            onUploadImage={onUploadImage}
          />
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => currentPageIndex < pages.length - 1 && onPageChange(currentPageIndex + 1)}
          disabled={currentPageIndex === pages.length - 1}
          className={`absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
            currentPageIndex === pages.length - 1
              ? 'opacity-20 cursor-not-allowed border-[#E5E2DA] bg-[#FAF8F3] text-[#A8A598]'
              : 'border-[#E5E2DA] bg-[#FDFBF7] text-[#43423E] hover:bg-[#5A5A40] hover:text-[#FDFBF7] shadow-sm'
          }`}
          title="次のページ (→キー / Space)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide In Note Editor Popup */}
        {showNoteEditor && (
          <div className="absolute right-6 bottom-16 z-30 w-80 bg-[#FAF8F3] border border-[#E5E2DA] rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-[#2C2C28]">
                <PenLine className="w-4 h-4 text-[#BC6C25]" />
                <span>P.{currentPage.id} 社内検討メモ</span>
              </div>
              <button 
                onClick={() => setShowNoteEditor(false)}
                className="text-[#8C8A7D] hover:text-[#43423E] text-xs p-1"
              >
                ✕
              </button>
            </div>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="社内共有メモ、気になる補助金条件、質問事項など..."
              rows={4}
              className="w-full bg-[#FDFBF7] text-[#43423E] placeholder-[#A8A598] text-xs p-3 rounded-xl border border-[#E5E2DA] focus:outline-none focus:border-[#5A5A40] resize-none mb-3"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowNoteEditor(false)}
                className="px-3 py-1.5 bg-[#EEECE4] hover:bg-[#E5E2DA] text-[#5A5852] text-xs rounded-full"
              >
                閉じる
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] text-xs font-semibold rounded-full shadow-xs"
              >
                保存する
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="bg-[#FAF8F3] border-t border-[#E5E2DA] px-4 md:px-8 py-3 flex items-center gap-2.5 overflow-x-auto custom-scrollbar">
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] flex-shrink-0 mr-2 flex items-center gap-1">
          <span>INDEX</span>
          <span className="text-[#A8A598]">({pages.length})</span>
        </div>
        {pages.map((p, idx) => {
          const thumbImage = customImages[p.id];
          return (
            <button
              key={p.id}
              onClick={() => onPageChange(idx)}
              className={`flex-shrink-0 group relative w-22 h-14 rounded-xl overflow-hidden border transition-all text-left flex flex-col justify-between p-1.5 ${
                idx === currentPageIndex
                  ? 'border-[#5A5A40] ring-2 ring-[#5A5A40]/30 bg-[#FDFBF7] shadow-xs'
                  : 'border-[#E5E2DA] hover:border-[#8C8A7D] bg-[#FAF8F3] opacity-80 hover:opacity-100'
              }`}
            >
              {thumbImage ? (
                <div className="absolute inset-0 z-0">
                  <img src={thumbImage} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-80" />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              ) : null}
              <div className="flex items-center justify-between text-[10px] relative z-10">
                <span className={`font-serif italic font-bold ${thumbImage ? 'text-white' : idx === currentPageIndex ? 'text-[#BC6C25]' : 'text-[#8C8A7D]'}`}>
                  {String(p.id).padStart(2, '0')}
                </span>
                {isFavorite(p.id) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BC6C25]" />
                )}
              </div>
              <div className={`text-[9px] font-medium truncate leading-tight relative z-10 ${thumbImage ? 'text-white font-semibold' : 'text-[#43423E] group-hover:text-[#2C2C28]'}`}>
                {p.title}
              </div>
              <div 
                className="h-1 w-full rounded-full relative z-10" 
                style={{ backgroundColor: p.themeColor.primary }} 
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
