import React, { useState, useEffect } from 'react';
import { Copy, Check, RotateCcw, Sparkles, Hash, Smile, Type } from 'lucide-react';
import { CaptionItem } from '../types';

interface CaptionCustomizerProps {
  selectedCaption: CaptionItem;
  onUpdateText: (updatedText: string) => void;
}

export const CaptionCustomizer: React.FC<CaptionCustomizerProps> = ({
  selectedCaption,
  onUpdateText
}) => {
  const [customText, setCustomText] = useState(selectedCaption.text);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCustomText(selectedCaption.text);
  }, [selectedCaption]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCustomText(val);
    onUpdateText(val);
  };

  const handleReset = () => {
    setCustomText(selectedCaption.text);
    onUpdateText(selectedCaption.text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Count hashtags in custom text
  const hashtagMatches = customText.match(/#[a-zA-Z0-9_]+/g) || [];
  // Count words
  const wordCount = customText.trim() ? customText.trim().split(/\s+/).length : 0;
  const charCount = customText.length;

  return (
    <div id="caption-customizer-card" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Editor & Sesuaikan Caption</h3>
            <p className="text-xs text-slate-500">Edit teks sebelum diposting ke Instagram</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="reset-caption-btn"
            onClick={handleReset}
            className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            id="copy-customized-btn"
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Teks Edit</span>
              </>
            )}
          </button>
        </div>
      </div>

      <textarea
        id="custom-caption-textarea"
        rows={6}
        value={customText}
        onChange={handleTextChange}
        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none leading-relaxed transition-all resize-y"
        placeholder="Tulis atau sesuaikan caption di sini..."
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <span>{charCount} karakter</span> ({wordCount} kata)
          </span>
          <span className="flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-semibold text-slate-700">{hashtagMatches.length} Hashtag</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
            Lapak Ceria • Preloved School Gear
          </span>
        </div>
      </div>
    </div>
  );
};
