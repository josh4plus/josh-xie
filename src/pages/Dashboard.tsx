import { TrendingUp, TrendingDown, Calendar, Download, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const data = [
  { time: '04:00', value: 30 },
  { time: '08:00', value: 45 },
  { time: '12:00', value: 85 },
  { time: '16:00', value: 55 },
  { time: '20:00', value: 70 },
  { time: '00:00', value: 95 },
];

const gmvData = [
  { day: 'Day 1', value: 20 },
  { day: 'Day 5', value: 35 },
  { day: 'Day 10', value: 25 },
  { day: 'Day 15', value: 55 },
  { day: 'Day 20', value: 40 },
  { day: 'Day 25', value: 80 },
  { day: 'Day 30', value: 65 },
];

const metrics = [
  { label: "GMV (实时成交额)", value: "¥1,284,500", change: "+12.5%", trend: "up", color: "bg-primary-container" },
  { label: "订单数", value: "15,402", change: "+8.2%", trend: "up", color: "bg-secondary" },
  { label: "退款率", value: "3.45%", change: "-2.1%", trend: "down", color: "bg-tertiary", isMetric: true },
  { label: "ROI (投产比)", value: "4.82", change: "+0.4", trend: "up", color: "bg-primary" },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">早安，管理员</h1>
          <p className="text-on-surface-variant font-medium">这是您今日的业务实时洞察</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-container-high rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4 text-outline" />
            2024年10月24日
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform">
            <Download className="w-4 h-4" />
            导出月度报告
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <div className={cn("text-[10px] uppercase font-bold tracking-widest text-outline", metric.isMetric && "text-tertiary")}>
                 {metric.label}
               </div>
               <div className={cn(
                 "flex items-center gap-1 text-xs font-bold",
                 metric.trend === 'up' ? "text-secondary" : "text-error"
                )}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
               </div>
            </div>
            <div className="text-3xl font-extrabold font-headline">{metric.value}</div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 opacity-5 bg-primary rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          </div>
        ))}
      </section>

      {/* Chart Sections */}
      <div className="grid grid-cols-1 gap-8">
        {/* Order Trend */}
        <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold font-headline">订单转化趋势</h2>
              <p className="text-sm text-on-surface-variant">过去24小时每小时订单量视图</p>
            </div>
            <div className="flex bg-surface-container-low p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md bg-white text-sm font-bold shadow-sm">按小时</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-outline">按天</button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebeef0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#737687' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 76, 202, 0.05)' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#0062FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 30 Day Trend */}
        <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
           <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold font-headline">30天走势图 (GMV)</h2>
              <p className="text-sm text-on-surface-variant">针对不同业务线的深度效能透视</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm font-medium text-on-surface">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                当前项目
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-outline">
                <div className="w-3 h-3 rounded-full bg-surface-container-highest"></div>
                均值
              </div>
            </div>
          </div>
           <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gmvData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebeef0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#737687' }} />
                <YAxis hide />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0062FF" 
                  strokeWidth={4} 
                  dot={false}
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#0062FF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Top Media Materials */}
      <section className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold font-headline">项目表现最佳素材 Top 10</h2>
          <div className="flex items-center gap-2 text-sm font-bold text-primary cursor-pointer hover:underline">
            查看更多 <Settings className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/5] bg-surface-container relative">
                <img 
                  src={`https://picsum.photos/seed/material${item}/400/500`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  alt={`Top Material ${item}`}
                />
                <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">TOP {item}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="font-bold text-sm line-clamp-1 mb-1">爆款冬秋系列_穿搭展示</div>
                  <div className="flex justify-between items-center text-[10px] opacity-80">
                    <div>ROI <span className="font-bold text-secondary-container">{(6 - item * 0.5).toFixed(2)}</span></div>
                    <div>转化 1.2k</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


