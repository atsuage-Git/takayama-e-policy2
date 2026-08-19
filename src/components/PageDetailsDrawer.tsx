import React from 'react';
import { GuidebookPage } from '../types';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Building2, 
  Bookmark, 
  ChevronRight
} from 'lucide-react';

interface PageDetailsDrawerProps {
  page: GuidebookPage | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNavigateToPage: (pageId: number) => void;
}

export const PageDetailsDrawer: React.FC<PageDetailsDrawerProps> = ({
  page,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onNavigateToPage
}) => {
  if (!isOpen || !page) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#FAF8F3] shadow-2xl flex flex-col border-l border-[#E5E2DA]">
          {/* Drawer Header */}
          <div 
            className="p-5 text-[#FDFBF7] flex items-center justify-between"
            style={{ backgroundColor: page.themeColor.primary }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-xs bg-black/15 px-2 py-0.5 rounded-full">
                NO.{page.fileNumber}
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#FDFBF7]/90">
                  {page.categoryLabel}
                </div>
                <h2 className="text-base md:text-lg font-serif italic font-bold leading-tight mt-0.5 text-[#FDFBF7]">
                  {page.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={onToggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite ? 'text-[#BC6C25] bg-[#FDFBF7]' : 'text-[#FDFBF7]/80 hover:bg-black/10'
                }`}
                title="しおりに保存"
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#BC6C25]' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-[#FDFBF7]/80 hover:text-[#FDFBF7] rounded-full hover:bg-black/10 text-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#43423E] custom-scrollbar">
            {/* Subtitle / Catchphrase */}
            <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E5E2DA] text-xs md:text-sm font-serif italic text-[#706E64]">
              {page.subtitle}
            </div>

            {/* Summary */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-2 font-serif">
                制度・取り組みの趣旨
              </h3>
              <p className="text-xs md:text-sm text-[#43423E] leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#E5E2DA]">
                {page.summary}
              </p>
            </div>

            {/* Subsidy or Benefit Highlight */}
            {page.subsidyOrBenefit && (
              <div 
                className="p-4 rounded-2xl border border-[#E5E2DA] bg-[#E9E5DE] space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#5A5A40] font-serif">
                  <Sparkles className="w-4 h-4 text-[#BC6C25]" />
                  <span>支援内容・補助額・優遇措置</span>
                </div>
                <div className="text-sm md:text-base font-bold text-[#2C2C28]">
                  {page.subsidyOrBenefit}
                </div>
              </div>
            )}

            {/* Key Points */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-2 font-serif">
                主な特長・活用のメリット
              </h3>
              <div className="space-y-2">
                {page.keyPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FDFBF7] border border-[#E5E2DA] text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#5A5A40] flex-shrink-0 mt-0.5" />
                    <span className="text-[#43423E] leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-2 font-serif">
                主な対象者・事業所
              </h3>
              <div className="flex flex-wrap gap-2">
                {page.targetAudience.map((aud, i) => (
                  <span key={i} className="text-xs bg-[#EEECE4] border border-[#E5E2DA] text-[#5A5852] px-3 py-1 rounded-full font-medium">
                    {aud}
                  </span>
                ))}
              </div>
              {page.requirements && (
                <p className="text-xs text-[#706E64] mt-2 bg-[#FDFBF7] p-3 rounded-xl border border-[#E5E2DA]">
                  <strong className="text-[#5A5A40]">要件:</strong> {page.requirements}
                </p>
              )}
            </div>

            {/* Additional Details List */}
            {page.detailsList && (
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-2 font-serif">
                  実施・申請詳細
                </h3>
                <div className="bg-[#FDFBF7] rounded-xl border border-[#E5E2DA] divide-y divide-[#E5E2DA] text-xs">
                  {page.detailsList.map((item, i) => (
                    <div key={i} className="p-3 flex justify-between gap-2">
                      <span className="font-serif font-bold text-[#8C8A7D]">{item.label}</span>
                      <span className="text-[#43423E] text-right font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="p-4 bg-[#FDFBF7] border border-[#E5E2DA] rounded-2xl space-y-2">
              <h3 className="text-xs font-serif font-bold text-[#5A5A40] flex items-center gap-1.5">
                <Building2 className="w-4 h-4" /> お問い合わせ・相談窓口
              </h3>
              <div className="text-xs space-y-1">
                <p className="font-bold text-sm text-[#2C2C28]">{page.contactDepartment}</p>
                {page.contactPhone && (
                  <div className="flex items-center gap-1.5 text-[#5A5852] font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#BC6C25]" />
                    <span>TEL: {page.contactPhone}</span>
                  </div>
                )}
                <p className="text-[11px] text-[#8C8A7D] pt-1">
                  ※申請要件や最新の募集要領については各担当課までお問い合わせください。
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {page.tags.map((t, i) => (
                <span key={i} className="text-[11px] text-[#8C8A7D] bg-[#EEECE4] border border-[#E5E2DA] px-2.5 py-0.5 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-[#FAF8F3] border-t border-[#E5E2DA] flex items-center justify-between">
            <span className="font-serif italic text-xs text-[#8C8A7D]">Page {page.id} / 20</span>
            <button
              onClick={() => {
                onNavigateToPage(page.id);
                onClose();
              }}
              className="px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] text-xs font-medium rounded-full shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>スライドで表示する</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
