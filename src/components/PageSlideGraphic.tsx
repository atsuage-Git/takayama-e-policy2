import React, { useState } from 'react';
import { GuidebookPage } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Target, 
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  GraduationCap,
  Briefcase,
  Users,
  Compass,
  Cpu,
  Globe2,
  Landmark,
  ShieldCheck,
  Clock,
  DollarSign
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
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0] && onUploadImage) {
      onUploadImage(page.id, e.dataTransfer.files[0]);
    }
  };

  // 1. If actual uploaded image is present, render pure native image
  if (customImageSrc) {
    return (
      <div 
        className="w-full h-full relative flex items-center justify-center bg-[#FAF8F3] overflow-hidden select-none"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <img 
          src={customImageSrc} 
          alt={page.title} 
          referrerPolicy="no-referrer"
          className="max-w-full max-h-full w-auto h-auto object-contain shadow-sm rounded-lg transition-transform duration-300 pointer-events-auto"
          style={{ 
            transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
            transformOrigin: 'center center'
          }}
        />
        <div className="absolute top-3 left-4 bg-[#2C2C28]/85 backdrop-blur-md text-[#FDFBF7] text-xs px-3.5 py-1 rounded-full border border-[#E5E2DA]/30 flex items-center gap-2 shadow-xs">
          <span className="font-mono font-bold text-[#E5B887]">P.{page.id}</span>
          <span className="text-[11px] text-[#E5E2DA] truncate max-w-[240px]">{page.fileName}</span>
        </div>
      </div>
    );
  }

  // Helper icon selector based on file number
  const getCategoryIcon = () => {
    switch (page.fileNumber) {
      case '001': return <Layers className="w-8 h-8 text-[#5A5A40]" />;
      case '401': return <Compass className="w-8 h-8 text-[#4A5B43]" />;
      case '403': return <GraduationCap className="w-8 h-8 text-[#BC6C25]" />;
      case '404': return <Globe2 className="w-8 h-8 text-[#6B5844]" />;
      case '406': return <DollarSign className="w-8 h-8 text-[#5A5A40]" />;
      case '501-1': return <TrendingUp className="w-8 h-8 text-[#9A6B3D]" />;
      case '501-2': return <Landmark className="w-8 h-8 text-[#855836]" />;
      case '502': return <Building2 className="w-8 h-8 text-[#516556]" />;
      case '601': return <Sparkles className="w-8 h-8 text-[#BC6C25]" />;
      case '602': return <Users className="w-8 h-8 text-[#735745]" />;
      case '603': return <Briefcase className="w-8 h-8 text-[#475B46]" />;
      case '701': return <GraduationCap className="w-8 h-8 text-[#5A5A40]" />;
      case '702': return <Award className="w-8 h-8 text-[#3F5B46]" />;
      case '703': return <Clock className="w-8 h-8 text-[#605847]" />;
      case '704': return <Globe2 className="w-8 h-8 text-[#50635C]" />;
      case '705': return <Cpu className="w-8 h-8 text-[#43423E]" />;
      case '706': return <Users className="w-8 h-8 text-[#7A5C43]" />;
      case '707': return <Globe2 className="w-8 h-8 text-[#566657]" />;
      case '708': return <ShieldCheck className="w-8 h-8 text-[#5C5852]" />;
      case '709': return <TrendingUp className="w-8 h-8 text-[#5A5A40]" />;
      default: return <Building2 className="w-8 h-8 text-[#5A5A40]" />;
    }
  };

  // 2. High-Fidelity Official Slide Presentation Design
  return (
    <div 
      className="w-full h-full bg-[#FDFBF7] flex flex-col relative overflow-hidden select-none border border-[#E5E2DA] transition-all duration-300"
      style={{
        transform: isZoomed ? 'scale(1.25)' : 'scale(1)',
        transformOrigin: 'center center'
      }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Slide Header: High-Contrast Official Banner */}
      <div 
        className="w-full px-6 py-3 flex items-center justify-between text-[#FDFBF7] shadow-xs"
        style={{ backgroundColor: page.themeColor.primary }}
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-black/20 rounded-full font-mono text-xs font-bold tracking-wider text-[#FDFBF7]">
            NO. {page.fileNumber}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#FDFBF7]/90">
            {page.categoryLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif italic text-[#FDFBF7]/85 hidden sm:inline">
            高山市 産業人材育成・企業支援ガイド
          </span>
          <div className="w-6 h-6 rounded-full bg-[#FDFBF7] text-[#43423E] font-serif italic font-bold flex items-center justify-center text-xs shadow-2xs">
            {page.id}
          </div>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 p-5 md:p-7 flex flex-col justify-between bg-[#FDFBF7] overflow-hidden">
        {/* Title Area with Category Badge */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-1.5 mb-1.5">
                {page.visualBadges?.map((badge, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E5E2DA] bg-[#FAF8F3] text-[#706E64]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-[#2C2C28] tracking-tight leading-tight">
                {page.title}
              </h1>
            </div>
            <div className="p-3 rounded-2xl border border-[#E5E2DA] bg-[#FAF8F3] flex-shrink-0 shadow-2xs">
              {getCategoryIcon()}
            </div>
          </div>

          <p className="text-xs md:text-sm font-serif italic text-[#706E64] border-l-2 pl-3 py-1 mt-2 border-[#BC6C25] bg-[#FAF8F3] rounded-r-xl">
            {page.subtitle}
          </p>
        </div>

        {/* Structured 2-Column Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 my-2">
          {/* Left Column: Purpose & Benefits (7 Cols) */}
          <div className="md:col-span-7 space-y-2 flex flex-col justify-between">
            {/* Purpose */}
            <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E5E2DA]">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-1 font-serif">
                制度・取り組みの趣旨
              </div>
              <p className="text-xs md:text-sm text-[#43423E] leading-relaxed">
                {page.summary}
              </p>
            </div>

            {/* Key Features List */}
            <div className="space-y-1.5">
              {page.keyPoints.slice(0, 3).map((pt, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F3] border border-[#E5E2DA] text-xs text-[#43423E]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Benefit Box & Specs (5 Cols) */}
          <div className="md:col-span-5 space-y-2 flex flex-col justify-between">
            {/* Subsidy / Benefit Card */}
            {page.subsidyOrBenefit && (
              <div className="p-3.5 rounded-2xl border border-[#E5E2DA] bg-[#E9E5DE] text-[#2C2C28] shadow-2xs">
                <div className="flex items-center gap-1.5 font-serif font-bold text-xs text-[#5A5A40] mb-1">
                  <Sparkles className="w-4 h-4 text-[#BC6C25]" />
                  <span>支援内容・優遇措置</span>
                </div>
                <div className="text-xs md:text-sm font-bold text-[#2C2C28] leading-snug">
                  {page.subsidyOrBenefit}
                </div>
              </div>
            )}

            {/* Target Audience Box */}
            <div className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#E5E2DA]">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-1.5 font-serif flex items-center gap-1">
                <Target className="w-3 h-3 text-[#5A5A40]" />
                <span>主な対象</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {page.targetAudience.slice(0, 3).map((aud, i) => (
                  <span key={i} className="text-[10px] bg-[#EEECE4] border border-[#E5E2DA] text-[#5A5852] px-2 py-0.5 rounded-full font-medium">
                    {aud}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact & Meta Bar */}
        <div className="pt-2 border-t border-[#E5E2DA] flex flex-wrap items-center justify-between gap-2 text-xs text-[#706E64]">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-[#5A5A40]" />
            <span className="font-semibold text-[#2C2C28]">{page.contactDepartment}</span>
          </div>

          {page.contactPhone && (
            <div className="flex items-center gap-1.5 font-mono text-[#5A5852]">
              <Phone className="w-3 h-3 text-[#BC6C25]" />
              <span>TEL: {page.contactPhone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Slide Baseline */}
      <div className="bg-[#FAF8F3] px-6 py-1.5 border-t border-[#E5E2DA] flex items-center justify-between text-[10px] text-[#8C8A7D] font-mono">
        <span className="truncate max-w-[280px]">{page.fileName}</span>
        <span className="font-serif italic font-semibold">Page {page.id} / 20</span>
      </div>
    </div>
  );
};
