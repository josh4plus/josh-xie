import { 
  BrainCircuit, 
  Sparkles, 
  Upload, 
  Cpu,
  Zap,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  ArrowRight,
  PlayCircle as PlayCircleIcon,
  PlusCircle,
  FileText
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const templates = [
  { id: 1, name: "极简风穿搭展示 · 转场快闪", ctr: "4.8%", roi: "3.2", used: "1.2w", tag: "AI 精选", aspect: "aspect-[9/16]", image: "https://picsum.photos/seed/temp1/400/711" },
  { id: 2, name: "美妆好物测评 · 沉浸式开箱", ctr: "5.2%", roi: "4.1", used: "8.5k", aspect: "aspect-[9/14]", image: "https://picsum.photos/seed/temp2/400/622" },
  { id: 3, name: "数码极客 · 性能测试对比", ctr: "6.1%", roi: "2.8", used: "2.1w", tag: "🔥 爆款", aspect: "aspect-[1/1]", image: "https://picsum.photos/seed/temp3/400/400" },
  { id: 4, name: "深夜食堂 · 治愈系美食短片", ctr: "3.9%", roi: "3.5", used: "1.5w", aspect: "aspect-[9/16]", image: "https://picsum.photos/seed/temp4/400/711" },
];

export default function CreativeCenter() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header>
        <h1 className="text-[2.5rem] font-extrabold tracking-tight text-on-surface mb-2 font-headline">AI 混剪实验室</h1>
        <p className="text-on-surface-variant max-w-2xl font-medium">利用先进的 AI 算法，基于母版素材快速生成具备高转化潜力的视频。每一帧都经过精准策展。</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Stepper Container */}
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h3 className="font-headline text-lg font-bold">选择母版素材</h3>
                  <p className="text-xs text-on-surface-variant">支持视频、高清图片</p>
                </div>
              </div>
              <ArrowRight className="text-outline-variant w-5 h-5" />
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant font-bold">2</div>
                <div>
                  <h3 className="font-headline text-lg font-bold">智能模板</h3>
                  <p className="text-xs text-on-surface-variant">AI 自动匹配节奏</p>
                </div>
              </div>
              <ArrowRight className="text-outline-variant w-5 h-5" />
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant font-bold">3</div>
                <div>
                  <h3 className="font-headline text-lg font-bold">预览生成</h3>
                  <p className="text-xs text-on-surface-variant">导出高转化素材</p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer border-2 border-dashed border-outline-variant rounded-xl p-12 flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-primary/5 hover:border-primary transition-all duration-300">
              <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <Upload className="text-primary w-10 h-10" />
              </div>
              <h4 className="text-xl font-headline font-bold mb-2">点击或拖拽上传母版</h4>
              <p className="text-on-surface-variant text-sm mb-6">推荐分辨率 1080x1920，时长 15-60s</p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-surface-container-high text-on-surface rounded-lg font-medium text-sm hover:bg-surface-container-highest">从素材库选择</button>
                <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium text-sm shadow-md">立即上传</button>
              </div>
            </div>
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl text-white relative overflow-hidden">
               <div className="relative z-10">
                <Sparkles className="mb-4 opacity-80 w-6 h-6" />
                <h4 className="text-lg font-headline font-bold mb-1">AI 效率提升</h4>
                <p className="text-3xl font-headline font-extrabold mb-2">420%</p>
                <p className="text-xs opacity-70">相比传统剪辑流程，平均节省 4.5 小时/日</p>
              </div>
              <Zap className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-white">
              <TrendingUpIcon className="mb-4 text-secondary w-6 h-6" />
              <h4 className="text-lg font-headline font-bold mb-1">母版爆率预测</h4>
              <p className="text-3xl font-headline font-extrabold mb-2 text-secondary">88.5%</p>
              <p className="text-xs text-on-surface-variant">基于当前行业热度，您的母版极具潜力</p>
            </div>
          </div>
        </div>

        {/* Sidebar Script Assistant */}
        <aside className="bg-surface-container-high/50 rounded-xl p-8 backdrop-blur-sm border border-white">
          <div className="flex items-center gap-3 mb-6">
            <BrainCircuit className="text-primary w-6 h-6" />
            <h3 className="font-headline text-xl font-bold">AI 脚本助手</h3>
          </div>
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
            输入产品核心卖点，AI 瞬间为您生成 5 套针对性拍摄脚本。
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">产品/关键词</label>
              <input 
                className="w-full bg-white border-none rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 text-sm shadow-sm outline-none" 
                placeholder="例如：高端护肤品、轻盈控油..." 
                type="text"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">受众人群</label>
              <select className="w-full bg-white border-none rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 text-sm shadow-sm appearance-none outline-none">
                <option>25-35岁 职场女性</option>
                <option>Z世代 潮流玩家</option>
                <option>精致妈妈</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">脚本风格</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 px-3 rounded bg-white text-xs font-medium border border-primary text-primary">产品测评</button>
                <button className="py-2 px-3 rounded bg-white text-xs font-medium border border-transparent hover:border-outline-variant">剧情演绎</button>
                <button className="py-2 px-3 rounded bg-white text-xs font-medium border border-transparent hover:border-outline-variant">纯干货分享</button>
                <button className="py-2 px-3 rounded bg-white text-xs font-medium border border-transparent hover:border-outline-variant">沉浸式Vlog</button>
              </div>
            </div>
            <button className="w-full mt-4 py-4 bg-on-surface text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Cpu className="w-5 h-5" />
              生成脚本方案
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-outline-variant/30">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase mb-4">最近生成</h4>
            <div className="space-y-3">
              <div className="bg-white/40 p-3 rounded-lg text-sm flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <span className="truncate">护肤品测评-快节奏版.pdf</span>
                <DownloadIcon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
              </div>
              <div className="bg-white/40 p-3 rounded-lg text-sm flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                <span className="truncate">口红试色-氛围感脚本.docx</span>
                <DownloadIcon className="w-4 h-4 text-slate-400 group-hover:text-primary" />
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Template Gallery */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-headline text-2xl font-bold mb-2">热门素材模板</h2>
            <p className="text-on-surface-variant">当前千川全网高点击、高转化视频模板实时更新</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline">
            查看全部 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {templates.map((t) => (
            <div key={t.id} className="break-inside-avoid group cursor-pointer">
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <div className={cn(t.aspect, "bg-slate-200 relative overflow-hidden")}>
                  <img 
                    src={t.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={t.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircleIcon className="text-white w-12 h-12 fill-white/20" />
                  </div>
                  {t.tag && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-primary flex items-center gap-1 shadow-sm">
                      <Zap className="w-3 h-3 fill-current" />
                      {t.tag}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-on-surface mb-2">{t.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-secondary font-extrabold">CTR {t.ctr}</span>
                      <span className="text-xs text-on-surface-variant font-medium">ROI {t.roi}</span>
                    </div>
                    <span className="text-[11px] text-outline bg-surface-container-low px-2 py-0.5 rounded-full">{t.used} 人已用</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-on-surface text-white rounded-full shadow-2xl flex items-center justify-center group active:scale-90 transition-all z-50">
        <Sparkles className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        <div className="absolute right-16 bg-on-surface text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          智能生成建议
        </div>
      </button>
    </div>
  );
}
