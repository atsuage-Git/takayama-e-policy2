import React from 'react';
import { GuidebookPage } from '../types';
import { Bookmark, Trash2, ArrowRight, Sparkles } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: number[];
  pages: GuidebookPage[];
  onSelectPage: (pageId: number) => void;
  onRemoveFavorite: (pageId: number) => void;
  onClearAllFavorites: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  pages,
  onSelectPage,
  onRemoveFavorite,
  onClearAllFavorites
}) => {
  if (!isOpen) return null;

  const favoritePages = pages.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F3] border border-[#E5E2DA] rounded-3xl w-full max-w-2xl text-[#43423E] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#E5E2DA] flex items-center justify-between bg-[#FAF8F3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#BC6C25] text-white rounded-full flex items-center justify-center shadow-xs">
              <Bookmark className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h2 className="font-serif italic font-bold text-base md:text-lg text-[#2C2C28]">
                しおり・保存した制度一覧
              </h2>
              <p className="text-xs text-[#8C8A7D]">
                気になる支援策・検討中の補助金をブックマークしてまとめて管理できます
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8C8A7D] hover:text-[#2C2C28] text-lg p-2 rounded-full hover:bg-[#EEECE4]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 custom-scrollbar">
          {favoritePages.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#8C8A7D] pb-1">
                <span>保存中: <strong className="text-[#2C2C28]">{favoritePages.length}</strong> 件</span>
                <button
                  onClick={onClearAllFavorites}
                  className="text-[#BC6C25] hover:text-[#A3591A] flex items-center gap-1 hover:underline font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>すべて解除</span>
                </button>
              </div>

              {favoritePages.map((page) => (
                <div
                  key={page.id}
                  className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5E2DA] hover:border-[#5A5A40] transition-all flex items-start justify-between gap-3 group shadow-2xs"
                >
                  <div 
                    className="space-y-1.5 flex-1 cursor-pointer"
                    onClick={() => {
                      onSelectPage(page.id);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-[#EEECE4] text-[#5A5A40] px-2 py-0.5 rounded-full border border-[#E5E2DA]">
                        P.{page.id} (NO.{page.fileNumber})
                      </span>
                      <span className="text-[11px] text-[#8C8A7D]">{page.categoryLabel}</span>
                    </div>

                    <h4 className="font-serif font-bold text-[#2C2C28] text-sm group-hover:text-[#BC6C25] transition-colors">
                      {page.title}
                    </h4>

                    {page.subsidyOrBenefit && (
                      <div className="text-xs text-[#5A5852] flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#BC6C25] flex-shrink-0" />
                        <span className="truncate">{page.subsidyOrBenefit}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[11px] text-[#8C8A7D]">
                      <span>{page.contactDepartment}</span>
                      {page.contactPhone && <span>({page.contactPhone})</span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      onClick={() => onRemoveFavorite(page.id)}
                      className="p-1.5 text-[#A8A598] hover:text-[#BC6C25] rounded-full transition-colors"
                      title="しおりから削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectPage(page.id);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] text-xs font-semibold rounded-full flex items-center gap-1 shadow-2xs transition-colors"
                    >
                      <span>開く</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-[#FDFBF7] border border-[#E5E2DA] rounded-2xl space-y-2 text-[#8C8A7D]">
              <Bookmark className="w-10 h-10 mx-auto text-[#D6D2C9]" />
              <p className="text-sm font-serif font-semibold text-[#43423E]">まだしおりが登録されていません</p>
              <p className="text-xs text-[#8C8A7D]">
                各ページ上部の「しおり」ボタンまたは F キーでいつでも保存できます。
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F3] border-t border-[#E5E2DA] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#EEECE4] hover:bg-[#E5E2DA] text-[#43423E] text-xs font-medium rounded-full transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
