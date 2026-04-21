import { 
  Rocket, 
  Target, 
  BarChart2, 
  ChevronRight, 
  Plus, 
  Pause, 
  Play, 
  Settings, 
  Search,
  Filter
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface Campaign {
  id: string;
  name: string;
  type: '千川极速' | '千川专业' | '搜索广告';
  status: 'running' | 'paused' | 'ended';
  budget: string;
  cost: string;
  roi: string;
  orders: number;
}

const initialCampaigns: Campaign[] = [
  { id: '1', name: '2024双11预热_直投直播间_01', type: '千川极速', status: 'running', budget: '¥5,000/日', cost: '¥3,241', roi: '4.2', orders: 421 },
  { id: '2', name: '秋冬新品_商销推流_专业版', type: '千川专业', status: 'paused', budget: '¥2,000/日', cost: '¥850', roi: '3.8', orders: 112 },
  { id: '3', name: '搜索关键词_爆款引流', type: '搜索广告', status: 'running', budget: '¥500/日', cost: '¥482', roi: '2.5', orders: 67 },
  { id: '4', name: '超级短视频_全维度覆盖', type: '千川专业', status: 'ended', budget: '不限', cost: '¥15,800', roi: '5.1', orders: 1240 },
];

export default function CampaignManagement() {
  const [activeTab, setActiveTab] = useState<'all' | 'running' | 'paused'>('all');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">投放管理</h1>
          <p className="text-on-surface-variant font-medium">全局统筹您的千川广告投放策略与实时效能</p>
        </div>
        <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
          <Plus className="w-5 h-5" />
          新建投放计划
        </button>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "当日总消耗", value: "¥4,574", icon: Rocket, color: "text-primary" },
          { label: "当日总订单", value: "600", icon: Target, color: "text-secondary" },
          { label: "综合 ROI", value: "3.92", icon: BarChart2, color: "text-primary" },
          { label: "生效中计划", value: "12", icon: Play, color: "text-on-surface" },
        ].map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-white group hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-2 rounded-lg bg-surface-container-high", stat.color)}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-2xl font-black font-headline text-on-surface">{stat.value}</div>
          </div>
        ))}
      </section>

      {/* Filter & Table */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-white overflow-hidden">
        <div className="p-6 border-b border-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-surface-container-low p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('all')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === 'all' ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              全部计划
            </button>
            <button 
              onClick={() => setActiveTab('running')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === 'running' ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              投放中
            </button>
            <button 
              onClick={() => setActiveTab('paused')}
              className={cn(
                "px-6 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === 'paused' ? "bg-white text-primary shadow-sm" : "text-outline hover:text-on-surface"
              )}
            >
              已暂停
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
              <input 
                type="text" 
                placeholder="搜索计划名称或 ID..." 
                className="bg-surface-container-low border-none rounded-xl pl-10 pr-4 py-2 text-xs font-bold w-64 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <button className="p-2 bg-surface-container-low rounded-xl text-outline hover:text-on-surface transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-primary/5 text-[10px] font-black text-outline uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">计划详情</th>
                <th className="px-4 py-5">计划类型</th>
                <th className="px-4 py-5">预算/消耗</th>
                <th className="px-4 py-5">实时 ROI</th>
                <th className="px-4 py-5">订单数</th>
                <th className="px-4 py-5">状态</th>
                <th className="px-8 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {initialCampaigns
                .filter(c => activeTab === 'all' || (activeTab === 'running' && c.status === 'running') || (activeTab === 'paused' && c.status === 'paused'))
                .map((campaign) => (
                <tr key={campaign.id} className="hover:bg-surface-container-low/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-extrabold text-on-surface group-hover:text-primary transition-colors cursor-pointer">{campaign.name}</div>
                    <div className="text-[10px] text-outline font-bold mt-1 uppercase tracking-tighter">Plan ID: CP_{campaign.id}9384</div>
                  </td>
                  <td className="px-4 py-6">
                    <span className="text-xs font-black text-on-surface-variant flex items-center gap-2">
                       <Rocket className="w-3 h-3 text-secondary" />
                       {campaign.type}
                    </span>
                  </td>
                  <td className="px-4 py-6">
                    <div className="text-sm font-black text-on-surface">{campaign.cost}</div>
                    <div className="text-[10px] text-outline font-bold mt-0.5">{campaign.budget}</div>
                  </td>
                  <td className="px-4 py-6">
                    <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-[11px] font-black rounded-lg">{campaign.roi}</span>
                  </td>
                  <td className="px-4 py-6">
                    <div className="text-sm font-black text-on-surface">{campaign.orders}</div>
                    <div className="text-[10px] text-outline font-bold mt-0.5">支付数</div>
                  </td>
                  <td className="px-4 py-6">
                    <div className={cn(
                      "flex items-center gap-2 text-xs font-bold",
                      campaign.status === 'running' ? "text-secondary" : campaign.status === 'paused' ? "text-primary" : "text-outline"
                    )}>
                      {campaign.status === 'running' ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                      {campaign.status === 'running' ? '投放中' : campaign.status === 'paused' ? '已暂停' : '已结束'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-lg text-outline hover:text-primary shadow-sm border border-transparent hover:border-outline-variant/10 transition-all">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-on-surface text-white text-[10px] font-black rounded-lg hover:bg-primary transition-all">
                        报表 <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-surface-container-low/20 flex justify-center">
           <button className="text-[11px] font-black text-outline uppercase tracking-widest hover:text-primary transition-colors">
             More Campaigns Loading...
           </button>
        </div>
      </section>
    </div>
  );
}
