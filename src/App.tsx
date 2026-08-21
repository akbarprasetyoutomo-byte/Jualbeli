import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ShoppingBag, 
  Leaf, 
  Coins, 
  BookOpen, 
  Instagram, 
  Share2, 
  Flame,
  CheckCheck,
  FileText
} from 'lucide-react';
import { CAPTIONS_DATA } from './data/captions';
import { CaptionItem } from './types';
import { CaptionCard } from './components/CaptionCard';
import { InstagramPreview } from './components/InstagramPreview';
import { CaptionCustomizer } from './components/CaptionCustomizer';

export default function App() {
  const [captionsList, setCaptionsList] = useState<CaptionItem[]>(CAPTIONS_DATA);
  const [selectedCaption, setSelectedCaption] = useState<CaptionItem>(CAPTIONS_DATA[0]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopySingle = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(`Caption #${id} berhasil disalin ke clipboard!`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyFromPreview = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(selectedCaption.id);
    showToast(`Caption #${selectedCaption.id} berhasil disalin!`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyAll = () => {
    const fullText = captionsList
      .map((c, index) => `=== CAPTION #${c.id}: ${c.title.toUpperCase()} ===\n\n${c.text}\n\n`)
      .join('----------------------------------------\n\n');

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    showToast('Semua 5 Caption berhasil disalin!');
    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  const handleUpdateCustomText = (newText: string) => {
    setSelectedCaption(prev => ({
      ...prev,
      text: newText
    }));
    setCaptionsList(prevList =>
      prevList.map(c => (c.id === selectedCaption.id ? { ...c, text: newText } : c))
    );
  };

  const filteredCaptions = activeFilter === 'all'
    ? captionsList
    : captionsList.filter(c => c.id.toString() === activeFilter);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-sm flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Lapak Ceria
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full border border-rose-200">
                  Instagram Kit
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pusat Jual Beli Perlengkapan Sekolah Bekas Berkualitas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="copy-all-captions-btn"
              onClick={handleCopyAll}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
                copiedAll
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Semua Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin 5 Caption Sekaligus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Hero Banner with Key Highlights */}
        <section className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gaya Bahasa Santai & Anak Sekolah</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white mb-3">
              5 Caption Promosi Instagram &quot;Lapak Ceria&quot;
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Didesain khusus untuk menarik perhatian pelajar, SMP, SMA, maupun orang tua murid. 
              Setiap caption memuat 3 keunggulan utama, tepat 3 emoji ekspresif, dan 5 hashtag populer yang siap diunggah.
            </p>

            {/* 3 Pillars Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">1. Harga Murah</h4>
                  <p className="text-[11px] text-slate-300">Ramah uang jajan pelajar</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">2. Masih Bagus</h4>
                  <p className="text-[11px] text-slate-300">Kondisi 90% layak & terawat</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">3. Hemat & Ramah Bumi</h4>
                  <p className="text-[11px] text-slate-300">Reuse barang & kurangi limbah</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              id="filter-all-captions"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              Semua (5 Caption)
            </button>
            {captionsList.map((c) => (
              <button
                key={c.id}
                id={`filter-caption-${c.id}`}
                onClick={() => {
                  setActiveFilter(c.id.toString());
                  setSelectedCaption(c);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  activeFilter === c.id.toString()
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                #{c.id} {c.theme}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Instagram className="w-4 h-4 text-rose-500" />
            <span>Format Instagram Feed & Reels Ready</span>
          </div>
        </div>

        {/* Main Content Grid: Left List + Right Instagram Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Caption Cards & Live Customizer */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customizer Box for Selected Caption */}
            <CaptionCustomizer
              selectedCaption={selectedCaption}
              onUpdateText={handleUpdateCustomText}
            />

            {/* List of Caption Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Daftar 5 Pilihan Caption</span>
                </h3>
                <span className="text-xs text-slate-500">Klik &quot;Preview&quot; untuk menguji di feed IG</span>
              </div>

              {filteredCaptions.map((caption) => (
                <CaptionCard
                  key={caption.id}
                  caption={caption}
                  isSelected={selectedCaption.id === caption.id}
                  onSelect={(item) => setSelectedCaption(item)}
                  onCopy={handleCopySingle}
                  isCopied={copiedId === caption.id}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Instagram Live Mockup Simulator */}
          <div className="lg:col-span-5">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Simulasi Postingan IG</h3>
                </div>
                <span className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  Caption #{selectedCaption.id} Aktif
                </span>
              </div>

              <InstagramPreview
                caption={selectedCaption}
                onCopy={handleCopyFromPreview}
                copiedId={copiedId}
              />

              {/* Quick Tips Box */}
              <div className="mt-4 bg-amber-50/80 rounded-2xl border border-amber-200/70 p-4 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold mb-1.5 text-amber-950">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Tips Posting Lapak Ceria:</span>
                </div>
                <ul className="space-y-1 text-slate-700 list-disc list-inside">
                  <li>Unggah foto produk alat sekolah dengan pencahayaan terang dan background bersih.</li>
                  <li>Sertakan info kondisi fisik (misal: mulus 95%, fungsi kalkulator normal).</li>
                  <li>Balas DM / komentar dengan cepat agar transaksi langsung deal!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Lapak Ceria</span>
            <span>—</span>
            <span>Jual Beli Perlengkapan Sekolah Bekas & Preloved Ramah Lingkungan</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-600 font-medium">✓ 3 Poin Keunggulan</span>
            <span className="text-indigo-600 font-medium">✓ 3 Emoji</span>
            <span className="text-blue-600 font-medium">✓ 5 Hashtag</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
