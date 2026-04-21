import { useState, useEffect } from "react";
import { 
  Plus, 
  RefreshCcw, 
  Trash2, 
  Lock, 
  Verified, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Link as LinkIcon,
  Loader2,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  History
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const members = [
  { id: 1, name: "张伟 (David Zhang)", email: "david.z@qianchuan.com", role: "管理员", assets: 156, edits: 12, progress: 85, access: "管理员", image: "https://picsum.photos/seed/p1/100/100" },
  { id: 2, name: "李娜 (Lina Li)", email: "lina.l@qianchuan.com", role: "编辑", assets: 89, edits: 34, progress: 45, access: "编辑", image: "https://picsum.photos/seed/p2/100/100" },
  { id: 3, name: "陈小龙 (Bruce Chen)", email: "bruce.c@qianchuan.com", role: "编辑", assets: 12, edits: 5, progress: 10, access: "编辑", image: "https://picsum.photos/seed/p3/100/100" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'platforms' | 'team' | 'security'>('platforms');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appId, setAppId] = useState(() => localStorage.getItem("ocean_engine_app_id") || "");
  const [clientSecret, setClientSecret] = useState(() => localStorage.getItem("ocean_engine_secret") || "");

  useEffect(() => {
    // 每次输入变化时保存到本地，方便下次使用
    localStorage.setItem("ocean_engine_app_id", appId);
    localStorage.setItem("ocean_engine_secret", clientSecret);
  }, [appId, clientSecret]);

  useEffect(() => {
    // 检查本地存储的授权状态
    const connected = localStorage.getItem("ocean_engine_connected") === "true";
    setIsConnected(connected);

    const handleMessage = (event: MessageEvent) => {
      // 验证来源：在开发环境和正式环境下都允许
      const isAllowedOrigin = event.origin.endsWith('.run.app') || event.origin.includes('localhost') || event.origin.includes('googleusercontent.com');
      if (!isAllowedOrigin) return;
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setIsConnected(true);
        localStorage.setItem("ocean_engine_connected", "true");
        alert("授权成功！已成功连接到巨量千川资产管理中心。");
      }
      if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        alert("授权失败: " + (event.data.error || "未知原因"));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnect = async () => {
    if (!appId) {
      alert("请先填写巨量引擎应用的 APPID");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/auth/url?app_id=${encodeURIComponent(appId)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '无法获取授权地址');
      }
      const { url } = await response.json();

      const width = 600;
      const height = 750;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      window.open(
        url, 
        'ocean_engine_oauth', 
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
      );
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "启动授权失败，请确保您已配置环境变量。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    if (confirm("确定要解除巨量千川的平台授权吗？解绑后将无法同步实时投放数据。")) {
      setIsConnected(false);
      localStorage.removeItem("ocean_engine_connected");
    }
  };

  const handleSaveAll = () => {
    alert("设置已保存：平台集成参数与安全首选项已成功同步到系统。");
  };

  const handleSecurityAction = (action: string) => {
    alert(`安全验证逻辑已启动：正在跳转至 ${action} 验证流程...`);
  };

  const handleAddAccount = () => {
    alert("正在打开账号开通向导：请输入新成员的企业邮箱并分配系统角色。");
  };

  const handleMemberAction = (name: string) => {
    alert(`正在对成员 ${name} 执行权限细化管理...`);
  };

  return (
    <div className="max-w-5xl space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-xs text-outline font-bold uppercase tracking-widest">
          <span>管理中心</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-on-surface">设置</span>
        </nav>
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">设置中心</h2>
          <p className="text-on-surface-variant text-sm font-medium">管理平台授权、团队成员、权限策略及安全首选项</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-outline-variant/30">
        <div className="flex gap-8">
          <button 
            onClick={() => setActiveTab('platforms')}
            className={cn(
              "border-b-2 pb-3 pt-2 text-sm font-black transition-all",
              activeTab === 'platforms' ? "border-primary text-on-surface" : "border-transparent text-outline hover:text-on-surface"
            )}
          >
            平台集成
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={cn(
              "border-b-2 pb-3 pt-2 text-sm font-black transition-all",
              activeTab === 'team' ? "border-primary text-on-surface" : "border-transparent text-outline hover:text-on-surface"
            )}
          >
            团队与权限
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={cn(
              "border-b-2 pb-3 pt-2 text-sm font-black transition-all",
              activeTab === 'security' ? "border-primary text-on-surface" : "border-transparent text-outline hover:text-on-surface"
            )}
          >
            安全设置
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {activeTab === 'platforms' && (
          /* Section: Platform Integrations */
          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white animate-in slide-in-from-left-4 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-headline font-bold">平台集成</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-outline uppercase tracking-widest px-2 py-1 bg-surface-container-low rounded">OAuth 2.0 安全连接</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-wider">APPID (应用 ID)</label>
                <input 
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  placeholder="请输入巨量引擎 AppID"
                  className="bg-white border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline/40 shadow-sm" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-wider">Secret (应用密钥)</label>
                <input 
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}
                  type="password"
                  placeholder="请输入巨量引擎 Secret"
                  className="bg-white border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-outline/40 shadow-sm" 
                />
              </div>
              <p className="md:col-span-2 text-[10px] text-outline font-medium leading-relaxed">
                * APPID 和 Secret 可在 <a href="https://open.oceanengine.com/" target="_blank" className="text-primary hover:underline">巨量引擎开放平台</a> 的应用详情页获取。请确保您的应用已配置正确的回调地址。
              </p>
            </div>

            <div className={cn(
              "border rounded-2xl p-6 flex items-center justify-between group transition-all",
              isConnected ? "border-primary/20 bg-primary/[0.02]" : "border-surface-container-low"
            )}>
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center font-black text-[10px] p-2 text-center leading-tight transition-colors",
                  isConnected ? "bg-primary text-white" : "bg-on-surface text-white"
                )}>
                  巨量<br/>千川
                </div>
                <div>
                  <p className="font-headline font-extrabold text-lg">巨量引擎 Ocean Engine</p>
                  <div className="flex items-center gap-3 mt-1">
                    {isConnected ? (
                      <>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-secondary/10 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          <span className="text-[10px] text-secondary font-black">已正式授权</span>
                        </div>
                        <span className="text-[10px] text-outline font-bold">同步状态：实时监控中</span>
                      </>
                    ) : (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-surface-container-high rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                        <span className="text-[10px] text-outline font-black">未连接</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                {!isConnected ? (
                  <button 
                    onClick={handleConnect}
                    disabled={isLoading}
                    className="px-8 py-2.5 rounded-xl text-sm font-black bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LinkIcon className="w-4 h-4" />} 
                    立即绑定
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleConnect}
                      className="px-5 py-2.5 rounded-xl text-sm font-black bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2"
                    >
                      <RefreshCcw className="w-4 h-4" /> 重新授权
                    </button>
                    <button 
                      onClick={handleDisconnect}
                      className="px-5 py-2.5 rounded-xl text-sm font-black text-error hover:bg-error-container/20 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> 解绑
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'team' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Personnel and Account Activation */}
            <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-headline font-bold">人员与账号开通</h3>
                  <p className="text-xs text-outline font-medium mt-1">管理团队成员接入状态与系统角色分配</p>
                </div>
                <button 
                  onClick={handleAddAccount}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform"
                >
                  <UserPlus className="w-4 h-4" />
                  新建账号
                </button>
              </div>

              <div className="bg-surface-container-low/30 rounded-2xl overflow-hidden border border-outline-variant/10">
                <div className="grid grid-cols-12 px-6 py-4 text-[10px] text-outline font-black uppercase tracking-widest bg-surface-container-low/50 border-b border-outline-variant/10">
                  <div className="col-span-5">成员信息</div>
                  <div className="col-span-3 text-center">系统角色</div>
                  <div className="col-span-3 text-center">权限级别</div>
                  <div className="col-span-1 text-right">操作</div>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  {members.map((m) => (
                    <div key={m.id} className="grid grid-cols-12 px-6 py-5 items-center hover:bg-primary/[0.02] transition-colors group">
                      <div className="col-span-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                          <img src={m.image} className="w-full h-full object-cover" alt={m.name} referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="font-black text-on-surface text-sm">{m.name}</div>
                          <div className="text-[10px] text-outline font-medium">{m.email}</div>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <span className={cn(
                          "px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-wider",
                          m.role === '管理员' ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant"
                        )}>
                          {m.role}
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-lg border border-outline-variant/5">
                          <div className={cn("w-1.5 h-1.5 rounded-full", m.access === '管理员' ? "bg-secondary" : "bg-primary")}></div>
                          <span className="text-[10px] font-black">{m.access}</span>
                        </div>
                      </div>
                      <div className="col-span-1 text-right">
                        <button 
                          onClick={() => handleMemberAction(m.name)}
                          className="p-2 text-outline hover:text-on-surface transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Permission Policies */}
            <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white">
              <h3 className="text-xl font-headline font-bold mb-8">权限管理政策</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-low p-6 rounded-2xl border border-transparent hover:border-primary/30 transition-all cursor-pointer group">
                  <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                  <h4 className="text-lg font-black mb-2">资产入库审核</h4>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">开启后，Editor角色的成员上传至 Master Library 的资源需要 Admin 审核后方可正式入库。</p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md"></div>
                    </div>
                    <span className="text-xs font-black text-primary">已开启策略</span>
                  </div>
                </div>
                <div className="bg-surface-container-low p-6 rounded-2xl border border-transparent hover:border-primary/30 transition-all cursor-pointer group">
                  <Lock className="w-10 h-10 text-primary mb-4" />
                  <h4 className="text-lg font-black mb-2">私有空间隔离</h4>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">每个团队成员的工作空间默认互不可见，仅管理员拥有穿透查看与管理的权限。</p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-12 h-6 bg-surface-container-highest rounded-full relative shadow-inner">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-outline rounded-full shadow-md"></div>
                    </div>
                    <span className="text-xs font-black text-outline">未开启策略</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Logs component extracted for Settings */}
            <section className="bg-surface-container-low/30 rounded-2xl p-6 border border-dashed border-outline-variant/30">
              <div className="flex items-center gap-3 mb-6">
                <History className="w-4 h-4 text-outline" />
                <h4 className="text-[10px] font-black text-outline uppercase tracking-widest">最近权限变更日志</h4>
              </div>
              <div className="space-y-4">
                {[
                  { actor: "张伟", action: "修改了 李娜 的权限", time: "10分钟前" },
                  { actor: "系统", action: "同步了 LDAP 目录", time: "2小时前" },
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-on-surface">{log.actor} {log.action}</span>
                    <span className="text-[10px] text-outline">{log.time}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'security' && (
          /* Section: Security */
          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white animate-in slide-in-from-right-4 duration-300">
            <h3 className="text-xl font-headline font-bold mb-8">安全设置</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col p-6 rounded-2xl border border-surface-container-low hover:border-primary/30 transition-all group h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-surface-container group-hover:bg-primary group-hover:text-white transition-colors">
                    <Lock className="w-6 h-6" />
                  </div>
                  <p className="font-headline font-extrabold text-lg">修改登录密码</p>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">定期更换密码可以提高账户安全性。建议使用字母、数字和符号的组合。</p>
                <button 
                  onClick={() => handleSecurityAction('修改密码')}
                  className="mt-auto w-full py-3.5 bg-surface-container-low text-on-surface text-sm font-black rounded-xl hover:bg-surface-container-high transition-all"
                >
                  立即修改
                </button>
              </div>
              <div className="flex flex-col p-6 rounded-2xl border border-surface-container-low hover:border-primary/30 transition-all group h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-surface-container group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className="font-headline font-extrabold text-lg">双重验证 (2FA)</p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-error-container text-on-error-container rounded-full font-black uppercase">未开启</span>
                </div>
                <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">开启双重验证后，在登录或关键操作时需要输入手机验证码，确保账户安全。</p>
                <button 
                  onClick={() => handleSecurityAction('双重验证')}
                  className="mt-auto w-full py-3.5 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/20 hover:opacity-90"
                >
                  开启保护
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-8 border-t border-outline-variant/30">
          <button className="px-10 py-3.5 rounded-xl text-sm font-black text-outline hover:text-on-surface transition-colors">取消修改</button>
          <button 
            onClick={handleSaveAll}
            className="px-12 py-3.5 bg-gradient-to-br from-primary to-primary-container rounded-xl text-white text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            保存所有更改
          </button>
        </div>
      </div>
    </div>
  );
}
