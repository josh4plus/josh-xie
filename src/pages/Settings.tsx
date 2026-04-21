import { 
  Camera, 
  Plus, 
  RefreshCcw, 
  Trash2, 
  Lock, 
  Verified, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Settings() {
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
          <p className="text-on-surface-variant text-sm font-medium">管理您的个人账户、平台集成及安全首选项</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-outline-variant/30">
        <div className="flex gap-8">
          <button className="border-b-2 border-primary text-on-surface pb-3 pt-2 text-sm font-black transition-all">个人信息</button>
          <button className="border-b-2 border-transparent text-outline hover:text-on-surface transition-colors pb-3 pt-2 text-sm font-bold">平台集成</button>
          <button className="border-b-2 border-transparent text-outline hover:text-on-surface transition-colors pb-3 pt-2 text-sm font-bold">通知偏好</button>
          <button className="border-b-2 border-transparent text-outline hover:text-on-surface transition-colors pb-3 pt-2 text-sm font-bold">安全设置</button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Section: Personal Info */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white">
          <h3 className="text-xl font-headline font-bold mb-8">个人信息</h3>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-8">
              <div className="relative group cursor-pointer">
                <img 
                  src="https://picsum.photos/seed/user/200/200" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-surface-container-low grayscale group-hover:grayscale-0 transition-all" 
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="font-headline font-extrabold text-lg">更换头像</p>
                <p className="text-xs text-outline font-medium mt-1">支持 JPG、PNG 或 GIF。最大 2MB。</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-wider">用户名</label>
                <input 
                  className="bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all" 
                  type="text" 
                  defaultValue="张小川"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-wider">手机号</label>
                <div className="flex gap-2">
                  <input 
                    className="flex-1 bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm text-outline cursor-not-allowed font-bold" 
                    disabled 
                    type="text" 
                    defaultValue="+86 138 **** 8888"
                  />
                  <button className="text-primary text-sm font-black px-4 hover:underline">修改</button>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-black text-on-surface-variant uppercase tracking-wider">邮箱绑定</label>
                <div className="flex gap-3">
                  <input 
                    className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-primary outline-none" 
                    placeholder="xiaochuan@example.com" 
                    type="email"
                  />
                  <button className="bg-primary px-8 py-3.5 rounded-xl text-white text-sm font-black shadow-lg shadow-primary/20 hover:opacity-90">绑定</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Platform Integrations */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-headline font-bold">平台集成</h3>
            <button className="text-primary text-sm font-black flex items-center gap-1 hover:underline">
              <Plus className="w-4 h-4" /> 新增授权
            </button>
          </div>
          <div className="border border-surface-container-low rounded-2xl p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-on-surface flex items-center justify-center text-white font-black text-[10px] p-2 text-center leading-tight">
                巨量<br/>千川
              </div>
              <div>
                <p className="font-headline font-extrabold text-lg">Ocean Engine Integration</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-secondary/10 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span className="text-[10px] text-secondary font-black">已授权</span>
                  </div>
                  <span className="text-[10px] text-outline font-bold">有效期至 2024-12-31</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-xl text-sm font-black bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2">
                <RefreshCcw className="w-4 h-4" /> 重新授权
              </button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-black text-error hover:bg-error-container/20 transition-colors flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> 解绑
              </button>
            </div>
          </div>
        </section>

        {/* Section: Security */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-white">
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
              <button className="mt-auto w-full py-3.5 bg-surface-container-low text-on-surface text-sm font-black rounded-xl hover:bg-surface-container-high transition-all">立即修改</button>
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
              <button className="mt-auto w-full py-3.5 bg-primary text-white text-sm font-black rounded-xl shadow-lg shadow-primary/20 hover:opacity-90">开启保护</button>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 pt-8 border-t border-outline-variant/30">
          <button className="px-10 py-3.5 rounded-xl text-sm font-black text-outline hover:text-on-surface transition-colors">取消修改</button>
          <button className="px-12 py-3.5 bg-gradient-to-br from-primary to-primary-container rounded-xl text-white text-sm font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">保存所有更改</button>
        </div>
      </div>
    </div>
  );
}
