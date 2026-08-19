import React from 'react';
import { GuidebookPage } from '../types';
import { PageSlideGraphic } from './PageSlideGraphic';
import { Printer, CheckCircle2, Sparkles } from 'lucide-react';

interface PrintViewerProps {
  pages: GuidebookPage[];
  customImages: Record<number, string>;
}

export const PrintViewer: React.FC<PrintViewerProps> = ({ pages, customImages }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 bg-[#FDFBF7] p-4 md:p-8 overflow-y-auto custom-scrollbar">
      {/* Print Control Bar (Hidden when printing) */}
      <div className="max-w-5xl mx-auto mb-6 bg-[#FAF8F3] p-4 rounded-2xl border border-[#E5E2DA] shadow-xs flex items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="font-serif font-bold text-[#2C2C28] text-sm md:text-base">
            全20ページ 印刷・配布用ドキュメントビュー
          </h2>
          <p className="text-xs text-[#8C8A7D] mt-0.5 font-serif italic">
            ブラウザの印刷機能（Ctrl + P / Cmd + P）でPDF保存または紙への印刷が可能です。
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-[#FDFBF7] text-xs font-semibold rounded-full shadow-xs transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>今すぐ印刷 / PDF保存</span>
        </button>
      </div>

      {/* Pages Container */}
      <div className="max-w-5xl mx-auto space-y-8 print:space-y-4 print:max-w-full">
        {pages.map((page) => (
          <div
            key={page.id}
            className="bg-[#FAF8F3] rounded-2xl shadow-xs border border-[#E5E2DA] overflow-hidden print:shadow-none print:border-[#E5E2DA] print:break-after-page"
          >
            {/* Visual Graphic Section */}
            <div className="aspect-[16/9] w-full bg-[#FDFBF7] border-b border-[#E5E2DA]">
              <PageSlideGraphic 
                page={page} 
                customImageSrc={customImages[page.id]} 
              />
            </div>

            {/* Detailed Document Text Section */}
            <div className="p-6 space-y-4 bg-[#FAF8F3]">
              <div className="flex items-center justify-between border-b border-[#E5E2DA] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-[#5A5A40] text-[#FDFBF7] px-2.5 py-0.5 rounded-full">
                      NO.{page.fileNumber}
                    </span>
                    <span className="text-xs text-[#8C8A7D] font-medium">{page.categoryLabel}</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#2C2C28] mt-1">{page.title}</h3>
                </div>
                <div className="text-right text-xs text-[#8C8A7D] font-serif italic">
                  <span>Page {page.id} / 20</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Left col: Summary & Points */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-serif font-bold text-[#5A5A40] mb-1">【概要】</h4>
                    <p className="text-[#43423E] leading-relaxed">{page.summary}</p>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#5A5A40] mb-1">【主なポイント・支援内容】</h4>
                    <ul className="space-y-1">
                      {page.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[#5A5852]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5A5A40] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right col: Benefits, requirements, contact */}
                <div className="space-y-3 bg-[#FDFBF7] p-4 rounded-xl border border-[#E5E2DA]">
                  {page.subsidyOrBenefit && (
                    <div>
                      <h4 className="font-serif font-bold text-[#BC6C25] mb-0.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> 支援額・優遇措置
                      </h4>
                      <p className="text-[#2C2C28] font-medium">{page.subsidyOrBenefit}</p>
                    </div>
                  )}

                  {page.requirements && (
                    <div>
                      <h4 className="font-serif font-bold text-[#5A5A40] mb-0.5">主な要件・対象</h4>
                      <p className="text-[#5A5852]">{page.requirements}</p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#E5E2DA]">
                    <h4 className="font-serif font-bold text-[#5A5A40] mb-0.5">お問い合わせ・申請窓口</h4>
                    <p className="text-[#2C2C28] font-semibold">{page.contactDepartment}</p>
                    {page.contactPhone && (
                      <p className="text-[#8C8A7D] font-mono">TEL: {page.contactPhone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
