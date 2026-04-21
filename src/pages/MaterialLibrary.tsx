import { useState, FormEvent } from "react";
import { 
  FolderOpen, 
  CloudUpload, 
  Search, 
  Calendar, 
  ChevronDown, 
  MoreVertical, 
  Play,
  ChevronLeft,
  ChevronRight,
  Move,
  Download,
  Edit,
  Trash2,
  X,
  Plus,
  Check,
  Tag,
  Eye,
  User,
  Clock,
  FileText,
  Info
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const initialMaterials = [
  { 
    id: 1, 
    name: "夏日清凉系列_主图视频_01", 
    type: "IP素材", 
    status: "已通过", 
    duration: "00:15", 
    spend: "¥12.4k", 
    ctr: "3.4%", 
    roi: "2.8", 
    image: "https://picsum.photos/seed/vid1/400/225",
    director: "张三",
    shootTime: "2024-05-15 10:00",
    uploadTime: "2024-05-16 14:30",
    scriptContent: "镜头1：清晨阳光洒在水面上，透着清凉感。\n镜头2：模特点头微笑，展示手中清凉饮料。\n镜头3：产品特写，冰块碰撞声，强调爽度。",
    description: "本视频旨在展示夏日清爽感，适合作为抖音信息流的主推素材。"
  },
  { 
    id: 2, 
    name: "品牌宣传海报_B端_精品", 
    type: "产品视角", 
    status: "审核中", 
    duration: "", 
    spend: "¥2.1k", 
    ctr: "1.2%", 
    roi: "1.5", 
    image: "https://picsum.photos/seed/img1/400/225",
    director: "李四",
    shootTime: "2024-05-12 09:00",
    uploadTime: "2024-05-13 11:20",
    scriptContent: "静态拍摄：模特职业装持产品在白底前展示稳定性与质感。",
    description: "用于品牌官网及B端招商PPT的背景展示。"
  },
  { 
    id: 3, 
    name: "年度盛典回顾_混剪视频_最终版", 
    type: "商家视角", 
    status: "已通过", 
    duration: "00:30", 
    spend: "¥58.2k", 
    ctr: "5.8%", 
    roi: "4.2", 
    image: "https://picsum.photos/seed/vid2/400/225",
    director: "王五",
    shootTime: "2023-12-28 18:30",
    uploadTime: "2024-01-05 10:00",
    scriptContent: "多场快剪：记录年会现场火爆气氛，商家代表发言特写，奖项揭晓瞬间。",
    description: "年会回顾混剪，用于朋友圈宣发和商家激励。"
  },
  { 
    id: 4, 
    name: "智能科技风_开屏视频_V2", 
    type: "孩子视角", 
    status: "未通过", 
    duration: "00:08", 
    spend: "¥0", 
    ctr: "0%", 
    roi: "0", 
    image: "https://picsum.photos/seed/vid3/400/225",
    director: "赵六",
    shootTime: "2024-05-20 15:00",
    uploadTime: "2024-05-21 09:00",
    scriptContent: "萌娃特写：孩子好奇地触摸智能音箱，露出惊叹表情，伴随科技音效。",
    description: "主推智能音箱的礼品属性，适合母婴人群。"
  },
  { 
    id: 5, 
    name: "系列备选素材_09", 
    type: "家长视角", 
    status: "审核中", 
    duration: "", 
    spend: "¥0", 
    ctr: "0%", 
    roi: "0", 
    image: "https://picsum.photos/seed/img2/400/225", 
    isLowOpacity: true,
    director: "张三",
    shootTime: "2024-04-30 11:00",
    uploadTime: "2024-05-01 10:00",
    scriptContent: "日常抓拍：家长陪伴孩子阅读的温馨侧面，强调产品的陪伴增益感。",
    description: "由于光线略暗，作为备选素材使用，可能需要调色。"
  },
];

export default function MaterialLibrary() {
  const [selected, setSelected] = useState<number[]>([]);
  const [materials, setMaterials] = useState(initialMaterials);
  const [tags, setTags] = useState(['IP素材', '家长视角', '孩子视角', '产品视角', '商家视角']);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [detailMaterial, setDetailMaterial] = useState<typeof initialMaterials[0] | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<typeof initialMaterials[0] | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [editingTagIndex, setEditingTagIndex] = useState<number | null>(null);
  const [editingTagName, setEditingTagName] = useState('');
  const [activeTag, setActiveTag] = useState('全部');

  const filteredMaterials = materials.filter(m => activeTag === '全部' || m.type === activeTag);

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleAddTag = () => {
    if (!newTagName || tags.includes(newTagName)) return;
    setTags([...tags, newTagName]);
    setNewTagName('');
  };

  const handleDeleteTag = (tagToDelete: string) => {
    if (!confirm(`确定要删除标签 "${tagToDelete}" 吗？`)) return;
    setTags(tags.filter(t => t !== tagToDelete));
    if (activeTag === tagToDelete) setActiveTag('全部');
  };

  const handleStartEditTag = (index: number) => {
    setEditingTagIndex(index);
    setEditingTagName(tags[index]);
  };

  const handleSaveEditTag = () => {
    if (!editingTagName || editingTagIndex === null) return;
    const newTags = [...tags];
    const oldTag = newTags[editingTagIndex];
    newTags[editingTagIndex] = editingTagName;
    setTags(newTags);
    if (activeTag === oldTag) setActiveTag(editingTagName);
    setEditingTagIndex(null);
  };

  const handleUploadMaterials = () => {
    // Simulate uploading
    const newItems = Array.from({ length: 2 }).map((_, i) => ({
      id: Date.now() + i,
      name: `新上传素材_${Date.now() + i}`,
      type: tags[0],
      status: "审核中" as const,
      duration: "00:10",
      spend: "¥0",
      ctr: "0%",
      roi: "0",
      image: `https://picsum.photos/seed/upload_${i}/400/225`,
      director: "当前用户",
      shootTime: new Date().toLocaleString(),
      uploadTime: new Date().toLocaleString(),
      scriptContent: "系统生成占位脚本内容...",
      description: "通过批量上传模块导入的新素材。"
    }));

    setMaterials(prev => [...newItems, ...prev]);
    setShowUploadModal(false);
    alert(`成功上传 ${newItems.length} 个新素材，已进入审核队列。`);
  };

  const handleBulkEdit = () => {
    if (selected.length === 0) return;
    const newType = prompt("请输入要批量修改的目标分类：", tags[0]);
    if (newType && tags.includes(newType)) {
      setMaterials(prev => prev.map(m => selected.includes(m.id) ? { ...m, type: newType } : m));
      setSelected([]);
      alert(`已成功将 ${selected.length} 个素材修改为分类: ${newType}`);
    }
  };

  const handleBulkMove = () => {
    if (selected.length === 0) return;
    alert(`已批量启动针对 ${selected.length} 个素材的逻辑搬运/归档流程`);
    setSelected([]);
  };

  const handleDownload = (material: typeof initialMaterials[0]) => {
    // Simulate direct download
    const link = document.createElement('a');
    link.href = material.image;
    link.download = `${material.name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('已开始下载素材附件');
  };

  const handleSaveMaterial = (e: FormEvent) => {
    e.preventDefault();
    if (!editingMaterial) return;
    
    setMaterials(prev => prev.map(m => m.id === editingMaterial.id ? editingMaterial : m));
    setDetailMaterial(editingMaterial);
    setEditingMaterial(null);
    alert('素材资料已成功更新');
  };

  const handleBulkDelete = () => {
    if (selected.length === 0) return;
    if (!confirm(`确定要物理删除选中的 ${selected.length} 个素材吗？该操作不可撤销。`)) return;
    
    setMaterials(prev => prev.filter(m => !selected.includes(m.id)));
    setSelected([]);
    alert('所选素材已成功移除');
  };

  const handleSingleDelete = (id: number) => {
    if (!confirm('确定要删除这个素材吗？')) return;
    setMaterials(prev => prev.filter(m => m.id !== id));
    setSelected(prev => prev.filter(item => item !== id));
    alert('素材已成功移除');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">拍摄素材库 (原始素材)</h1>
          <p className="text-on-surface-variant font-medium">管理与优化您的品牌拍摄资产与分类标签。这些素材均属于未经剪辑的原始资产。</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowTagModal(true)}
            className="bg-surface-container-high text-on-surface px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors shadow-sm"
          >
            <Tag className="w-5 h-5 text-primary" />
            管理分类标签
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform"
          >
            <CloudUpload className="w-5 h-5" />
            批量上传素材
          </button>
        </div>
      </header>

      {/* Filter Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 flex flex-col gap-6 border border-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-3">素材分类 (拍摄视角)</label>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveTag('全部')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                  activeTag === '全部' ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-surface-container-lowest text-on-surface-variant hover:bg-white"
                )}
              >
                全部
              </button>
              {tags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                    activeTag === tag ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-surface-container-lowest text-on-surface-variant hover:bg-white"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-3">审核状态</label>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold">全部</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">审核中</button>
              <button className="px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface-variant text-sm font-medium hover:bg-white transition-colors">已通过</button>
            </div>
          </div>
          <div>
             <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-3">时间维度</label>
             <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                <select className="w-full appearance-none bg-surface-container-lowest border-none rounded-lg py-2.5 pl-10 pr-8 text-sm font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none">
                  <option>最近7天</option>
                  <option>最近30天</option>
                  <option>自定义范围</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4 pointer-events-none" />
             </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMaterials.map((m) => (
          <div 
            key={m.id} 
            className={cn(
              "group bg-surface-container-lowest rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative border border-white",
              m.isLowOpacity && "opacity-60"
            )}
          >
            <div className="absolute top-3 left-3 z-10">
              <input 
                type="checkbox" 
                checked={selected.includes(m.id)}
                onChange={() => toggleSelect(m.id)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer shadow-sm" 
              />
            </div>
            <div className="relative aspect-video overflow-hidden bg-surface-container">
              <img 
                src={m.image} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {m.duration && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded">{m.duration}</span>
                </div>
              )}
              {m.duration && (
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-12 h-12 bg-primary/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl">
                    <Play className="w-6 h-6 fill-current" />
                  </button>
                </div>
              )}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setDetailMaterial(m)}
                  className="w-8 h-8 bg-black/40 backdrop-blur-md text-white rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">MAT-{m.id.toString().padStart(3, '0')}</span>
                    <div className="px-1.5 py-0.5 rounded bg-surface-container-highest text-[9px] font-black text-outline uppercase tracking-wider border border-outline-variant/10">原始</div>
                  </div>
                  <h3 className="font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors cursor-pointer" onClick={() => setDetailMaterial(m)}>{m.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-primary/5 text-primary text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {m.type}
                    </span>
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded",
                      m.status === '已通过' ? "text-secondary bg-secondary/10" : 
                      m.status === '审核中' ? "text-primary bg-primary/10" : "text-error bg-error/10"
                    )}>
                      {m.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleSingleDelete(m.id)}
                    className="text-outline hover:text-error transition-colors p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="text-outline hover:text-primary transition-colors p-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {m.roi !== "0" ? (
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-outline-variant/10">
                  <div className="text-center">
                    <div className="text-[10px] text-outline font-bold uppercase tracking-tighter">消耗</div>
                    <div className="text-sm font-black">{m.spend}</div>
                  </div>
                  <div className="text-center border-x border-outline-variant/10">
                    <div className="text-[10px] text-outline font-bold uppercase tracking-tighter">CTR</div>
                    <div className="text-sm font-black text-secondary">{m.ctr}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-outline font-bold uppercase tracking-tighter">ROI</div>
                    <div className="text-sm font-black text-primary">{m.roi}</div>
                  </div>
                </div>
              ) : (
                <div className="h-10 bg-surface-container/50 rounded-lg flex items-center justify-center text-[10px] text-outline font-black mt-4 uppercase tracking-widest">Awaiting Data</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Material Detail Modal */}
      {detailMaterial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-400">
            {/* Left: Preview */}
            <div className="w-full md:w-[45%] bg-black relative flex items-center justify-center border-r border-outline-variant/10">
              <img 
                src={detailMaterial.image} 
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/50 hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </button>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                  <h4 className="text-white font-bold text-sm mb-1">{detailMaterial.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-white/60 font-bold bg-white/10 px-2 py-0.5 rounded">{detailMaterial.type}</span>
                    <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-2 py-0.5 rounded">{detailMaterial.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black text-on-surface font-headline leading-tight">素材详情资料</h2>
                  <p className="text-outline font-bold text-sm mt-1 uppercase tracking-wider">Comprehensive Material Dossier</p>
                </div>
                <button onClick={() => setDetailMaterial(null)} className="p-2 hover:bg-surface-container-low rounded-xl transition-colors">
                  <X className="w-6 h-6 text-outline" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-outline text-[11px] font-black uppercase tracking-widest mb-1">
                    <User className="w-3 h-3" /> 编导姓名
                  </div>
                  <div className="text-on-surface font-bold text-lg">{detailMaterial.director}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-outline text-[11px] font-black uppercase tracking-widest mb-1">
                    <Clock className="w-3 h-3" /> 拍摄时间
                  </div>
                  <div className="text-on-surface font-bold text-lg">{detailMaterial.shootTime}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-outline text-[11px] font-black uppercase tracking-widest mb-1">
                    <Clock className="w-3 h-3" /> 上传时间
                  </div>
                  <div className="text-on-surface font-bold text-lg">{detailMaterial.uploadTime}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-outline text-[11px] font-black uppercase tracking-widest mb-1">
                    <Tag className="w-3 h-3" /> 素材分类
                  </div>
                  <div className="text-on-surface font-bold text-lg">{detailMaterial.type}</div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30 relative">
                  <div className="absolute top-0 left-8 -translate-y-1/2 bg-white px-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    <div className="flex items-center gap-2">
                       <FileText className="w-3 h-3" /> Original Script
                    </div>
                  </div>
                  <div className="text-on-surface font-medium leading-relaxed whitespace-pre-wrap">
                    {detailMaterial.scriptContent}
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/30 relative">
                  <div className="absolute top-0 left-8 -translate-y-1/2 bg-white px-3 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                    <div className="flex items-center gap-2">
                       <Info className="w-3 h-3" /> Material Description
                    </div>
                  </div>
                  <div className="text-on-surface font-medium leading-relaxed">
                    {detailMaterial.description}
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-outline-variant/10 flex items-center justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setEditingMaterial(detailMaterial)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-colors"
                  >
                    <Edit className="w-4 h-4" /> 修改资料
                  </button>
                  <button 
                    onClick={() => handleDownload(detailMaterial)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-colors"
                  >
                    <Download className="w-4 h-4" /> 下载附件
                  </button>
                </div>
                <button onClick={() => setDetailMaterial(null)} className="px-10 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/30 hover:scale-95 transition-transform">
                  确认无误
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Material Modal */}
      {editingMaterial && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-400">
            <div className="bg-primary p-8 text-white flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <Edit className="w-6 h-6" />
                  <h3 className="text-xl font-black font-headline tracking-tight">修改素材详细资料</h3>
               </div>
               <button onClick={() => setEditingMaterial(null)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveMaterial} className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-outline uppercase tracking-widest">素材名称</label>
                  <input 
                    type="text" 
                    value={editingMaterial.name}
                    onChange={(e) => setEditingMaterial({...editingMaterial, name: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-outline uppercase tracking-widest">编导姓名</label>
                  <input 
                    type="text" 
                    value={editingMaterial.director}
                    onChange={(e) => setEditingMaterial({...editingMaterial, director: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-outline uppercase tracking-widest">拍摄时间</label>
                  <input 
                    type="text" 
                    value={editingMaterial.shootTime}
                    onChange={(e) => setEditingMaterial({...editingMaterial, shootTime: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-outline uppercase tracking-widest">素材分类</label>
                   <select 
                    value={editingMaterial.type}
                    onChange={(e) => setEditingMaterial({...editingMaterial, type: e.target.value})}
                    className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none appearance-none"
                   >
                     {tags.map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-outline uppercase tracking-widest">原始脚本内容</label>
                <textarea 
                  value={editingMaterial.scriptContent}
                  onChange={(e) => setEditingMaterial({...editingMaterial, scriptContent: e.target.value})}
                  rows={4}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-outline uppercase tracking-widest">素材说明</label>
                <textarea 
                  value={editingMaterial.description}
                  onChange={(e) => setEditingMaterial({...editingMaterial, description: e.target.value})}
                  rows={3}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setEditingMaterial(null)}
                  className="flex-1 py-4 bg-surface-container-high text-on-surface font-black rounded-2xl flex items-center justify-center hover:bg-surface-container-highest transition-colors uppercase tracking-widest text-xs"
                >
                  取消取消
                </button>
                <button 
                  type="submit"
                  className="flex-2 py-4 bg-primary text-white font-black rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-[0.98] transition-transform uppercase tracking-widest text-xs"
                >
                  保存更新资料
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pagination */}
      <footer className="mt-12 flex items-center justify-between">
        <p className="text-sm text-outline font-medium">显示 1 到 {filteredMaterials.length} 共 {filteredMaterials.length} 个素材</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-outline cursor-not-allowed opacity-30">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
          {filteredMaterials.length > 20 && (
            <>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">3</button>
              <span className="text-outline mx-1 text-sm font-bold">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors font-semibold text-sm">21</button>
            </>
          )}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-outline cursor-not-allowed opacity-30">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Batch Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-400">
            <div className="bg-primary p-8 text-white flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <CloudUpload className="w-6 h-6" />
                  <h3 className="text-xl font-black font-headline tracking-tight">批量上传素材资产</h3>
               </div>
               <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-10 space-y-8">
              <div 
                onClick={handleUploadMaterials}
                className="group border-2 border-dashed border-outline-variant/50 rounded-[2rem] p-12 flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-primary/5 hover:border-primary transition-all duration-300 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Plus className="text-primary w-10 h-10" />
                </div>
                <h4 className="text-lg font-black text-on-surface mb-2">点击或拖拽素材到此处</h4>
                <p className="text-outline text-xs font-bold uppercase tracking-widest">支持 MP4, MOV, JPG, PNG (单文件最大500MB)</p>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                    <div className="w-12 h-12 bg-surface-container rounded-lg"></div>
                    <div className="flex-1">
                       <div className="text-sm font-bold truncate">等待上传的素材队列...</div>
                       <div className="w-full h-1 bg-surface-container-high rounded-full mt-2"></div>
                    </div>
                    <X className="w-4 h-4 text-outline" />
                 </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-4 bg-surface-container-high text-on-surface font-black rounded-2xl hover:bg-surface-container-highest transition-colors uppercase tracking-widest text-xs"
                >
                  取消
                </button>
                <button 
                  onClick={handleUploadMaterials}
                  className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-[0.98] transition-transform uppercase tracking-widest text-xs"
                >
                  开始批量上传
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Tags Modal */}
      {showTagModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5" />
                <h3 className="font-bold font-headline text-lg">素材分类标签管理</h3>
              </div>
              <button onClick={() => setShowTagModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="新建标签名称 (如: 测评视角)..."
                  className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <button 
                  onClick={handleAddTag}
                  className="bg-primary text-white px-4 rounded-xl font-bold flex items-center justify-center hover:scale-95 transition-transform"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {tags.map((tag, index) => (
                  <div key={tag} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low group">
                    {editingTagIndex === index ? (
                      <div className="flex-1 flex gap-2">
                        <input 
                          type="text" 
                          autoFocus
                          value={editingTagName}
                          onChange={(e) => setEditingTagName(e.target.value)}
                          className="flex-1 bg-white border-none rounded-lg px-3 py-1 text-sm font-bold focus:ring-2 focus:ring-primary outline-none"
                        />
                        <button onClick={handleSaveEditTag} className="text-secondary p-1 hover:scale-110 transition-transform">
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                          {tag}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleStartEditTag(index)}
                            className="p-1.5 text-outline hover:text-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTag(tag)}
                            className="p-1.5 text-outline hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setShowTagModal(false)}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-95 transition-transform"
                >
                  完成退出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 ml-32 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-on-surface/95 backdrop-blur-2xl px-10 py-5 rounded-full shadow-2xl flex items-center gap-10 min-w-[600px] border border-white/10">
            <div className="flex items-center gap-4 pr-10 border-r border-white/10">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg shadow-lg shadow-primary/30">{selected.length}</div>
              <span className="text-sm font-black text-white uppercase tracking-widest">Items Selected</span>
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={handleBulkMove}
                className="flex items-center gap-2.5 text-xs font-black text-white hover:text-primary transition-colors uppercase tracking-wider group"
              >
                <Move className="w-4 h-4 group-hover:scale-110 transition-transform" /> 批量移动
              </button>
              <button className="flex items-center gap-2.5 text-xs font-black text-white hover:text-primary transition-colors uppercase tracking-wider group">
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" /> 批量下载
              </button>
              <button 
                onClick={handleBulkEdit}
                className="flex items-center gap-2.5 text-xs font-black text-white hover:text-primary transition-colors uppercase tracking-wider group"
              >
                <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" /> 批量编辑
              </button>
              <button 
                onClick={handleBulkDelete}
                className="flex items-center gap-2.5 text-xs font-black text-error hover:text-error/80 transition-colors uppercase tracking-wider group"
              >
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> 批量删除
              </button>
            </div>
            <button onClick={() => setSelected([])} className="ml-auto w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/40">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
