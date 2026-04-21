import { TrendingUp, TrendingDown, Calendar, Download, Settings, Video, ShoppingBag, Plus } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';

const liveOrderData = [
  { time: '04:00', value: 45 },
  { time: '08:00', value: 30 },
  { time: '12:00', value: 95 },
  { time: '16:00', value: 65 },
  { time: '20:00', value: 80 },
  { time: '00:00', value: 110 },
];

const ecommerceOrderData = [
  { time: '04:00', value: 20 },
  { time: '08:00', value: 55 },
  { time: '12:00', value: 75 },
  { time: '16:00', value: 85 },
  { time: '20:00', value: 60 },
  { time: '00:00', value: 40 },
];

const metrics = [
  { label: "GMV (实时成交额)", value: "¥1,284,500", change: "+12.5%", trend: "up" },
  { label: "总订单数", value: "15,402", change: "+8.2%", trend: "up" },
  { label: "平均 ROI", value: "4.82", change: "+0.4", trend: "up" },
  { label: "消耗 (当日)", value: "¥256,102", change: "-5.2%", trend: "down" },
];

export default function Dashboard() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">业务概览</h1>
          <p className="text-on-surface-variant font-medium text-sm">实时监控直播与商销业务的核心数据与素材表现</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-container-high rounded-full px-4 py-2 flex items-center gap-2 text-xs font-bold shadow-sm">
            <Calendar className="w-4 h-4 text-outline" />
            2024年10月24日
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
            <Download className="w-4 h-4" />
            导出完整日报
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden border border-white">
            <div className="flex justify-between items-start mb-4">
               <div className="text-[10px] uppercase font-bold tracking-widest text-outline">
                 {metric.label}
               </div>
               <div className={cn(
                 "flex items-center gap-1 text-[11px] font-black",
                 metric.trend === 'up' ? "text-secondary" : "text-error"
                )}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {metric.change}
               </div>
            </div>
            <div className="text-3xl font-black font-headline text-on-surface">{metric.value}</div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 opacity-5 bg-primary rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        ))}
      </section>

      {/* Live Business Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/20 w-fit">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight">直播业务洞察 (Live)</h2>
        </div>

        <div className="space-y-8">
          {/* Order Trend Full Width */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-white">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold font-headline">直播订单走势</h3>
                <p className="text-xs text-on-surface-variant font-medium">实时反馈直播间转化动力</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary"></div> 成交订单</span>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={liveOrderData}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#737687', fontWeight: 700 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebeef0" />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 76, 202, 0.05)' }} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                  />
                  <Bar dataKey="value" fill="#004cca" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Materials Full Width */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold font-headline">直播项目表现最佳素材 Top 10</h3>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase italic">Performance High</span>
              </div>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">查看完整库 <Plus className="w-3 h-3" /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div key={item} className="group relative rounded-xl overflow-hidden shadow-sm aspect-[3/4] hover:shadow-xl transition-all hover:-translate-y-1">
                  <img 
                    src={`https://picsum.photos/seed/live_full_${item}/300/400`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    alt={`Live Top ${item}`}
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg z-10">TOP {item}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="font-bold text-sm line-clamp-1 mb-1 italic">{(9.5 - item * 0.4).toFixed(1)} ROI</div>
                    <div className="text-[10px] opacity-70 font-medium">当日成交 ¥{(200 / item).toFixed(1)}k</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E-commerce Business Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 pb-2 border-b-2 border-secondary/20 w-fit">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-secondary" />
          </div>
          <h2 className="text-2xl font-black font-headline text-on-surface tracking-tight">商销业务洞察 (E-commerce)</h2>
        </div>

        <div className="space-y-8">
          {/* Order Trend Full Width */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-white">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold font-headline">商销订单走势</h3>
                <p className="text-xs text-on-surface-variant font-medium">分析不同时段商品推流效能</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-secondary"></div> 商销单数</span>
              </div>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ecommerceOrderData}>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#737687', fontWeight: 700 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebeef0" />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 109, 61, 0.05)' }} 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                  />
                  <Bar dataKey="value" fill="#006d3d" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Materials Full Width */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold font-headline">商销项目表现最佳素材 Top 10</h3>
                <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-black rounded-full uppercase italic">Highly Converting</span>
              </div>
              <button className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">查看完整库 <Plus className="w-3 h-3" /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div key={item} className="group relative rounded-xl overflow-hidden shadow-sm aspect-[3/4] hover:shadow-xl transition-all hover:-translate-y-1">
                  <img 
                    src={`https://picsum.photos/seed/shop_full_${item}/300/400`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    alt={`Shop Top ${item}`}
                  />
                  <div className="absolute top-2 left-2 bg-secondary text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg z-10">TOP {item}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="font-bold text-sm line-clamp-1 mb-1 italic">{(7.8 - item * 0.3).toFixed(1)} ROI</div>
                    <div className="text-[10px] opacity-70 font-medium">转化 {(950 / item).toFixed(0)} 笔</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Optimization Suggestions (Bonus) */}
      <section className="bg-on-surface p-8 rounded-3xl text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-6 h-6 animate-spin-slow" />
            <h2 className="text-xl font-black font-headline">全域素材优化建议</h2>
          </div>
          <p className="text-sm opacity-80 max-w-2xl leading-relaxed">
            基于当前算法分析：直播间在 20:00-00:00 之间订单爆发力极强，建议该时段增大剧情类素材的推流权重。
            商销方面，3:4 比例素材的点击率明显优于 1:1，请近期拍摄计划向 3:4 倾斜。
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
      </section>
    </div>
  );
}
