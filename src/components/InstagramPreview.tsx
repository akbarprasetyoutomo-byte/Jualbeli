import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import { CaptionItem } from '../types';

interface InstagramPreviewProps {
  caption: CaptionItem;
  onCopy: (text: string) => void;
  copiedId: number | null;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({
  caption,
  onCopy,
  copiedId
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(248);
  const [saved, setSaved] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  return (
    <div id="instagram-phone-preview" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-md mx-auto sticky top-6">
      {/* Phone Header Bar */}
      <div className="bg-slate-900 text-white px-5 py-2.5 flex items-center justify-between text-xs font-medium">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <span className="text-[10px] text-slate-300">Live Preview IG</span>
        </div>
      </div>

      {/* IG Account Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
              <span className="text-sm font-black text-indigo-600">LC</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-slate-900">lapakceria.school</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white" />
            </div>
            <p className="text-xs text-slate-500">Pasar Alat Sekolah Bekas & Preloved</p>
          </div>
        </div>
        <button id="ig-more-options" className="text-slate-400 hover:text-slate-700 p-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image Container */}
      <div className="relative aspect-square bg-slate-900 overflow-hidden group">
        <img
          src={caption.sampleImage}
          alt="Lapak Ceria Display"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Katalog Pilihan: {caption.theme}</span>
          </div>
          <span className="text-xs bg-emerald-600/90 font-medium px-2.5 py-1 rounded-full text-white">
            Preloved Berkualitas
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            id="ig-like-btn"
            onClick={toggleLike}
            className={`transition-transform active:scale-125 ${
              liked ? 'text-rose-500' : 'text-slate-700 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-6 h-6 ${liked ? 'fill-rose-500' : ''}`} />
          </button>
          <button id="ig-comment-btn" className="text-slate-700 hover:text-slate-900">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button id="ig-share-btn" className="text-slate-700 hover:text-slate-900">
            <Send className="w-6 h-6" />
          </button>
        </div>
        <button
          id="ig-save-btn"
          onClick={() => setSaved(!saved)}
          className={`transition-transform active:scale-110 ${
            saved ? 'text-amber-500' : 'text-slate-700 hover:text-amber-500'
          }`}
        >
          <Bookmark className={`w-6 h-6 ${saved ? 'fill-amber-500' : ''}`} />
        </button>
      </div>

      {/* Like counter */}
      <div className="px-4 text-xs font-bold text-slate-900">
        {likeCount.toLocaleString('id-ID')} suka
      </div>

      {/* Caption Content */}
      <div className="px-4 py-2 text-sm text-slate-800 leading-relaxed max-h-56 overflow-y-auto">
        <span className="font-bold text-slate-900 mr-2">lapakceria.school</span>
        <div className="whitespace-pre-line inline">
          {caption.text}
        </div>
      </div>

      {/* Timestamp & Copy Action Footer */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
          Baru Saja Diposting
        </span>
        <button
          id={`copy-ig-preview-${caption.id}`}
          onClick={() => onCopy(caption.text)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            copiedId === caption.id
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
          }`}
        >
          {copiedId === caption.id ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Caption Ini</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
