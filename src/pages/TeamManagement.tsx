import { 
  History, 
  FolderPlus, 
  ArrowRight, 
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// Removed members data - moved to Settings

export default function TeamManagement() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs text-outline mb-2">
          <span>管理中心</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-on-surface font-medium">团队资产协作 (Team Assets)</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">团队协作中心</h1>
            <p className="text-on-surface-variant mt-2 max-w-lg">监管团队共享工作空间、内容流转效率及最新协作动态。</p>
          </div>
          <button className="bg-surface-container-high text-on-surface px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all">
            <History className="w-5 h-5" />
            协作统计报告
          </button>
        </div>
      </header>

      {/* Top: Team Workspace */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-headline font-bold text-on-surface flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderPlus className="w-5 h-5 text-primary" />
             </div>
             团队共享工作空间
          </h2>
          <button className="text-primary text-sm font-black hover:underline uppercase tracking-widest">进入管理后台</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-white hover:border-primary/20 transition-all cursor-pointer flex flex-col justify-between h-56">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center mb-6 text-2xl">📁</div>
              <h3 className="text-xl font-black mb-1">待剪辑原始库</h3>
              <p className="text-[10px] text-outline font-black uppercase tracking-widest">12 个高频协作文件</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => <img key={i} src={`https://picsum.photos/seed/u${i}/40/40`} className="w-6 h-6 rounded-full border-2 border-white" referrerPolicy="no-referrer" />)}
               </div>
               <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="group bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-white hover:border-primary/20 transition-all cursor-pointer flex flex-col justify-between h-56">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center mb-6 text-2xl">🧪</div>
              <h3 className="text-xl font-black mb-1">创意改编实验室</h3>
              <p className="text-[10px] text-outline font-black uppercase tracking-widest">45 个活跃 Remix 方案</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
               <div className="flex -space-x-2">
                  {[4,5,6].map(i => <img key={i} src={`https://picsum.photos/seed/u${i}/40/40`} className="w-6 h-6 rounded-full border-2 border-white" referrerPolicy="no-referrer" />)}
               </div>
               <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-primary/30 h-56 flex flex-col justify-center">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">资产协作负载</p>
              <h3 className="text-4xl font-black font-headline mb-4">84%</h3>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm text-[10px] font-black">
                <TrendingUp className="w-3 h-3" />
                较昨日活跃度 +12%
              </div>
            </div>
            <TrendingUp className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 rotate-12" />
          </div>
        </div>
      </section>

      {/* Replaced member list with a simplified status and link to settings for admins */}
      <section className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-white">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-headline font-bold text-on-surface">协作状态总览</h2>
           <button className="text-xs font-black text-primary flex items-center gap-2 hover:underline">
             前往设置中心管理人员权限 <ArrowRight className="w-3 h-3" />
           </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: "活跃成员", value: "24", sub: "近24小时", icon: "👥" },
             { label: "资源贡献", value: "1,240", sub: "累计上传", icon: "💎" },
             { label: "改编方案", value: "482", sub: "累计产出", icon: "⚡" },
             { label: "审核中", value: "12", sub: "待处理资产", icon: "⚖️" },
           ].map((stat, i) => (
             <div key={i} className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/5">
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black text-on-surface">{stat.value}</div>
                <div className="text-xs font-bold text-outline mt-1 uppercase tracking-widest">{stat.label} · {stat.sub}</div>
             </div>
           ))}
        </div>
      </section>

      {/* Logs section stays as it's collaboration dynamic */}
      <section className="bg-surface-container-low/30 rounded-3xl p-8 border border-dashed border-outline-variant/30">
        <div className="flex items-center gap-3 mb-8">
           <History className="w-5 h-5 text-outline" />
           <h3 className="font-headline font-bold text-outline uppercase tracking-widest text-sm">最近协作变动</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[
             { actor: "张伟", action: "修改了 李娜 的权限", time: "10分钟前", detail: "Master Library -> 仅读取" },
             { actor: "系统", action: "自动同步了 Personnel 目录", time: "2小时前", detail: "成功同步 3 个新账号" },
           ].map((log, i) => (
             <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-black">LOG</div>
                <div>
                   <div className="text-sm font-black text-on-surface">{log.actor} {log.action}</div>
                   <div className="text-[10px] text-outline font-medium mt-1 uppercase tracking-widest">{log.time} · {log.detail}</div>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
