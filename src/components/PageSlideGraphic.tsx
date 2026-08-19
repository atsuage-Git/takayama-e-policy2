import React, { useState } from 'react';
import { GuidebookPage } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Target, 
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
  DollarSign,
  ChevronRight,
  Info,
  Calendar,
  FileCheck
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
            transform: isZoomed ? 'scale(1.35)' : 'scale(1)',
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

  // Category Icon Selector
  const getCategoryIcon = () => {
    switch (page.fileNumber) {
      case '001': return <Layers className="w-7 h-7 text-[#5A5A40]" />;
      case '401': return <Compass className="w-7 h-7 text-[#4A5B43]" />;
      case '403': return <GraduationCap className="w-7 h-7 text-[#BC6C25]" />;
      case '404': return <Globe2 className="w-7 h-7 text-[#6B5844]" />;
      case '406': return <DollarSign className="w-7 h-7 text-[#5A5A40]" />;
      case '501-1': return <TrendingUp className="w-7 h-7 text-[#9A6B3D]" />;
      case '501-2': return <Landmark className="w-7 h-7 text-[#855836]" />;
      case '502': return <Building2 className="w-7 h-7 text-[#516556]" />;
      case '601': return <Sparkles className="w-7 h-7 text-[#BC6C25]" />;
      case '602': return <Users className="w-7 h-7 text-[#735745]" />;
      case '603': return <Briefcase className="w-7 h-7 text-[#475B46]" />;
      case '701': return <GraduationCap className="w-7 h-7 text-[#5A5A40]" />;
      case '702': return <Award className="w-7 h-7 text-[#3F5B46]" />;
      case '703': return <Clock className="w-7 h-7 text-[#605847]" />;
      case '704': return <Globe2 className="w-7 h-7 text-[#50635C]" />;
      case '705': return <Cpu className="w-7 h-7 text-[#43423E]" />;
      case '706': return <Users className="w-7 h-7 text-[#7A5C43]" />;
      case '707': return <Globe2 className="w-7 h-7 text-[#566657]" />;
      case '708': return <ShieldCheck className="w-7 h-7 text-[#5C5852]" />;
      case '709': return <TrendingUp className="w-7 h-7 text-[#5A5A40]" />;
      default: return <Building2 className="w-7 h-7 text-[#5A5A40]" />;
    }
  };

  // 2. High-Fidelity Official Slide Presentation Graphic
  return (
    <div 
      className="w-full h-full bg-[#FDFBF7] flex flex-col justify-between relative overflow-hidden select-none border border-[#E5E2DA] transition-all duration-300 shadow-sm"
      style={{
        transform: isZoomed ? 'scale(1.25)' : 'scale(1)',
        transformOrigin: 'center center'
      }}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Slide Top Banner */}
      <div 
        className="w-full px-6 py-2.5 flex items-center justify-between text-[#FDFBF7] shadow-xs"
        style={{ backgroundColor: page.themeColor.primary }}
      >
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-black/25 rounded-full font-mono text-xs font-bold tracking-wider text-[#FDFBF7]">
            NO. {page.fileNumber}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#FDFBF7]/90">
            {page.categoryLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-serif italic text-[#FDFBF7]/85 hidden sm:inline">
            飛騨高山 産業人材育成・企業支援施策ガイド
          </span>
          <div className="px-2.5 py-0.5 rounded-full bg-[#FDFBF7] text-[#43423E] font-serif font-bold text-xs shadow-2xs">
            {page.id} / 20
          </div>
        </div>
      </div>

      {/* Main Slide Content Grid */}
      <div className="flex-1 p-5 md:p-6 lg:p-7 flex flex-col justify-between gap-3 overflow-y-auto custom-scrollbar">
        {/* Title and Category Header */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
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
            <div className="p-2.5 rounded-2xl border border-[#E5E2DA] bg-[#FAF8F3] flex-shrink-0 shadow-2xs">
              {getCategoryIcon()}
            </div>
          </div>

          <p className="text-xs md:text-sm font-serif italic text-[#706E64] border-l-2 pl-3 py-1 border-[#BC6C25] bg-[#FAF8F3] rounded-r-xl leading-relaxed">
            {page.subtitle}
          </p>
        </div>

        {/* 2-Column Structured Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 flex-1 items-stretch">
          {/* Left Column: Summary & Main Action Points */}
          <div className="md:col-span-7 flex flex-col justify-between gap-2.5">
            {/* Overview Box */}
            <div className="bg-[#FAF8F3] p-3.5 rounded-2xl border border-[#E5E2DA] flex-1">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-1.5 font-serif flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span>施策の概要と目的</span>
              </div>
              <p className="text-xs md:text-sm text-[#43423E] leading-relaxed">
                {page.summary}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] px-1 font-serif">
                主なポイント・特長
              </div>
              {page.keyPoints.slice(0, 3).map((point, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF8F3] border border-[#E5E2DA] text-xs text-[#43423E]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Benefits, Target Audience & Requirements */}
          <div className="md:col-span-5 flex flex-col justify-between gap-2.5">
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

            {/* Target Audience */}
            <div className="bg-[#FAF8F3] p-3 rounded-2xl border border-[#E5E2DA]">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8A7D] mb-1.5 font-serif flex items-center gap-1">
                <Target className="w-3 h-3 text-[#5A5A40]" />
                <span>対象者・対象企業</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {page.targetAudience.map((target, idx) => (
                  <span key={idx} className="text-[10px] bg-[#EEECE4] border border-[#E5E2DA] text-[#5A5852] px-2.5 py-0.5 rounded-full font-medium">
                    {target}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements / Conditions */}
            {page.requirements && (
              <div className="bg-[#FAF8F3] p-2.5 rounded-2xl border border-[#E5E2DA] text-[11px] text-[#706E64]">
                <div className="font-semibold text-[#43423E] flex items-center gap-1 mb-0.5">
                  <FileCheck className="w-3 h-3 text-[#5A5A40]" />
                  <span>主な要件・条件</span>
                </div>
                <p className="line-clamp-2 leading-relaxed">
                  {page.requirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Contact Bar */}
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

      {/* Slide Bottom Bar */}
      <div className="bg-[#FAF8F3] px-6 py-1.5 border-t border-[#E5E2DA] flex items-center justify-between text-[10px] text-[#8C8A7D] font-mono">
        <span className="truncate max-w-[280px]">{page.fileName}</span>
        <span className="font-serif italic font-semibold">Page {page.id} / 20</span>
      </div>
    </div>
  );
};
