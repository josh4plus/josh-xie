import { Video, ShoppingBag, X, Info, Settings, Calendar, Plus, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface Project {
  id: string;
  name: string;
  targetId: string; // Live Room ID or Product ID
  type: 'live' | 'ecommerce';
  createdAt: string;
  status: 'active' | 'archived';
}

export default function ProjectManagement() {
  const [liveProjects, setLiveProjects] = useState<Project[]>([
    { id: '1', name: '双十一预热直播', targetId: 'LR_99824', type: 'live', createdAt: '2024-10-20', status: 'active' },
    { id: '2', name: '品牌周年庆专场', targetId: 'LR_12345', type: 'live', createdAt: '2024-10-22', status: 'active' },
  ]);

  const [ecommerceProjects, setEcommerceProjects] = useState<Project[]>([
    { id: '1', name: '秋冬爆款新款推流', targetId: 'P_77621', type: 'ecommerce', createdAt: '2024-10-18', status: 'active' },
    { id: '2', name: '清仓大促引流项目', targetId: 'P_33412', type: 'ecommerce', createdAt: '2024-10-23', status: 'active' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'live' | 'ecommerce'>('live');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newTargetId, setNewTargetId] = useState('');

  const resetForm = () => {
    setNewName('');
    setNewTargetId('');
    setEditingProjectId(null);
    setShowModal(false);
  };

  const handleOpenCreateModal = (type: 'live' | 'ecommerce') => {
    setModalType(type);
    setEditingProjectId(null);
    setNewName('');
    setNewTargetId('');
    setShowModal(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setModalType(project.type);
    setEditingProjectId(project.id);
    setNewName(project.name);
    setNewTargetId(project.targetId);
    setShowModal(true);
  };

  const handleSaveProject = () => {
    if (!newName || !newTargetId) return;

    if (editingProjectId) {
      // Update existing project
      if (modalType === 'live') {
        setLiveProjects(liveProjects.map(p => p.id === editingProjectId ? { ...p, name: newName, targetId: newTargetId } : p));
      } else {
        setEcommerceProjects(ecommerceProjects.map(p => p.id === editingProjectId ? { ...p, name: newName, targetId: newTargetId } : p));
      }
    } else {
      // Create new project
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name: newName,
        targetId: newTargetId,
        type: modalType,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      if (modalType === 'live') {
        setLiveProjects([newProject, ...liveProjects]);
      } else {
        setEcommerceProjects([newProject, ...ecommerceProjects]);
      }
    }

    resetForm();
  };

  const handleDeleteProject = (id: string, type: 'live' | 'ecommerce') => {
    if (!confirm('确定要删除这个项目吗？')) return;
    
    if (type === 'live') {
      setLiveProjects(liveProjects.filter(p => p.id !== id));
    } else {
      setEcommerceProjects(ecommerceProjects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">项目管理</h1>
          <p className="text-on-surface-variant font-medium">分类管理您的业务项目与绑定详情</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenCreateModal('live')}
            className="bg-white border border-outline-variant/30 text-on-surface px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm"
          >
            <Video className="w-4 h-4 text-primary" />
            新建直播项目
          </button>
          <button 
            onClick={() => handleOpenCreateModal('ecommerce')}
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            新建商销项目
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Projects List */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-white">
          <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-primary/5">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              <h3 className="font-bold font-headline text-lg">直播项目清单</h3>
            </div>
            <span className="text-xs font-bold text-outline">{liveProjects.length} 个活跃项目</span>
          </div>
          <div className="divide-y divide-outline-variant/10 min-h-[400px]">
            {liveProjects.length > 0 ? liveProjects.map(project => (
              <div key={project.id} className="p-6 hover:bg-surface-container-low transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">{project.name}</div>
                    <div className="text-xs text-outline flex items-center gap-2 mt-1">
                      <span className="font-mono bg-surface-container-high px-2 py-0.5 rounded text-[10px] text-on-surface-variant">直播间ID: {project.targetId}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => handleOpenEditModal(project)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-outline hover:text-primary hover:bg-white transition-all shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id, 'live')}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-outline hover:text-error hover:bg-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-outline">
                <Info className="w-10 h-10 mb-4 opacity-10" />
                <p className="text-sm font-medium">暂无直播项目</p>
                <button onClick={() => handleOpenCreateModal('live')} className="mt-4 text-xs font-bold text-primary hover:underline">点击创建第一个项目</button>
              </div>
            )}
          </div>
        </div>

        {/* Ecommerce Projects List */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-white">
          <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between bg-secondary/5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-secondary" />
              <h3 className="font-bold font-headline text-lg">商销项目清单</h3>
            </div>
            <span className="text-xs font-bold text-outline">{ecommerceProjects.length} 个活跃项目</span>
          </div>
          <div className="divide-y divide-outline-variant/10 min-h-[400px]">
            {ecommerceProjects.length > 0 ? ecommerceProjects.map(project => (
              <div key={project.id} className="p-6 hover:bg-surface-container-low transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center transition-transform group-hover:scale-110">
                    <ShoppingBag className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-base text-on-surface group-hover:text-secondary transition-colors">{project.name}</div>
                    <div className="text-xs text-outline flex items-center gap-2 mt-1">
                      <span className="font-mono bg-surface-container-high px-2 py-0.5 rounded text-[10px] text-on-surface-variant">商品ID: {project.targetId}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={() => handleOpenEditModal(project)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-outline hover:text-secondary hover:bg-white transition-all shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project.id, 'ecommerce')}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-outline hover:text-error hover:bg-white transition-all shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full py-20 text-outline">
                <Info className="w-10 h-10 mb-4 opacity-10" />
                <p className="text-sm font-medium">暂无商销项目</p>
                <button onClick={() => handleOpenCreateModal('ecommerce')} className="mt-4 text-xs font-bold text-secondary hover:underline">点击创建第一个项目</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Create/Edit Project */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className={cn(
              "p-6 text-white flex items-center justify-between",
              modalType === 'live' ? "bg-primary" : "bg-secondary"
            )}>
              <div className="flex items-center gap-3">
                {modalType === 'live' ? <Video className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                <h3 className="font-bold font-headline text-lg">
                  {editingProjectId ? '修改' : '新建'}{modalType === 'live' ? '直播' : '商销'}项目
                </h3>
              </div>
              <button onClick={resetForm} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest">项目名称</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="输入项目识别名称..."
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest">
                  {modalType === 'live' ? '直播间 ID' : '商品 ID'}
                </label>
                <input 
                  type="text" 
                  value={newTargetId}
                  onChange={(e) => setNewTargetId(e.target.value)}
                  placeholder={modalType === 'live' ? "输入直播间 ID (如: LR_889)" : "输入商品 ID (如: P_002)"}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3.5 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  onClick={resetForm}
                  className="flex-1 px-6 py-3.5 rounded-xl font-bold text-sm border border-outline-variant/30 hover:bg-surface-container-low transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSaveProject}
                  className={cn(
                    "flex-1 px-6 py-3.5 rounded-xl font-bold text-white text-sm shadow-xl transition-all active:scale-95",
                    modalType === 'live' ? "bg-primary shadow-primary/20" : "bg-secondary shadow-secondary/20"
                  )}
                >
                  {editingProjectId ? '保存修改' : '确认创建'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
