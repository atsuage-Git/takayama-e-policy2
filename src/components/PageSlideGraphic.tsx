import React, { useState } from 'react';
import { GuidebookPage } from '../types';
import { 
  Upload, 
  ImageIcon, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  FileText
} from 'lucide-react';

interface PageSlideGraphicProps {
  page: GuidebookPage;
  customImageSrc?: string;
  isZoomed?: boolean;
  onUploadImage?: (pageId: number, file: File) => void;
}

export const PageSlideGraphic: React.FC<PageSlideGraphicProps> = ({ 
  page, 
  customImageSrc,
  isZoomed = false,
  onUploadImage
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && onUploadImage) {
      onUploadImage(page.id, e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUploadImage) {
      onUploadImage(page.id, e.target.files[0]);
    }
  };

  // 1. If real uploaded image is provided, display it directly as pure high-fidelity slide
  if (customImageSrc) {
    return (
      <div 
        className="w-full h-full relative flex items-center justify-center bg-[#FAF8F3] overflow-hidden select-none group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {/* The Slide Image renderedそのまま */}
        <img 
          src={customImageSrc} 
          alt={page.title} 
          referrerPolicy="no-referrer"
          className="max-w-full max-h-full w-auto h-auto object-contain shadow-md rounded-lg transition-transform duration-300 pointer-events-auto"
          style={{ 
            transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
            transformOrigin: 'center center'
          }}
        />

        {/* Subtle Page Badge */}
        <div className="absolute top-3 left-4 bg-[#2C2C28]/80 backdrop-blur-md text-[#FDFBF7] text-xs px-3.5 py-1.5 rounded-full border border-[#E5E2DA]/30 flex items-center gap-2 shadow-sm transition-opacity duration-300 opacity-90 hover:opacity-100">
          <span className="font-mono font-bold text-[#E5B887]">P.{page.id}</span>
          <span className="text-[11px] text-[#E5E2DA] truncate max-w-[240px]">{page.fileName}</span>
        </div>

        {/* Change Image Button on hover */}
        {onUploadImage && isHovered && (
          <label className="absolute bottom-3 right-4 bg-[#FAF8F3]/90 hover:bg-[#FAF8F3] text-[#43423E] text-xs px-3 py-1.5 rounded-full border border-[#E5E2DA] shadow-md flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-all">
            <Upload className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span>画像を差し替え</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileInput} 
            />
          </label>
        )}

        {/* Drag over overlay */}
        {dragOver && (
          <div className="absolute inset-0 bg-[#5A5A40]/30 backdrop-blur-xs border-2 border-dashed border-[#5A5A40] flex items-center justify-center z-20">
            <div className="bg-[#FAF8F3] text-[#43423E] px-4 py-2 rounded-xl shadow-lg font-serif font-bold text-sm flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#5A5A40]" />
              <span>ドロップして画像を更新</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Default state: Clean placeholder with direct dropzone and document summary
  return (
    <div 
      className={`w-full h-full bg-[#FAF8F3] flex flex-col relative overflow-hidden select-none border border-[#E5E2DA] transition-all duration-300 ${
        dragOver ? 'border-[#5A5A40] bg-[#5A5A40]/10' : ''
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Top Banner */}
      <div 
        className="w-full px-6 py-3 flex items-center justify-between text-[#FDFBF7] shadow-2xs"
        style={{ backgroundColor: page.themeColor.primary }}
      >
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-0.5 bg-black/15 rounded-full font-mono text-xs font-bold text-[#FDFBF7]">
            NO. {page.fileNumber}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#FDFBF7]/90 font-medium">
            {page.categoryLabel}
          </div>
        </div>

        <div className="flex items-center gap-2 font-serif italic text-xs text-[#FDFBF7]/90">
          <span>Page {page.id} / 20</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-6 md:p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-4">
        {/* Title */}
        <div>
          <span className="text-[11px] font-mono text-[#8C8A7D] tracking-wider block mb-1">
            {page.fileName}
          </span>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#2C2C28] leading-snug">
            {page.title}
          </h2>
          <p className="text-xs font-serif italic text-[#706E64] mt-1">
            {page.subtitle}
          </p>
        </div>

        {/* Upload Dropzone Box */}
        <div 
          className="w-full bg-[#FDFBF7] border-2 border-dashed border-[#D6D2C9] hover:border-[#5A5A40] rounded-2xl p-6 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group shadow-2xs"
          onClick={() => document.getElementById(`file-input-${page.id}`)?.click()}
        >
          <input 
            id={`file-input-${page.id}`}
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileInput}
          />
          <div className="w-12 h-12 rounded-full bg-[#FAF8F3] border border-[#E5E2DA] flex items-center justify-center text-[#5A5A40] group-hover:scale-110 transition-transform">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-serif font-bold text-[#2C2C28]">
              このページ（{page.fileName}）の画像をドロップ または 選択
            </p>
            <p className="text-[11px] text-[#8C8A7D] mt-0.5">
              PNG/JPG画像をそのままフルサイズのスライドとして表示します
            </p>
          </div>
          <span className="px-4 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] text-xs font-medium rounded-full shadow-2xs transition-colors">
            ファイルを選択
          </span>
        </div>

        {/* Summary Snippet */}
        <div className="text-left w-full bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E5E2DA] text-xs text-[#5A5852] space-y-1">
          <div className="font-serif font-bold text-[#5A5A40] text-[11px] flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> 施策概要
          </div>
          <p className="line-clamp-2 leading-relaxed text-[#43423E]">
            {page.summary}
          </p>
        </div>
      </div>
    </div>
  );
};
