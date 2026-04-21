import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderKanban,
  Library, 
  Sparkles, 
  Rocket, 
  BarChart3, 
  Users, 
  Settings,
  Cpu,
  Target
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "控制台", path: "/" },
  { icon: FolderKanban, label: "项目管理", path: "/projects" },
  { icon: Library, label: "拍摄素材库", path: "/materials" },
  { icon: Target, label: "投放素材", path: "/ad-materials" },
  { icon: Sparkles, label: "创意中心", path: "/creative" },
  { icon: Rocket, label: "投放管理", path: "/campaigns" },
  { icon: BarChart3, label: "数据中心", path: "/data" },
  { icon: Users, label: "人员管理", path: "/team" },
  { icon: Settings, label: "设置", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-surface-container-low flex flex-col z-50">
      <div className="px-6 py-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-xl shadow-lg shadow-primary/20">
          <Cpu className="text-white w-6 h-6" />
        </div>
        <div>
          <div className="text-xl font-extrabold text-[#0062FF] font-headline tracking-tighter">千川素材</div>
          <div className="text-[10px] uppercase tracking-widest text-outline font-bold">Precision Curator</div>
        </div>
      </div>

      <nav className="flex-1 mt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 px-6 py-3 font-medium transition-all duration-200 hover:bg-surface-container hover:translate-x-1",
              isActive 
                ? "text-primary font-bold bg-white border-l-4 border-primary" 
                : "text-on-surface-variant"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.path === window.location.pathname && "fill-current")} />
            <span className="font-headline font-semibold tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-outline-variant/10">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <span className="text-xs font-bold text-outline">系统运行正常</span>
        </div>
      </div>
    </aside>
  );
}
