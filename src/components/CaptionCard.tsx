import React from 'react';
import { Copy, Check, Eye, Tag, Smile, DollarSign, Sparkles, Leaf, CheckCircle } from 'lucide-react';
import { CaptionItem } from '../types';

interface CaptionCardProps {
  caption: CaptionItem;
  isSelected: boolean;
  onSelect: (caption: CaptionItem) => void;
  onCopy: (id: number, text: string) => void;
  isCopied: boolean;
}

export const CaptionCard: React.FC<CaptionCardProps> = ({
  caption,
  isSelected,
  onSelect,
  onCopy,
  isCopied
}) => {
  return (
    <div
      id={`caption-card-${caption.id}`}
      className={`rounded-2xl transition-all duration-200 border ${
        isSelected
          ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
          : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md'
      } p-6 flex flex-col justify-between`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm border border-indigo-100">
              #{caption.id}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">
                {caption.title}
              </h3>
              <span className="text-xs text-indigo-600 font-medium bg-indigo-50/80 px-2 py-0.5 rounded-md mt-1 inline-block">
                {caption.theme}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`select-preview-${caption.id}`}
              onClick={() => onSelect(caption)}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Lihat di Mockup IG"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              id={`copy-card-btn-${caption.id}`}
              onClick={() => onCopy(caption.id, caption.text)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isCopied
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-sm'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Caption Text Box */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line mb-4 font-sans select-all">
          {caption.text}
        </div>

        {/* 3 Main Highlighted Pillars */}
        <div className="space-y-2 mb-4 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            3 Poin Utama yang Ditanamkan:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
              <DollarSign className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Harga Murah:</span>
                <span className="text-slate-600">{caption.points.murah}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Kualitas Bagus:</span>
                <span className="text-slate-600">{caption.points.kualitasBagus}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100">
              <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Hemat & Lingkungan:</span>
                <span className="text-slate-600">{caption.points.ramahLingkungan}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta counters & validation pills */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Emojis pill */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 font-medium">
            <Smile className="w-3.5 h-3.5 text-amber-600" />
            <span>3 Emoji:</span>
            <span className="font-bold tracking-widest">{caption.emojis.join(' ')}</span>
          </span>

          {/* Hashtags pill */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 font-medium">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>5 Hashtag Siap Pakai</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <CheckCircle className="w-3 h-3" />
          <span>Sesuai Format</span>
        </div>
      </div>
    </div>
  );
};
