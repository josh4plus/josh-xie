import { useState } from "react";
import { 
  FolderOpen, 
  CloudUpload, 
  Search, 
  Calendar, 
  ChevronDown, 
  MoreVertical, 
  Play,
  ChevronLeft,
  ChevronRight,
  Move,
  Download,
  Edit,
  Trash2,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const materials = [
  { id: 1, name: "夏日清凉系列_主图视频_01", type: "视频 16:9", status: "已通过", duration: "00:15", spend: "¥12.4k", ctr: "3.4%", roi: "2.8", image: "https://picsum.photos/seed/vid1/400/225" },
  { id: 2, name: "品牌宣传海报_B端_精品", type: "图片 3:4", status: "审核中", duration: "", spend: "¥2.1k", ctr: "1.2%", roi: "1.5", image: "https://picsum.photos/seed/img1/400/225" },
  { id: 3, name: "年度盛典回顾_混剪视频_最终版", type: "视频 9:16", status: "已通过", duration: "00:30", spend: "¥58.2k", ctr: "5.8%", roi: "4.2", image: "https://picsum.photos/seed/vid2/400/225" },
  { id: 4, name: "智能科技风_开屏视频_V2", type: "视频 1:1", status: "未通过", duration: "00:08", spend: "¥0", ctr: "0%", roi: "0", image: "https://picsum.photos/seed/vid3/400/225" },
  { id: 5, name: "系列备选素材_09", type: "图片 1:1", status: "审核中", duration: "", spend: "¥0", ctr: "0%", roi: "0", image: "https://picsum.photos/seed/img2/400/225", isLowOpacity: true },
];

export default function MaterialLibrary() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">素材库</h1>
          <p className="text-on-surface-variant font-medium">管理与优化您的品牌营销资产</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <FolderOpen className="w-5 h-5" />
            管理分类
          </button>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
            <CloudUpload className="w-5 h-5" />
            批量上传
          </button>
        </div>
      </header>

      {/* Filter Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-3">素材类型</label>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold">全部</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">视频</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">图片</button>
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-3">审核状态</label>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold">全部</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">审核中</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">已通过</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">未通过</button>
            </div>
          </div>
          <div>
             <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-3">时间范围</label>
             <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                <select className="w-full appearance-none bg-surface-container-lowest border-none rounded-lg py-2.5 pl-10 pr-8 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                  <option>最近7天</option>
                  <option>最近30天</option>
                  <option>自定义范围</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4 pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {materials.map((m) => (
          <div 
            key={m.id} 
            className={cn(
              "group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative",
              m.isLowOpacity && "opacity-60"
            )}
          >
            <div className="absolute top-3 left-3 z-10">
              <input 
                type="checkbox" 
                checked={selected.includes(m.id)}
                onChange={() => toggleSelect(m.id)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" 
              />
            </div>
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={m.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {m.duration && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">{m.duration}</span>
                </div>
              )}
              {m.duration && (
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-primary/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-6 h-6 fill-current" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-on-surface line-clamp-1">{m.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-[10px] font-bold tracking-tighter px-1.5 py-0.5 rounded uppercase",
                      "bg-surface-container text-outline"
                    )}>
                      {m.type}
                    </span>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      m.status === '已通过' ? "text-secondary bg-secondary-container/30" : 
                      m.status === '审核中' ? "text-primary bg-primary-container/10" : "text-error bg-error-container/30"
                    )}>
                      {m.status}
                    </span>
                  </div>
                </div>
                <button className="text-outline hover:text-primary transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {!m.isLowOpacity ? (
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="text-center">
                    <div className="text-[10px] text-outline font-medium">消耗</div>
                    <div className="text-sm font-bold">{m.spend}</div>
                  </div>
                  <div className="text-center border-x border-outline-variant/10">
                    <div className="text-[10px] text-outline font-medium">CTR</div>
                    <div className="text-sm font-bold text-secondary">{m.ctr}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-outline font-medium">ROI</div>
                    <div className="text-sm font-bold text-primary">{m.roi}</div>
                  </div>
                </div>
              ) : (
                <div className="h-10 bg-surface-container rounded flex items-center justify-center text-xs text-outline font-medium mt-4">暂无核心数据</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <footer className="mt-12 flex items-center justify-between">
        <p className="text-sm text-outline font-medium">显示 1 到 12 共 248 个素材</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-outline">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">3</button>
          <span className="text-outline mx-1 text-sm font-bold">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">21</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-outline">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Floating Action Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 ml-32 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-surface-container-lowest/70 backdrop-blur-2xl border border-white/20 px-8 py-4 rounded-full shadow-2xl flex items-center gap-8 min-w-[500px]">
            <div className="flex items-center gap-3 pr-8 border-r border-outline-variant/30">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">{selected.length}</div>
              <span className="text-sm font-bold text-on-surface">已选中素材</span>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors">
                <Move className="w-4 h-4" /> 批量移动
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors">
                <Download className="w-4 h-4" /> 批量下载
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-on-surface hover:text-primary transition-colors">
                <Edit className="w-4 h-4" /> 批量编辑
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-error hover:text-error/80 transition-colors">
                <Trash2 className="w-4 h-4" /> 批量删除
              </button>
            </div>
            <button onClick={() => setSelected([])} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-outline">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
