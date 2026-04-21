import { useState } from "react";
import { 
  BarChart2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ExternalLink,
  Play,
  Clock,
  Target,
  RefreshCw,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const adMaterials = [
  { 
    id: "AD-MAT-1024", 
    name: "夏日清凉_混剪01_A组活跃", 
    originalId: "MAT-001",
    status: "投放中", 
    spend: "¥42,890", 
    roi: "3.42",
    ctr: "5.82%",
    cvr: "12.4%",
    platform: "千川视频号",
    updatedAt: "2024-05-21 09:00",
    image: "https://picsum.photos/seed/ad1/400/225"
  },
  { 
    id: "AD-MAT-1025", 
    name: "极速版本_高点击版_测试", 
    originalId: "MAT-003",
    status: "已暂停", 
    spend: "¥1,200", 
    roi: "0.85",
    ctr: "1.24%",
    cvr: "2.1%",
    platform: "抖音信息流",
    updatedAt: "2024-05-20 18:30",
    image: "https://picsum.photos/seed/ad2/400/225"
  },
  { 
    id: "AD-MAT-1026", 
    name: "萌娃视角_亲子节大促", 
    originalId: "MAT-004",
    status: "投放中", 
    spend: "¥128,400", 
    roi: "4.89",
    ctr: "7.12%",
    cvr: "15.8%",
    platform: "千川竞价",
    updatedAt: "2024-05-21 11:20",
    image: "https://picsum.photos/seed/ad3/400/225"
  },
  { 
    id: "AD-MAT-1027", 
    name: "品牌TVC_混剪版_B组", 
    originalId: "MAT-001",
    status: "投放中", 
    spend: "¥15,600", 
    roi: "2.10",
    ctr: "2.85%",
    cvr: "6.2%",
    platform: "抖音信息流",
    updatedAt: "2024-05-21 08:45",
    image: "https://picsum.photos/seed/ad4/400/225"
  },
];

export default function AdMaterials() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = adMaterials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <div className="flex items-center gap-2 text-xs text-outline mb-2">
          <span>素材管理</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-on-surface font-medium">投放素材</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">投放素材看板</h1>
            <p className="text-on-surface-variant mt-2 max-w-lg">
              管理已上线投放的剪辑后素材，系统已与千川/抖音开放平台深度集成，数据每 15 分钟自动同步。
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-high rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-highest transition-colors">
              <RefreshCw className="w-4 h-4" /> 立即同步数据
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary rounded-xl font-bold text-sm text-white shadow-xl shadow-primary/20 hover:scale-[0.98] transition-transform">
              <Target className="w-4 h-4" /> 批量推入计划
            </button>
          </div>
        </div>
      </header>

      {/* Filters Bar */}
      <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-2xl shadow-sm border border-white">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input 
              type="text" 
              placeholder="搜索素材名称、ID 或 原始素材 ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-none rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary outline-none shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl text-sm font-bold text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/30">
            <Filter className="w-4 h-4" /> 高级筛选
          </button>
        </div>
        <div className="flex items-center gap-6 pr-4">
          <div className="text-right">
            <div className="text-[10px] uppercase font-black text-outline tracking-wider">今日总消耗</div>
            <div className="text-lg font-black text-on-surface">¥188,180</div>
          </div>
          <div className="text-right border-l border-outline-variant/30 pl-6">
            <div className="text-[10px] uppercase font-black text-outline tracking-wider">平均 ROI</div>
            <div className="text-lg font-black text-secondary">3.24</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((material) => (
          <div key={material.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-outline-variant/30 transition-all hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={material.image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt={material.name}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                  <Play className="w-6 h-6 fill-current" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <span className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border",
                  material.status === "投放中" ? "bg-secondary text-white border-secondary/20" : "bg-surface-container-highest text-outline border-white/20"
                )}>
                  {material.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white text-[10px] font-bold bg-black/40 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10">
                   <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {material.updatedAt}</span>
                   <span>{material.platform}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{material.id}</span>
                  <span className="text-[10px] font-bold text-outline">来源: {material.originalId}</span>
                </div>
                <h3 className="font-headline font-extrabold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{material.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-surface-container-low rounded-2xl">
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-1">消耗</p>
                  <p className="text-sm font-black text-on-surface">{material.spend}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-1">ROI</p>
                  <p className={cn("text-sm font-black", Number(material.roi) > 3 ? "text-secondary" : "text-on-surface")}>{material.roi}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-1">CTR</p>
                  <p className="text-sm font-black text-on-surface">{material.ctr}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-outline uppercase tracking-wider mb-1">CVR</p>
                  <p className="text-sm font-black text-on-surface">{material.cvr}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-2.5 bg-surface-container text-on-surface font-black text-xs rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                   <TrendingUp className="w-3 h-3" /> 数据对比
                </button>
                <button className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center hover:bg-primary/10 transition-all">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-on-surface to-on-surface-variant rounded-[3rem] text-white flex flex-col items-center text-center overflow-hidden relative shadow-2xl">
        <div className="relative z-10 space-y-4 max-w-2xl">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
              <RefreshCw className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest">自动化接口对接</span>
           </div>
           <h2 className="text-3xl font-headline font-extrabold uppercase italic tracking-tighter">API 数据智能同步系统</h2>
           <p className="text-sm font-medium opacity-60 leading-relaxed uppercase tracking-wider">
             正在连接 巨量千川 OPEN API 接口。投放素材的 消耗、ROI、点击率、转化率 数据将实时回传到素材库，实现拍摄素材与投放效果的闭环。
           </p>
           <div className="pt-4 flex gap-4 justify-center">
              <div className="px-6 py-3 border border-white/20 rounded-2xl backdrop-blur-md">
                 <div className="text-[10px] font-bold opacity-40 mb-1">连接状态</div>
                 <div className="text-sm font-black flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                   ESTABLISHED
                 </div>
              </div>
              <div className="px-6 py-3 border border-white/20 rounded-2xl backdrop-blur-md">
                 <div className="text-[10px] font-bold opacity-40 mb-1">数据吞吐量</div>
                 <div className="text-sm font-black flex items-center gap-2">
                   <TrendingUp className="w-4 h-4" />
                   1.2 GB / HOUR
                 </div>
              </div>
           </div>
        </div>
        <BarChart2 className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 rotate-12" />
      </div>
    </div>
  );
}
