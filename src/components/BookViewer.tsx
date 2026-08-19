import React, { useState } from 'react';
import { GuidebookPage } from '../types';
import { PageSlideGraphic } from './PageSlideGraphic';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Bookmark, 
  Columns, 
  Square
} from 'lucide-react';

interface BookViewerProps {
  pages: GuidebookPage[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  customImages: Record<number, string>;
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onOpenDetails: (page: GuidebookPage) => void;
}

export const BookViewer: React.FC<BookViewerProps> = ({
  pages,
  currentPageIndex,
  onPageChange,
  customImages,
  isFavorite,
  onToggleFavorite,
  onOpenDetails
}) => {
  const [spreadMode, setSpreadMode] = useState<boolean>(true);

  const spreadIndex = Math.floor(currentPageIndex / 2) * 2;
  const leftPage = pages[spreadIndex];
  const rightPage = pages[spreadIndex + 1];

  const handlePrev = () => {
    if (spreadMode) {
      if (spreadIndex > 0) {
        onPageChange(spreadIndex - 2);
      }
    } else {
      if (currentPageIndex > 0) {
        onPageChange(currentPageIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (spreadMode) {
      if (spreadIndex + 2 < pages.length) {
        onPageChange(spreadIndex + 2);
      }
    } else {
      if (currentPageIndex < pages.length - 1) {
        onPageChange(currentPageIndex + 1);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FDFBF7] text-[#43423E] select-none overflow-hidden">
      {/* Book Toolbar */}
      <div className="bg-[#FAF8F3] border-b border-[#E5E2DA] px-4 md:px-8 py-2.5 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#5A5A40]" />
          <span className="font-serif italic font-bold text-[#2C2C28]">デジタル見開きブック</span>
          <span className="text-[#8C8A7D] font-mono text-[11px] hidden sm:inline ml-2">
            {spreadMode 
              ? `見開き P.${spreadIndex + 1} - ${rightPage ? spreadIndex + 2 : spreadIndex + 1} / 全${pages.length}頁`
              : `P.${currentPageIndex + 1} / 全${pages.length}頁`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpreadMode(!spreadMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFBF7] hover:bg-[#EEECE4] text-[#43423E] rounded-full border border-[#E5E2DA] transition-colors shadow-2xs font-medium"
            title="単ページ / 見開き切り替え"
          >
            {spreadMode ? <Square className="w-3.5 h-3.5 text-[#5A5A40]" /> : <Columns className="w-3.5 h-3.5 text-[#5A5A40]" />}
            <span className="hidden sm:inline">{spreadMode ? '単ページ表示' : '見開き表示'}</span>
          </button>
        </div>
      </div>

      {/* Book Workspace Canvas */}
      <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#FDFBF7] overflow-auto">
        {/* Navigation Prev */}
        <button
          onClick={handlePrev}
          disabled={spreadMode ? spreadIndex === 0 : currentPageIndex === 0}
          className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-[#FAF8F3] hover:bg-[#5A5A40] text-[#43423E] hover:text-[#FDFBF7] border border-[#E5E2DA] flex items-center justify-center shadow-md disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          title="前へめくる"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Book Container with 3D Spine effect */}
        {spreadMode ? (
          <div className="w-full max-w-6xl max-h-[80vh] flex items-stretch shadow-md rounded-2xl overflow-hidden border border-[#E5E2DA] bg-[#FAF8F3] relative">
            {/* Left Page */}
            {leftPage && (
              <div className="flex-1 aspect-[4/3] bg-[#FDFBF7] relative border-r border-[#E5E2DA] flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <PageSlideGraphic 
                    page={leftPage} 
                    customImageSrc={customImages[leftPage.id]} 
                  />
                </div>
                <div className="bg-[#FAF8F3] px-4 py-2 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#706E64]">
                  <span className="font-serif italic font-bold text-[#2C2C28]">Page {leftPage.id}</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onToggleFavorite(leftPage.id)}
                      className={`text-xs flex items-center gap-1 ${isFavorite(leftPage.id) ? 'text-[#BC6C25] font-bold' : 'text-[#706E64] hover:text-[#2C2C28]'}`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFavorite(leftPage.id) ? 'fill-[#BC6C25]' : ''}`} />
                      <span>しおり</span>
                    </button>
                    <button
                      onClick={() => onOpenDetails(leftPage)}
                      className="text-xs text-[#5A5A40] hover:underline font-medium"
                    >
                      詳細
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Book Center Spine (Fold) */}
            <div className="w-3 bg-gradient-to-r from-[#D6D2C9]/60 via-[#FAF8F3] to-[#D6D2C9]/60 z-10 hidden md:block" />

            {/* Right Page */}
            {rightPage ? (
              <div className="flex-1 aspect-[4/3] bg-[#FDFBF7] relative flex flex-col hidden md:flex">
                <div className="flex-1 overflow-hidden">
                  <PageSlideGraphic 
                    page={rightPage} 
                    customImageSrc={customImages[rightPage.id]} 
                  />
                </div>
                <div className="bg-[#FAF8F3] px-4 py-2 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#706E64]">
                  <span className="font-serif italic font-bold text-[#2C2C28]">Page {rightPage.id}</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onToggleFavorite(rightPage.id)}
                      className={`text-xs flex items-center gap-1 ${isFavorite(rightPage.id) ? 'text-[#BC6C25] font-bold' : 'text-[#706E64] hover:text-[#2C2C28]'}`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFavorite(rightPage.id) ? 'fill-[#BC6C25]' : ''}`} />
                      <span>しおり</span>
                    </button>
                    <button
                      onClick={() => onOpenDetails(rightPage)}
                      className="text-xs text-[#5A5A40] hover:underline font-medium"
                    >
                      詳細
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 aspect-[4/3] bg-[#FAF8F3] flex flex-col items-center justify-center p-8 text-[#A8A598] border-l border-[#E5E2DA] hidden md:flex">
                <BookOpen className="w-12 h-12 mb-3 text-[#D6D2C9]" />
                <p className="text-sm font-serif italic text-[#706E64]">ガイドブック 結び</p>
                <p className="text-xs text-[#A8A598] mt-1 font-mono">高山市 雇用・産業振興課</p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-3xl max-h-[80vh] aspect-[16/10] shadow-md rounded-2xl overflow-hidden border border-[#E5E2DA] bg-[#FAF8F3]">
            <PageSlideGraphic 
              page={pages[currentPageIndex]} 
              customImageSrc={customImages[pages[currentPageIndex].id]} 
            />
          </div>
        )}

        {/* Navigation Next */}
        <button
          onClick={handleNext}
          disabled={spreadMode ? spreadIndex + 2 >= pages.length : currentPageIndex === pages.length - 1}
          className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-[#FAF8F3] hover:bg-[#5A5A40] text-[#43423E] hover:text-[#FDFBF7] border border-[#E5E2DA] flex items-center justify-center shadow-md disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          title="次へめくる"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom page jumper */}
      <div className="bg-[#FAF8F3] border-t border-[#E5E2DA] px-4 md:px-8 py-2.5 flex items-center justify-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D]">見開き選択:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-md py-1 custom-scrollbar">
          {Array.from({ length: Math.ceil(pages.length / 2) }).map((_, spreadIdx) => {
            const pageNum = spreadIdx * 2 + 1;
            const isCurrent = spreadMode 
              ? spreadIndex === spreadIdx * 2 
              : Math.floor(currentPageIndex / 2) === spreadIdx;
            return (
              <button
                key={spreadIdx}
                onClick={() => onPageChange(spreadIdx * 2)}
                className={`px-2.5 py-1 text-xs font-mono rounded-full transition-all border ${
                  isCurrent
                    ? 'bg-[#5A5A40] text-[#FDFBF7] border-[#5A5A40] font-bold shadow-xs'
                    : 'bg-[#FDFBF7] text-[#706E64] hover:bg-[#EEECE4] border-[#E5E2DA]'
                }`}
              >
                {pageNum}-{pageNum + 1 <= pages.length ? pageNum + 1 : pageNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
