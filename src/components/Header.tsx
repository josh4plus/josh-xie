import { Search, Bell, HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-white/80 backdrop-blur-xl flex justify-between items-center px-8 border-b border-outline-variant/10">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input 
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-sans outline-none" 
            placeholder="搜索素材名称或ID..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-outline hover:text-primary transition-all relative p-2 rounded-full hover:bg-surface-container">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="text-outline hover:text-primary transition-all p-2 rounded-full hover:bg-surface-container">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-outline-variant/30"></div>
        
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right">
            <div className="text-xs font-bold font-sans">千川管理员</div>
            <div className="text-[10px] text-outline">Administrator</div>
          </div>
          <img 
            alt="Administrator" 
            className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-primary transition-all object-cover" 
            referrerPolicy="no-referrer"
            src="https://picsum.photos/seed/admin/100/100" 
          />
        </div>
      </div>
    </header>
  );
}
