import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  BarChart3,
  Lightbulb,
  ChevronDown
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from "@/src/lib/utils";

const funnelData = [
  { name: '曝光', value: 3820120, ctr: '3.45%', color: '#004cca33', textColor: '#004cca' },
  { name: '点击', value: 131794, cvr: '1.82%', color: '#004cca66', textColor: '#004cca' },
  { name: '下单', value: 2481, pay: '88.5%', color: '#004cca99', textColor: '#ffffff' },
  { name: '付款', value: 2196, color: '#004cca', textColor: '#ffffff' },
];

const categoryComparison = [
  { name: "剧情叙事类", roi: 5.1, progress: 85 },
  { name: "产品测评类", roi: 4.2, progress: 70 },
  { name: "痛点直击类", roi: 3.8, progress: 62 },
  { name: "纯利益点类", roi: 2.9, progress: 48 },
];

export default function DataCenter() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">数据中心</h1>
          <p className="text-sm text-on-surface-variant mt-1 font-medium">实时监控您的千川素材表现与转化效率</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-high rounded-full px-4 py-2 flex items-center gap-2 text-sm font-bold shadow-sm">
            <Calendar className="w-4 h-4 text-outline" />
            2023年10月01日 - 2023年10月07日
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-extrabold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2">
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>
      </header>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[
          { label: "总消耗 (RMB)", value: "¥128,432", change: "+12.4%", trend: "up" },
          { label: "平均 ROI", value: "4.28", change: "+0.32", trend: "up", highlight: true },
          { label: "点击率 (CTR)", value: "3.45%", change: "-0.2%", trend: "down" },
          { label: "转化率 (CVR)", value: "1.82%", change: "+0.15%", trend: "up" },
          { label: "展现量", value: "3.8M", change: "+4.2%", trend: "up" },
          { label: "总订单量", value: "2,481", change: "+18%", trend: "up" },
        ].map((m, i) => (
          <div key={i} className={cn(
            "p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md group relative overflow-hidden",
            m.highlight ? "bg-primary-container text-white shadow-lg shadow-primary/20" : "bg-surface-container-lowest"
          )}>
            <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-2", m.highlight ? "text-white/80" : "text-outline")}>{m.label}</p>
            <p className="text-2xl font-black font-headline">{m.value}</p>
            <div className={cn(
              "mt-4 flex items-center text-[11px] font-black",
              m.highlight ? "text-secondary-container" : m.trend === 'up' ? "text-secondary" : "text-error"
            )}>
              {m.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {m.change} <span className={cn("font-medium ml-1", m.highlight ? "text-white/50" : "text-outline")}>较上周</span>
            </div>
            {m.highlight && <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Retention Trend */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-headline font-bold">消耗与 ROI 波动趋势</h2>
              <p className="text-xs text-outline font-medium mt-1">分析广告投放稳定性与回报率关系</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-xs font-bold text-primary"><div className="w-2.5 h-2.5 rounded-full bg-primary"></div> 消耗</span>
              <span className="flex items-center gap-2 text-xs font-bold text-secondary"><div className="w-2.5 h-2.5 rounded-full bg-secondary"></div> ROI</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: '10.01', spend: 4000, roi: 3.2 },
                { name: '10.02', spend: 3000, roi: 3.5 },
                { name: '10.03', spend: 5000, roi: 4.8 },
                { name: '10.04', spend: 6000, roi: 4.2 },
                { name: '10.05', spend: 4500, roi: 2.1 },
                { name: '10.06', spend: 5500, roi: 4.6 },
                { name: '10.07', spend: 7000, roi: 5.1 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ebeef0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#737687', fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(0, 76, 202, 0.03)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="spend" fill="#004cca" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col">
          <h2 className="text-xl font-headline font-bold mb-8">转化漏斗分析</h2>
          <div className="flex-1 flex flex-col gap-4">
            {funnelData.map((item, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div 
                  className="h-12 rounded-xl flex items-center px-4 relative group hover:scale-[1.02] transition-transform" 
                  style={{ backgroundColor: item.color, width: `${100 - i * 15}%`, marginLeft: 'auto', marginRight: 'auto' }}
                >
                  <span className="text-[10px] font-black uppercase mr-auto truncate" style={{ color: item.textColor }}>{item.name}</span>
                  <span className="text-sm font-black" style={{ color: item.textColor }}>{item.value.toLocaleString()}</span>
                  {i < funnelData.length - 1 && (
                     <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 z-0" style={{ backgroundColor: item.color }}></div>
                  )}
                </div>
                {i < funnelData.length - 1 && (
                  <div className="text-center text-[10px] font-black text-outline py-2">
                    {item.ctr ? `CTR: ${item.ctr}` : item.cvr ? `CVR: ${item.cvr}` : `PAY: ${item.pay}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table View */}
        <div className="lg:col-span-3 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden">
           <div className="p-6 flex justify-between items-center border-b border-surface-container-low">
            <h2 className="text-xl font-headline font-bold">素材效果明细</h2>
            <div className="flex items-center gap-3 bg-surface-container-low px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer">
              按消耗排序 <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low/30 text-[10px] font-bold text-outline uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">素材缩略图 / 名称</th>
                  <th className="px-4 py-4 text-center">所属批次</th>
                  <th className="px-4 py-4 text-center">消耗</th>
                  <th className="px-4 py-4 text-center">转化</th>
                  <th className="px-4 py-4 text-center">ROI</th>
                  <th className="px-8 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {[
                  { name: "秋冬爆款剧情片_01", id: "92834710", batch: "23Q4_剧情A组", spend: "¥12,480", conv: 342, roi: 5.28, img: "https://picsum.photos/seed/s1/100/150" },
                  { name: "产品开箱解说_V2", id: "92834721", batch: "23Q4_解说B组", spend: "¥9,210", conv: 188, roi: 3.15, img: "https://picsum.photos/seed/s2/100/150" },
                  { name: "效果对比直观片_03", id: "92834788", batch: "23Q4_对比C组", spend: "¥22,100", conv: 512, roi: 4.82, img: "https://picsum.photos/seed/s3/100/150" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group">
                    <td className="px-8 py-4 flex items-center gap-4">
                      <div className="w-12 h-16 bg-surface-container rounded overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                        <img src={row.img} className="w-full h-full object-cover" alt={row.name} referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="text-sm font-extrabold">{row.name}</div>
                        <div className="text-[10px] text-outline font-bold mt-1">ID: {row.id}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center text-xs font-bold text-on-surface-variant">{row.batch}</td>
                    <td className="px-4 py-4 text-center text-sm font-black">{row.spend}</td>
                    <td className="px-4 py-4 text-center text-sm font-black">{row.conv}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-[11px] font-black rounded-full">{row.roi}</span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <button className="text-primary font-black text-xs hover:underline transition-all">详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-surface-container-low/50 flex justify-center">
            <button className="text-xs font-black text-primary flex items-center gap-2 hover:gap-3 transition-all">
              查看更多素材数据 <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col h-full">
           <h2 className="text-xl font-headline font-bold mb-8">创意方向对比</h2>
           <div className="space-y-8 flex-1">
             {categoryComparison.map((cat, i) => (
               <div key={i}>
                <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-wide">
                  <span className="text-on-surface">{cat.name}</span>
                  <span className="text-primary">ROI {cat.roi}</span>
                </div>
                <div className="h-2 bg-surface-container-low rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-1000 delay-300" 
                    style={{ width: `${cat.progress}%` }}
                  ></div>
                </div>
              </div>
             ))}
           </div>
           
           <div className="mt-12 p-5 bg-primary/5 rounded-2xl relative overflow-hidden group">
             <div className="flex items-start gap-3 relative z-10">
                <Lightbulb className="text-primary w-6 h-6 shrink-0" />
                <div>
                  <p className="text-xs font-black text-primary uppercase mb-1">策略建议</p>
                  <p className="text-[10px] text-on-surface-variant leading-relaxed font-bold">
                    本周剧情类素材回报率最高，建议在23Q4批次中增加剧情类脚本的拍摄权重。
                  </p>
                </div>
             </div>
             <BarChart3 className="absolute -right-4 -bottom-4 w-20 h-20 opacity-5 group-hover:scale-110 transition-transform" />
           </div>
        </div>
      </div>
    </div>
  );
}
