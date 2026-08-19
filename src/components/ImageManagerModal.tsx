import React, { useState } from 'react';
import { GuidebookPage } from '../types';
import { 
  Upload, 
  Trash2, 
  Check, 
  FolderOpen,
  Globe,
  Loader2
} from 'lucide-react';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: GuidebookPage[];
  customImages: Record<number, string>;
  onUpdateImages: (images: Record<number, string>) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  pages,
  customImages,
  onUpdateImages
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [isSavingToServer, setIsSavingToServer] = useState(false);
  const [serverSaveSuccess, setServerSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // Helper to read file as Base64 Data URL
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | File[]) => {
    setIsSavingToServer(true);
    setServerSaveSuccess(false);

    const newImages = { ...customImages };
    const serverPayload: Record<string, string> = {};
    let matched = 0;

    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const fileName = file.name;
      const targetPage = pages.find((p) => {
        const cleanUploaded = fileName.replace(/\s+/g, '').toLowerCase();
        const cleanTarget = p.fileName.replace(/\s+/g, '').toLowerCase();
        
        if (cleanUploaded === cleanTarget) return true;
        if (cleanUploaded.includes(cleanTarget.replace('.png', ''))) return true;
        
        const uploadNumMatch = fileName.match(/^(\d{3})/);
        if (uploadNumMatch) {
          const num = uploadNumMatch[1];
          if (num === '501') {
            if (fileName.includes('働く力') && p.title.includes('働く力')) return true;
            if (fileName.includes('企業立地') && p.title.includes('企業立地')) return true;
          }
          if (p.fileNumber.startsWith(num) && !p.fileNumber.includes('-')) {
            return true;
          }
        }
        return false;
      });

      if (targetPage) {
        try {
          const dataUrl = await readFileAsDataUrl(file);
          newImages[targetPage.id] = dataUrl;
          // Save with official page fileName for server persistence
          serverPayload[targetPage.fileName] = dataUrl;
          serverPayload[`${targetPage.fileNumber}.png`] = dataUrl;
          matched++;
        } catch (err) {
          console.error('Error reading file:', err);
        }
      }
    }

    onUpdateImages(newImages);
    setMatchCount(matched);

    // Save to server backend so public URL users can see it permanently
    try {
      if (Object.keys(serverPayload).length > 0) {
        const res = await fetch('/api/save-server-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ images: serverPayload })
        });
        if (res.ok) {
          setServerSaveSuccess(true);
        }
      }
    } catch (err) {
      console.warn('Server save optional sync:', err);
    } finally {
      setIsSavingToServer(false);
      setTimeout(() => {
        setMatchCount(null);
      }, 5000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleIndividualUpload = async (pageId: number, file: File) => {
    setIsSavingToServer(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const targetPage = pages.find(p => p.id === pageId);
      
      onUpdateImages({
        ...customImages,
        [pageId]: dataUrl
      });

      if (targetPage) {
        await fetch('/api/save-server-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            images: {
              [targetPage.fileName]: dataUrl,
              [`${targetPage.fileNumber}.png`]: dataUrl
            } 
          })
        });
        setServerSaveSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingToServer(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('設定した画像プレビューを初期化（公式デザインスライド表示）に戻しますか？')) {
      onUpdateImages({});
    }
  };

  const handleRemoveSingle = (pageId: number) => {
    const next = { ...customImages };
    delete next[pageId];
    onUpdateImages(next);
  };

  const loadedCount = Object.keys(customImages).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F3] border border-[#E5E2DA] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col text-[#43423E] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E5E2DA] flex items-center justify-between bg-[#FAF8F3]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A5A40] text-[#FDFBF7] rounded-full flex items-center justify-center shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif italic font-bold text-base md:text-lg text-[#2C2C28]">
                画像ファイル一括登録・公開マネージャー
              </h2>
              <p className="text-xs text-[#8C8A7D]">
                PCの画像ファイルをドロップすると、アプリ全体に永久保存され、共有URLを開いた全員に表示されます。
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Dropzone Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-7 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
              dragOver
                ? 'border-[#5A5A40] bg-[#5A5A40]/10'
                : 'border-[#D6D2C9] hover:border-[#5A5A40] bg-[#FDFBF7]'
            }`}
            onClick={() => document.getElementById('bulk-file-input')?.click()}
          >
            <input
              id="bulk-file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <div className="w-14 h-14 rounded-full bg-[#FAF8F3] border border-[#E5E2DA] flex items-center justify-center text-[#5A5A40] shadow-inner">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-[#2C2C28]">
                画像をここにドラッグ＆ドロップ（またはクリックして選択）
              </p>
              <p className="text-xs text-[#8C8A7D] mt-1 font-serif italic">
                20枚まとめて一括選択できます。ファイル名（001, 401...）から全自動で各ページに配分されます。
              </p>
            </div>
            <button
              type="button"
              className="px-5 py-2 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] text-xs font-semibold rounded-full shadow-xs transition-colors"
            >
              PCから画像ファイルを選択（複数可）
            </button>
          </div>

          {/* Saving / Success notification */}
          {isSavingToServer && (
            <div className="p-3.5 bg-[#BC6C25]/10 border border-[#BC6C25]/30 text-[#BC6C25] rounded-xl text-xs flex items-center gap-2 font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>サーバーへ画像を保存中...</span>
            </div>
          )}

          {matchCount !== null && (
            <div className="p-3.5 bg-[#5A5A40]/15 border border-[#5A5A40]/30 text-[#5A5A40] rounded-xl text-xs flex items-center justify-between font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#5A5A40]" />
                <span>{matchCount} 件の画像を適用しました！</span>
              </div>
              {serverSaveSuccess && (
                <div className="flex items-center gap-1 text-[11px] text-[#5A5A40] font-semibold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>サーバーに永久保存完了（公開URLにも反映）</span>
                </div>
              )}
            </div>
          )}

          {/* Current Status Bar */}
          <div className="flex items-center justify-between text-xs bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E5E2DA]">
            <div className="flex items-center gap-2">
              <span className="text-[#706E64] font-medium">適用状況:</span>
              <span className="font-bold text-[#5A5A40] font-mono">
                {loadedCount} / {pages.length} ページ
              </span>
              {loadedCount === 0 && (
                <span className="text-[#8C8A7D] text-[11px] font-serif italic">
                  （未設定時は公式デザインスライドで表示されます）
                </span>
              )}
            </div>
            {loadedCount > 0 && (
              <button
                onClick={handleClearAll}
                className="text-[#BC6C25] hover:text-[#A3591A] text-xs flex items-center gap-1 hover:underline font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>全画像を初期化</span>
              </button>
            )}
          </div>

          {/* Page Image Mapping List */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-3 font-serif">
              全20ページの画像割り当て一覧
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {pages.map((p) => {
                const hasImg = !!customImages[p.id];
                return (
                  <div
                    key={p.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                      hasImg
                        ? 'bg-[#FDFBF7] border-[#5A5A40]/50'
                        : 'bg-[#FDFBF7]/60 border-[#E5E2DA]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-serif italic font-bold text-[#BC6C25] bg-[#EEECE4] px-2 py-0.5 rounded-full text-[11px] border border-[#E5E2DA]">
                        P.{p.id}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-[#2C2C28] truncate">{p.title}</div>
                        <div className="text-[10px] text-[#8C8A7D] truncate font-mono">{p.fileName}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {hasImg ? (
                        <>
                          <span className="text-[#5A5A40] text-[11px] font-medium flex items-center gap-0.5">
                            <Check className="w-3.5 h-3.5" /> 登録済
                          </span>
                          <button
                            onClick={() => handleRemoveSingle(p.id)}
                            className="p-1 text-[#A8A598] hover:text-[#BC6C25] rounded-full"
                            title="この画像を解除"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <label className="cursor-pointer px-2.5 py-1 bg-[#EEECE4] hover:bg-[#E5E2DA] text-[#43423E] rounded-full text-[11px] font-medium transition-colors border border-[#E5E2DA]">
                          <span>選択</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleIndividualUpload(p.id, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#FAF8F3] border-t border-[#E5E2DA] flex items-center justify-between">
          <div className="text-xs text-[#706E64] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>登録された画像は共有リンク（URL）の閲覧者全員に公開されます</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] font-semibold text-xs rounded-full shadow-xs transition-colors"
          >
            完了して閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
