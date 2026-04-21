import { 
  UserPlus, 
  Search, 
  Filter, 
  SortAsc, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronDown,
  ShieldCheck,
  Lock,
  History,
  FolderPlus,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const members = [
  { id: 1, name: "张伟 (David Zhang)", email: "david.z@qianchuan.com", role: "管理员", assets: 156, edits: 12, progress: 85, access: "管理员", image: "https://picsum.photos/seed/p1/100/100" },
  { id: 2, name: "李娜 (Lina Li)", email: "lina.l@qianchuan.com", role: "编辑", assets: 89, edits: 34, progress: 45, access: "编辑", image: "https://picsum.photos/seed/p2/100/100" },
  { id: 3, name: "陈小龙 (Bruce Chen)", email: "bruce.c@qianchuan.com", role: "编辑", assets: 12, edits: 5, progress: 10, access: "编辑", image: "https://picsum.photos/seed/p3/100/100" },
];

export default function TeamManagement() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs text-outline mb-2">
          <span>管理中心</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-on-surface font-medium">人员管理 (Personnel)</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">团队资产协作</h1>
            <p className="text-on-surface-variant mt-2 max-w-lg">管理您的团队成员、权限分配及个人工作空间状态。</p>
          </div>
          <button className="bg-surface-container-high text-on-surface px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all hover:bg-surface-container-highest">
            <UserPlus className="w-4 h-4" />
            邀请成员
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Mini Dashboard */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                <FolderPlus className="text-primary w-5 h-5" />
                我的工作空间
              </h3>
              <span className="text-primary text-sm font-semibold cursor-pointer hover:underline">管理库</span>
            </div>
            <div className="space-y-4">
              <div className="group flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-primary-container hover:text-white transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                     <span className="text-xl">📁</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">待剪辑视频</div>
                    <div className="text-xs opacity-60">12 个资源</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="group flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-primary-container hover:text-white transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                     <span className="text-xl">🧪</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">Remix 实验室</div>
                    <div className="text-xs opacity-60">45 个活跃创意</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 text-white overflow-hidden relative shadow-lg shadow-primary/20">
            <div className="relative z-10">
              <div className="text-sm opacity-80 mb-1">团队总活跃度</div>
              <div className="text-4xl font-headline font-bold mb-4">84%</div>
              <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md">
                <TrendingUp className="w-3 h-3" />
                比上周增长 12%
              </div>
            </div>
            <TrendingUp className="absolute -right-4 -bottom-4 w-40 h-40 opacity-10 rotate-12" />
          </div>
        </div>

        {/* Members List */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-surface-container-low">
              <h3 className="font-headline font-bold text-lg">团队成员与权限</h3>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                  <Filter className="w-4 h-4 text-outline" />
                </button>
                <button className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                  <SortAsc className="w-4 h-4 text-outline" />
                </button>
              </div>
            </div>
            
            <div className="w-full">
              <div className="grid grid-cols-12 px-6 py-4 text-[10px] text-outline uppercase tracking-widest font-bold bg-surface-container-low/30">
                <div className="col-span-4">成员信息</div>
                <div className="col-span-2">角色</div>
                <div className="col-span-3">工作空间状态</div>
                <div className="col-span-2 text-center">Master 权限</div>
                <div className="col-span-1 text-right">操作</div>
              </div>
              
              <div className="divide-y divide-surface-container-low">
                {members.map((m) => (
                  <div key={m.id} className="grid grid-cols-12 px-6 py-6 items-center hover:bg-surface-container-low/50 transition-colors group">
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5">
                        <img 
                          src={m.image} 
                          className="w-full h-full object-cover rounded-full" 
                          alt={m.name}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">{m.name}</div>
                        <div className="text-xs text-on-surface-variant">{m.email}</div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className={cn(
                        "px-3 py-1 text-xs font-bold rounded-full",
                        m.role === '管理员' ? "bg-primary/10 text-primary" : "bg-surface-container-high text-on-surface-variant"
                      )}>
                        {m.role}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <div className="text-xs font-bold text-on-surface mb-1.5">{m.assets} 资产 / {m.edits} 改编</div>
                      <div className="w-32 h-1 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${m.progress}%` }}></div>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-center">
                       <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          m.access === '管理员' ? "bg-secondary" : m.role === '编辑' ? "bg-primary" : "bg-error"
                        )}></div>
                        <span className="text-xs font-bold">{m.access}</span>
                      </div>
                    </div>
                    <div className="col-span-1 text-right">
                      <button className="p-2 text-outline hover:text-on-surface hover:bg-surface-container rounded-lg transition-all">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-surface-container-low flex justify-center">
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline group">
                查看全部 24 位成员
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Permission Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-surface-container p-8 rounded-2xl">
          <h2 className="text-2xl font-headline font-bold mb-6">权限策略配置</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-transparent hover:border-primary transition-all cursor-pointer group">
              <ShieldCheck className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold mb-2">资产入库审核</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">开启后，Editor角色的成员上传至 Master Library 的资源需要 Admin 审核。</p>
              <div className="mt-auto flex items-center gap-3">
                <div className="w-10 h-5 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-xs font-bold">已开启</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl border border-transparent hover:border-primary transition-all cursor-pointer group">
              <Lock className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-bold mb-2">私有空间隔离</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">每个成员的工作空间默认互不可见，仅管理员可穿透查看。</p>
              <div className="mt-auto flex items-center gap-3">
                <div className="w-10 h-5 bg-surface-container-highest rounded-full relative">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-outline rounded-full"></div>
                </div>
                <span className="text-xs font-bold text-outline">未开启</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-primary" />
              <h3 className="font-headline text-xl font-bold">最近权限变更日志</h3>
            </div>
            <div className="space-y-6">
              {[
                { actor: "张伟", action: "修改了 李娜 的权限", time: "10分钟前", detail: "Master Library -> 仅读取", color: "bg-primary" },
                { actor: "系统", action: "自动同步了 Personnel 目录", time: "2小时前", detail: "成功同步 3 个新账号", color: "bg-secondary" },
                { actor: "陈小龙", action: "申请了 素材库导出权限", time: "昨日 18:45", detail: "等待审核中", color: "bg-primary" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn("w-2 h-2 rounded-full mb-2", log.color)}></div>
                    {i !== 2 && <div className="w-0.5 flex-1 bg-surface-container-high"></div>}
                  </div>
                  <div className={cn(i !== 2 && "pb-4")}>
                    <div className="text-sm font-bold">{log.actor} {log.action}</div>
                    <div className="text-[11px] text-outline mt-1 font-medium">{log.time} · {log.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 text-primary font-bold text-sm w-full py-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors">
              查看完整安全日志
            </button>
          </div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-surface-container rounded-full opacity-50 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
