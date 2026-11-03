import React, { useState, useEffect, useRef } from 'react';
import { InquiryRecord } from '../types';
import { useSiteData } from '../context/SiteDataContext';
import { AttractionData, MenuItemData, RoomItemData } from '../types/siteData';
import {
  Lock,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  BedDouble,
  Image as ImageIcon,
  Settings,
  Phone,
  FileText,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Save,
  Trash2,
  ExternalLink,
  Search,
  Upload,
  Plus,
  UtensilsCrossed,
  MapPin,
  RefreshCw,
  Eye,
  Check,
  Menu,
  X,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { DiamondShineLogo } from './DiamondShineLogo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: InquiryRecord[];
  onUpdateInquiryStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  onDeleteInquiry: (id: string) => void;
}

// Dedicated Photo Replacement Card with strict 8-step workflow
interface PhotoCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  currentImage: string;
  onSavePhoto: (fileData: string, filename?: string) => Promise<{ success: boolean; permanentUrl: string; error?: string }>;
  onUpdateDetails?: (updates: any) => void;
  detailsForm?: React.ReactNode;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  title,
  subtitle,
  badge,
  currentImage,
  onSavePhoto,
  detailsForm,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setIsEditing } = useSiteData();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setSaveSuccess(false);
    setSelectedFileName(file.name);
    setIsEditing(true);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDiscard = () => {
    setPreviewSrc(null);
    setSelectedFileName('');
    setErrorMessage(null);
    setIsEditing(false);
  };

  const handlePublishPhoto = async () => {
    if (!previewSrc) return;
    setIsSaving(true);
    setErrorMessage(null);

    try {
      const res = await onSavePhoto(previewSrc, selectedFileName);
      if (res.success) {
        setSaveSuccess(true);
        setPreviewSrc(null);
        setSelectedFileName('');
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        setErrorMessage(res.error || 'Failed to upload photo. Please check connection and try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error uploading photo to storage.');
    } finally {
      setIsSaving(false);
    }
  };

  const displayImage = previewSrc || currentImage;

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-[#0c1a2f] border border-[#1b3a66] flex flex-col justify-between space-y-3.5 shadow-lg transition-all hover:border-[#254d85]">
      <div>
        {/* Header with Title and Badges */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div>
            <h4 className="text-sm font-semibold text-white leading-snug">{title}</h4>
            {subtitle && <p className="text-[11px] text-neutral-400 mt-0.5">{subtitle}</p>}
          </div>
          {badge && (
            <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-[#1b3a66] text-[#c5a880] border border-[#c5a880]/30 font-medium">
              {badge}
            </span>
          )}
        </div>

        {/* Responsive Image Stage with 4:3 Aspect Ratio */}
        <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black/80 border border-white/10 group shadow-inner">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />

          {/* Status Overlay Badges */}
          {previewSrc && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-amber-500/90 text-black text-[11px] font-bold shadow-md flex items-center gap-1.5 backdrop-blur-sm animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span>Unsaved Preview</span>
            </div>
          )}

          {saveSuccess && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center backdrop-blur-sm animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-1.5 animate-bounce" />
              <span className="text-xs font-bold text-white">Photo Saved & Published!</span>
              <span className="text-[10px] text-emerald-300 mt-0.5">Live across all devices</span>
            </div>
          )}
        </div>

        {/* Admin-only File Reference */}
        <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-400 font-mono bg-black/40 px-2 py-1 rounded border border-white/5 truncate">
          <span className="truncate">Source: {currentImage ? (currentImage.split('/').pop()?.split('?')[0] || 'Image') : 'None'}</span>
          {selectedFileName && (
            <span className="text-amber-400 font-semibold shrink-0 ml-1">New: {selectedFileName}</span>
          )}
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-2.5 p-2 rounded bg-rose-950/70 border border-rose-500/50 text-rose-200 text-[11px] flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-3.5 space-y-2">
          {previewSrc ? (
            /* Unsaved state: User must confirm or discard */
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={handlePublishPhoto}
                disabled={isSaving}
                className="w-full sm:flex-1 min-h-[44px] py-2 px-3 text-xs font-bold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-lg transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save & Publish Photo</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDiscard}
                disabled={isSaving}
                className="w-full sm:w-auto min-h-[44px] py-2 px-3 text-xs font-medium text-neutral-300 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>
            </div>
          ) : (
            /* Default state: Choose file button */
            <div>
              <label className="cursor-pointer w-full min-h-[44px] py-2.5 px-3 bg-[#1b3a66] hover:bg-[#254d85] text-white rounded-lg text-center text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow active:scale-98">
                <Upload className="w-4 h-4 text-[#c5a880]" />
                <span>Upload & Replace Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
              <p className="text-[10px] text-neutral-400 text-center mt-1">
                Selects a new photo from your phone or computer with instant preview.
              </p>
            </div>
          )}
        </div>

        {/* Optional Section Details Form (Titles, descriptions) */}
        {detailsForm && <div className="mt-3.5 pt-3 border-t border-white/10">{detailsForm}</div>}
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  inquiries,
  onUpdateInquiryStatus,
  onDeleteInquiry,
}) => {
  const {
    siteData,
    updateSiteData,
    saveAttractionPhoto,
    saveHotelPhoto,
    saveMenuItemPhoto,
    saveRoomPhoto,
    updateAttraction,
    updateMenuItem,
    deleteMenuItem,
    addMenuItem,
    updateHotelInfo,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated,
    lastSyncTime,
    isSaving,
    refetch,
    setIsEditing,
  } = useSiteData();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'menu' | 'content' | 'inquiries'>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Editable local copies of data
  const [localHotelInfo, setLocalHotelInfo] = useState(siteData.hotelInfo);
  const [localAttractions, setLocalAttractions] = useState<AttractionData[]>(siteData.attractions);
  const [localMenuItems, setLocalMenuItems] = useState<MenuItemData[]>(siteData.menuItems);
  const [localRooms, setLocalRooms] = useState<RoomItemData[]>(siteData.rooms);

  // Dish Modal state
  const [editingDish, setEditingDish] = useState<MenuItemData | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);

  // Synchronize local states when siteData updates from server
  useEffect(() => {
    setLocalHotelInfo(siteData.hotelInfo);
    setLocalAttractions(siteData.attractions);
    setLocalMenuItems(siteData.menuItems);
    setLocalRooms(siteData.rooms);
  }, [siteData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await loginAdmin(passwordInput);
      if (res.success) {
        setPasswordInput('');
        showNotification('Authenticated successfully. Management active.');
      } else {
        setAuthError(res.error || 'Invalid administrator password.');
      }
    } catch {
      setAuthError('Authentication verification failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await logoutAdmin();
  };

  // Full manual sync
  const handleSaveAllSiteData = async () => {
    const fullState = {
      ...siteData,
      hotelInfo: localHotelInfo,
      attractions: localAttractions,
      menuItems: localMenuItems,
      rooms: localRooms,
    };

    const success = await updateSiteData(fullState);
    if (success) {
      showNotification('All updates saved and broadcast to all devices!');
    } else {
      showNotification('Notice: check server network connection.');
    }
  };

  // Metrics
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'pending').length;
  const confirmedInquiries = inquiries.filter((i) => i.status === 'confirmed').length;

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (statusFilter !== 'all' && inquiry.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      return (
        inquiry.fullName.toLowerCase().includes(query) ||
        inquiry.phone.toLowerCase().includes(query) ||
        (inquiry.message && inquiry.message.toLowerCase().includes(query))
      );
    }
    return true;
  });

  interface TabItem {
    id: 'overview' | 'photos' | 'menu' | 'content' | 'inquiries';
    label: string;
    icon: any;
    badge?: number;
  }

  const tabList: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'photos', label: 'Hotel & Tourist Photos', icon: ImageIcon },
    { id: 'menu', label: 'Food Menu', icon: UtensilsCrossed, badge: localMenuItems.length },
    { id: 'content', label: 'Bilingual Content', icon: Settings },
    { id: 'inquiries', label: 'Bookings & Inquiries', icon: Clock, badge: inquiries.length },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 overflow-y-auto">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[94vh] sm:max-w-6xl bg-[#081324] sm:border border-[#1b3a66] sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200">
        {/* Top Management Header Bar (Fully responsive for 320px-430px mobile) */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-[#050c18] border-b border-[#142c50] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <DiamondShineLogo size="sm" />
            <div className="border-l border-white/15 pl-2 sm:pl-3 truncate">
              <h2 className="text-xs sm:text-base font-serif font-bold text-white flex items-center gap-1.5 truncate">
                <span className="truncate">Hotel Diamond Admin</span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-sans uppercase">
                  Control Panel
                </span>
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400">
                <span className="hidden sm:inline">Sandhikharka</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate">Live Sync</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {isAdminAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={handleSaveAllSiteData}
                  disabled={isSaving}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-md transition-all shadow-md active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save All'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 rounded-md transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1.5 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
            >
              Exit
            </button>

            {/* Mobile Tab Drawer Toggle */}
            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="md:hidden p-1.5 text-neutral-300 hover:text-white rounded-md bg-[#0e223f] border border-[#1b3a66]"
                aria-label="Toggle Tabs"
              >
                {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Global Toast / Saved Notice */}
        {saveSuccessNotice && (
          <div className="bg-emerald-950 border-b border-emerald-500/50 text-emerald-300 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{saveSuccessNotice}</span>
          </div>
        )}

        {/* Content Area */}
        {!isAdminAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center overflow-y-auto">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0c1a2f] to-[#07101d] border border-[#1b3a66] shadow-2xl">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] flex items-center justify-center mx-auto mb-3.5">
                <Lock className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Authorized Hotel Management
              </h3>
              <p className="text-xs text-neutral-400 mt-1 mb-5">
                Enter your administrative password to edit destination photos, hotel facilities, food menus, and guest bookings.
              </p>

              {authError && (
                <div className="p-3 mb-4 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 text-left">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter management password"
                    className="w-full min-h-[44px] px-4 py-2.5 text-sm bg-black/60 border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full min-h-[44px] py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <span>Verify & Enter Control Panel</span>
                  )}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-white/10 text-left text-[11px] text-neutral-400 leading-normal flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <span>
                  <strong>Server-Authenticated Security:</strong> Protected by cryptographic session tokens and server-side authorization. Uploaded photos are permanently persisted to shared image storage.
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
            {/* Sidebar Navigation (Desktop) & Collapsible Dropdown (Mobile) */}
            <aside
              className={`${
                mobileNavOpen ? 'block' : 'hidden'
              } md:block w-full md:w-56 bg-[#050c18] border-r border-[#142c50] p-2.5 sm:p-4 shrink-0 flex flex-col gap-1 z-20 absolute md:static inset-x-0 top-0 shadow-2xl md:shadow-none`}
            >
              <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider px-3 py-1 hidden md:block">
                Navigation
              </div>

              {tabList.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setMobileNavOpen(false);
                    }}
                    className={`min-h-[44px] flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left ${
                      isActive
                        ? 'bg-[#c5a880] text-black font-semibold shadow'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                          isActive ? 'bg-black text-[#c5a880]' : 'bg-[#1b3a66] text-white'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="mt-auto pt-3 border-t border-white/10 hidden md:block">
                <div className="text-[10px] text-neutral-400 space-y-1">
                  <div>
                    Last Sync:{' '}
                    <span className="text-white font-mono">
                      {lastSyncTime ? lastSyncTime.toLocaleTimeString() : 'Active'}
                    </span>
                  </div>
                  <div className="text-emerald-400">● Storage Connected</div>
                </div>
              </div>
            </aside>

            {/* Main Tab Panel Content (Scrollable, mobile-responsive) */}
            <main className="flex-1 p-3.5 sm:p-6 overflow-y-auto bg-[#07101d]">
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                        Management Dashboard Summary
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Live control of hotel content, menu items, destination photographs, and visitor inquiries.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveAllSiteData}
                      disabled={isSaving}
                      className="min-h-[44px] px-4 py-2 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md w-full sm:w-fit"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Saving to Server...' : 'Save All Changes'}</span>
                    </button>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66]">
                      <div className="flex items-center justify-between text-neutral-400 text-xs">
                        <span>Total Inquiries</span>
                        <FileText className="w-4 h-4 text-[#c5a880]" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-white mt-1.5">
                        {totalInquiries}
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Live customer requests</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0c1a2f] border border-amber-500/30">
                      <div className="flex items-center justify-between text-neutral-400 text-xs">
                        <span>Pending Inquiries</span>
                        <Clock className="w-4 h-4 text-amber-400" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-amber-400 mt-1.5">
                        {pendingInquiries}
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Awaiting confirmation</p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66]">
                      <div className="flex items-center justify-between text-neutral-400 text-xs">
                        <span>Active Menu Dishes</span>
                        <UtensilsCrossed className="w-4 h-4 text-[#c5a880]" />
                      </div>
                      <div className="text-2xl font-bold font-mono text-white mt-1.5">
                        {localMenuItems.length}
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Restaurant offerings</p>
                    </div>
                  </div>

                  {/* Quick Shortcut Panels */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div
                      onClick={() => setActiveTab('photos')}
                      className="p-4 sm:p-5 rounded-xl bg-[#0c1a2f] hover:bg-[#10233f] border border-[#1b3a66] cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center mb-2.5">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">Hotel & Tourist Photos</h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Replace photos of Rock Garden, Supa Deurali, Argha Durbar, and hotel facilities.
                        </p>
                      </div>
                      <span className="text-xs text-[#c5a880] font-medium mt-3.5 flex items-center gap-1">
                        Manage Photos →
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('menu')}
                      className="p-4 sm:p-5 rounded-xl bg-[#0c1a2f] hover:bg-[#10233f] border border-[#1b3a66] cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center mb-2.5">
                          <UtensilsCrossed className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">Food & Restaurant Menu</h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Add dishes, edit prices, upload meal photos, update English/Nepali names.
                        </p>
                      </div>
                      <span className="text-xs text-[#c5a880] font-medium mt-3.5 flex items-center gap-1">
                        Edit Food Menu →
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveTab('content')}
                      className="p-4 sm:p-5 rounded-xl bg-[#0c1a2f] hover:bg-[#10233f] border border-[#1b3a66] cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-8 h-8 rounded-lg bg-[#c5a880]/15 text-[#c5a880] flex items-center justify-center mb-2.5">
                          <Settings className="w-4 h-4" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">Bilingual Content Editor</h4>
                        <p className="text-xs text-neutral-400 mt-1">
                          Update phone numbers, front desk hours, and hotel overview descriptions.
                        </p>
                      </div>
                      <span className="text-xs text-[#c5a880] font-medium mt-3.5 flex items-center gap-1">
                        Edit Content →
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HOTEL & TOURIST PHOTOS MANAGEMENT (Requirement 1 & 2) */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                        Editable Hotel and Tourist Destination Photos
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Replace photos for Rock Garden, Supa Deurali Temple, Argha Durbar, and hotel facilities. Each photo upload is saved directly to persistent storage.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveAllSiteData}
                      disabled={isSaving}
                      className="min-h-[44px] px-4 py-2 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md w-full sm:w-fit"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Saving...' : 'Save All Details'}</span>
                    </button>
                  </div>

                  {/* Section A: Tourist Destinations (Rock Garden, Supa Deurali, Argha Durbar) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#d61f26]" />
                      <h4 className="text-xs sm:text-sm uppercase tracking-wider text-[#c5a880] font-semibold">
                        Nearby Tourist Destinations (Rock Garden, Supa Deurali, Argha Durbar)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {localAttractions.map((attraction, idx) => (
                        <PhotoCard
                          key={attraction.id}
                          title={attraction.name}
                          subtitle={attraction.nameNepali}
                          badge={attraction.highlightTag}
                          currentImage={attraction.image}
                          onSavePhoto={async (fileData, filename) => {
                            const res = await saveAttractionPhoto(attraction.id, fileData, filename);
                            if (res.success) {
                              const updated = [...localAttractions];
                              updated[idx].image = res.permanentUrl;
                              setLocalAttractions(updated);
                            }
                            return res;
                          }}
                          detailsForm={
                            <div className="space-y-2 text-xs">
                              <div>
                                <label className="text-neutral-400 block mb-1">Title (English)</label>
                                <input
                                  type="text"
                                  value={attraction.name}
                                  onChange={(e) => {
                                    const updated = [...localAttractions];
                                    updated[idx].name = e.target.value;
                                    setLocalAttractions(updated);
                                  }}
                                  className="w-full min-h-[38px] px-2.5 py-1.5 bg-black/50 border border-white/10 rounded text-white"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Title (नेपाली)</label>
                                <input
                                  type="text"
                                  value={attraction.nameNepali}
                                  onChange={(e) => {
                                    const updated = [...localAttractions];
                                    updated[idx].nameNepali = e.target.value;
                                    setLocalAttractions(updated);
                                  }}
                                  className="w-full min-h-[38px] px-2.5 py-1.5 bg-black/50 border border-white/10 rounded text-white font-sans"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Description (English)</label>
                                <textarea
                                  rows={2}
                                  value={attraction.descriptionEn}
                                  onChange={(e) => {
                                    const updated = [...localAttractions];
                                    updated[idx].descriptionEn = e.target.value;
                                    setLocalAttractions(updated);
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                                />
                              </div>

                              <div>
                                <label className="text-neutral-400 block mb-1">Description (नेपाली)</label>
                                <textarea
                                  rows={2}
                                  value={attraction.descriptionNe}
                                  onChange={(e) => {
                                    const updated = [...localAttractions];
                                    updated[idx].descriptionNe = e.target.value;
                                    setLocalAttractions(updated);
                                  }}
                                  className="w-full px-2.5 py-1.5 bg-black/50 border border-white/10 rounded text-white text-[11px] font-sans"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={async () => {
                                  const ok = await updateAttraction(localAttractions[idx]);
                                  if (ok) {
                                    showNotification(`${attraction.name} details saved.`);
                                  }
                                }}
                                className="w-full min-h-[36px] mt-1 py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                              >
                                Save Text Changes
                              </button>
                            </div>
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section B: Key Hotel Photographs */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-[#c5a880]" />
                      <h4 className="text-xs sm:text-sm uppercase tracking-wider text-[#c5a880] font-semibold">
                        Official Hotel Facilities & Room Photographs
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Photo 1: Hero Exterior */}
                      <PhotoCard
                        title="Main Exterior Facade"
                        subtitle="Hero section road view"
                        badge="Hero"
                        currentImage={localHotelInfo.heroImage}
                        onSavePhoto={async (fileData, filename) => {
                          const res = await saveHotelPhoto('heroImage', fileData, filename);
                          if (res.success) {
                            setLocalHotelInfo({ ...localHotelInfo, heroImage: res.permanentUrl });
                          }
                          return res;
                        }}
                        detailsForm={
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-neutral-400 block mb-1">Customer-Facing Title</label>
                              <input
                                type="text"
                                value={localHotelInfo.heroTitle || 'Hotel Diamond Exterior Facade'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, heroTitle: e.target.value })}
                                className="w-full min-h-[36px] px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-1">Public Caption / Description</label>
                              <textarea
                                rows={2}
                                value={localHotelInfo.heroDesc || 'The distinctive exterior presence of Hotel Diamond welcoming visitors to Sandhikharka.'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, heroDesc: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateHotelInfo({ heroTitle: localHotelInfo.heroTitle, heroDesc: localHotelInfo.heroDesc });
                                showNotification('Exterior title and description saved.');
                              }}
                              className="w-full min-h-[34px] py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                            >
                              Save Public Labels
                            </button>
                          </div>
                        }
                      />

                      {/* Photo 2: Guest Bedroom */}
                      <PhotoCard
                        title="Guest Room Bedroom"
                        subtitle="Primary guest room & twin accommodation"
                        badge="Guest Room"
                        currentImage={localHotelInfo.roomImage}
                        onSavePhoto={async (fileData, filename) => {
                          const res = await saveHotelPhoto('roomImage', fileData, filename);
                          if (res.success) {
                            setLocalHotelInfo({ ...localHotelInfo, roomImage: res.permanentUrl });
                          }
                          return res;
                        }}
                        detailsForm={
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-neutral-400 block mb-1">Customer-Facing Title</label>
                              <input
                                type="text"
                                value={localHotelInfo.roomTitle || 'Comfortable Twin Bedroom'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, roomTitle: e.target.value })}
                                className="w-full min-h-[36px] px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-1">Public Caption / Description</label>
                              <textarea
                                rows={2}
                                value={localHotelInfo.roomDesc || 'Authentic guest bedroom featuring rich dark wood furnishings, dual beds, and private vanity.'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, roomDesc: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateHotelInfo({ roomTitle: localHotelInfo.roomTitle, roomDesc: localHotelInfo.roomDesc });
                                showNotification('Guest room public title & description saved.');
                              }}
                              className="w-full min-h-[34px] py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                            >
                              Save Public Labels
                            </button>
                          </div>
                        }
                      />

                      {/* Photo 3: Interior & Sitting Lounge */}
                      <PhotoCard
                        title="Hotel Interior & Lounge"
                        subtitle="Banquet seating, hall & guest lounge"
                        badge="Interior"
                        currentImage={localHotelInfo.interiorImage}
                        onSavePhoto={async (fileData, filename) => {
                          const res = await saveHotelPhoto('interiorImage', fileData, filename);
                          if (res.success) {
                            setLocalHotelInfo({ ...localHotelInfo, interiorImage: res.permanentUrl });
                          }
                          return res;
                        }}
                        detailsForm={
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-neutral-400 block mb-1">Customer-Facing Title</label>
                              <input
                                type="text"
                                value={localHotelInfo.interiorTitle || 'Hotel Interior & Lounge'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, interiorTitle: e.target.value })}
                                className="w-full min-h-[36px] px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-1">Public Caption / Description</label>
                              <textarea
                                rows={2}
                                value={localHotelInfo.interiorDesc || 'Spacious indoor seating hall arranged for ceremonies, celebrations, and dining.'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, interiorDesc: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateHotelInfo({ interiorTitle: localHotelInfo.interiorTitle, interiorDesc: localHotelInfo.interiorDesc });
                                showNotification('Interior public title & description saved.');
                              }}
                              className="w-full min-h-[34px] py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                            >
                              Save Public Labels
                            </button>
                          </div>
                        }
                      />

                      {/* Photo 4: Street Entrance */}
                      <PhotoCard
                        title="Street Entrance Approach"
                        subtitle="Exterior street-level arrival view"
                        badge="Entrance"
                        currentImage={localHotelInfo.aboutImage}
                        onSavePhoto={async (fileData, filename) => {
                          const res = await saveHotelPhoto('aboutImage', fileData, filename);
                          if (res.success) {
                            setLocalHotelInfo({ ...localHotelInfo, aboutImage: res.permanentUrl });
                          }
                          return res;
                        }}
                        detailsForm={
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-neutral-400 block mb-1">Customer-Facing Title</label>
                              <input
                                type="text"
                                value={localHotelInfo.aboutTitle || 'Main Street Entrance & Approach'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, aboutTitle: e.target.value })}
                                className="w-full min-h-[36px] px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-1">Public Caption / Description</label>
                              <textarea
                                rows={2}
                                value={localHotelInfo.aboutDesc || 'Main street entrance facing the town center with direct road accessibility.'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, aboutDesc: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateHotelInfo({ aboutTitle: localHotelInfo.aboutTitle, aboutDesc: localHotelInfo.aboutDesc });
                                showNotification('Entrance public title & description saved.');
                              }}
                              className="w-full min-h-[34px] py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                            >
                              Save Public Labels
                            </button>
                          </div>
                        }
                      />

                      {/* Photo 5: Event & Meeting Hall */}
                      <PhotoCard
                        title="Multi-purpose Event Hall"
                        subtitle="Weddings, parties and conferences"
                        badge="Events"
                        currentImage={localHotelInfo.eventImage}
                        onSavePhoto={async (fileData, filename) => {
                          const res = await saveHotelPhoto('eventImage', fileData, filename);
                          if (res.success) {
                            setLocalHotelInfo({ ...localHotelInfo, eventImage: res.permanentUrl });
                          }
                          return res;
                        }}
                        detailsForm={
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-neutral-400 block mb-1">Customer-Facing Title</label>
                              <input
                                type="text"
                                value={localHotelInfo.eventTitle || 'Multi-purpose Event Hall'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, eventTitle: e.target.value })}
                                className="w-full min-h-[36px] px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-1">Public Caption / Description</label>
                              <textarea
                                rows={2}
                                value={localHotelInfo.eventDesc || 'Expansive gathering hall suitable for weddings, party celebrations, and community assemblies.'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, eventDesc: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateHotelInfo({ eventTitle: localHotelInfo.eventTitle, eventDesc: localHotelInfo.eventDesc });
                                showNotification('Event hall public title & description saved.');
                              }}
                              className="w-full min-h-[34px] py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                            >
                              Save Public Labels
                            </button>
                          </div>
                        }
                      />

                      {/* Photo 6: Reception & Lobby Area */}
                      <PhotoCard
                        title="Lobby & Front Desk"
                        subtitle="Guest arrival & hospitality counter"
                        badge="Reception"
                        currentImage={localHotelInfo.receptionImage}
                        onSavePhoto={async (fileData, filename) => {
                          const res = await saveHotelPhoto('receptionImage', fileData, filename);
                          if (res.success) {
                            setLocalHotelInfo({ ...localHotelInfo, receptionImage: res.permanentUrl });
                          }
                          return res;
                        }}
                        detailsForm={
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="text-neutral-400 block mb-1">Customer-Facing Title</label>
                              <input
                                type="text"
                                value={localHotelInfo.receptionTitle || 'Lobby & Reception Desk'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, receptionTitle: e.target.value })}
                                className="w-full min-h-[36px] px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-1">Public Caption / Description</label>
                              <textarea
                                rows={2}
                                value={localHotelInfo.receptionDesc || 'Warm front desk and hospitality counter for seamless check-in and local travel guidance.'}
                                onChange={(e) => setLocalHotelInfo({ ...localHotelInfo, receptionDesc: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/50 border border-white/10 rounded text-white text-[11px]"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={async () => {
                                await updateHotelInfo({ receptionTitle: localHotelInfo.receptionTitle, receptionDesc: localHotelInfo.receptionDesc });
                                showNotification('Reception public title & description saved.');
                              }}
                              className="w-full min-h-[34px] py-1 px-2.5 text-[11px] font-semibold text-white bg-[#1b3a66] hover:bg-[#254d85] rounded transition-colors"
                            >
                              Save Public Labels
                            </button>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FOOD & RESTAURANT MENU MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                        Food and Restaurant Menu Management
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Add, edit, or delete dishes, upload meal images, update Nepali and English names, prices in NPR, and toggle availability.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDish({
                            id: `dish-${Date.now()}`,
                            nameEn: '',
                            nameNe: '',
                            category: 'Lunch',
                            priceNpr: 250,
                            image: './assets/food/nepali_thali.jpg',
                            descriptionEn: '',
                            descriptionNe: '',
                            isAvailable: true,
                            isPopular: false,
                          });
                          setIsDishModalOpen(true);
                        }}
                        className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] hover:from-[#e82730] hover:to-[#c6151c] rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Dish</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveAllSiteData}
                        disabled={isSaving}
                        className="min-h-[44px] px-4 py-2 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSaving ? 'Saving...' : 'Save Menu'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Menu Items Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {localMenuItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66] flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-black/70 mb-3 border border-white/10 group">
                            <img
                              src={item.image}
                              alt={item.nameEn}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[11px] text-white font-mono font-bold">
                              Rs. {item.priceNpr}
                            </div>
                            <div className="absolute bottom-2 left-2">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                  item.isAvailable
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {item.isAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-white">{item.nameEn}</h4>
                            <p className="text-xs text-[#c5a880] font-sans">{item.nameNe}</p>
                            <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">
                              {item.descriptionEn}
                            </p>
                            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-[#162e52] text-neutral-300 capitalize">
                              Category: {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              const updated = [...localMenuItems];
                              updated[idx].isAvailable = !updated[idx].isAvailable;
                              setLocalMenuItems(updated);
                              await updateMenuItem(updated[idx]);
                              showNotification(`Updated status for "${item.nameEn}"`);
                            }}
                            className={`min-h-[38px] px-2.5 py-1 rounded text-xs transition-colors ${
                              item.isAvailable
                                ? 'bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingDish(item);
                                setIsDishModalOpen(true);
                              }}
                              className="min-h-[38px] px-3 py-1 rounded text-xs bg-[#1b3a66] hover:bg-[#254d85] text-white transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={async () => {
                                if (confirm(`Delete dish "${item.nameEn}"?`)) {
                                  await deleteMenuItem(item.id);
                                  setLocalMenuItems(localMenuItems.filter((m) => m.id !== item.id));
                                  showNotification(`Dish deleted.`);
                                }
                              }}
                              className="min-h-[38px] min-w-[38px] flex items-center justify-center p-1 text-neutral-400 hover:text-red-400 transition-colors"
                              title="Delete Dish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add / Edit Dish Modal */}
                  {isDishModalOpen && editingDish && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
                      <div className="w-full max-w-lg p-5 sm:p-6 rounded-2xl bg-[#091527] border border-[#1b3a66] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <h4 className="text-base font-serif font-bold text-white">
                            {localMenuItems.some((m) => m.id === editingDish.id)
                              ? 'Edit Menu Item'
                              : 'Add New Menu Item'}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setIsDishModalOpen(false)}
                            className="text-neutral-400 hover:text-white p-1"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Dish Photo */}
                        <PhotoCard
                          title={editingDish.nameEn || 'Dish Image'}
                          subtitle="Meal representation photo"
                          currentImage={editingDish.image}
                          onSavePhoto={async (fileData, filename) => {
                            const res = await saveMenuItemPhoto(editingDish.id, fileData, filename);
                            if (res.success) {
                              setEditingDish({ ...editingDish, image: res.permanentUrl });
                            }
                            return res;
                          }}
                        />

                        {/* English and Nepali Names */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-neutral-300 block mb-1">Dish Name (English)</label>
                            <input
                              type="text"
                              required
                              value={editingDish.nameEn}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, nameEn: e.target.value })
                              }
                              placeholder="e.g. Nepali Khana Set"
                              className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white"
                            />
                          </div>

                          <div>
                            <label className="text-neutral-300 block mb-1">Dish Name (नेपाली)</label>
                            <input
                              type="text"
                              value={editingDish.nameNe}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, nameNe: e.target.value })
                              }
                              placeholder="e.g. दाल भात थाली सेट"
                              className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-sans"
                            />
                          </div>
                        </div>

                        {/* Price and Category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-neutral-300 block mb-1">Price (NPR)</label>
                            <input
                              type="number"
                              required
                              value={editingDish.priceNpr}
                              onChange={(e) =>
                                setEditingDish({
                                  ...editingDish,
                                  priceNpr: Number(e.target.value) || 0,
                                })
                              }
                              className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="text-neutral-300 block mb-1">Category</label>
                            <select
                              value={editingDish.category}
                              onChange={(e) =>
                                setEditingDish({
                                  ...editingDish,
                                  category: e.target.value as any,
                                })
                              }
                              className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white"
                            >
                              <option value="Breakfast">Breakfast (नास्ता)</option>
                              <option value="Lunch">Lunch (दिउँसोको खाना)</option>
                              <option value="Dinner">Dinner (साँझको खाना)</option>
                              <option value="Snacks">Snacks (खाजा)</option>
                              <option value="Drinks">Drinks (पेय पदार्थ)</option>
                            </select>
                          </div>
                        </div>

                        {/* English Description */}
                        <div className="text-xs">
                          <label className="text-neutral-300 block mb-1">Description (English)</label>
                          <textarea
                            rows={2}
                            value={editingDish.descriptionEn}
                            onChange={(e) =>
                              setEditingDish({ ...editingDish, descriptionEn: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white"
                          />
                        </div>

                        {/* Nepali Description */}
                        <div className="text-xs">
                          <label className="text-neutral-300 block mb-1">Description (नेपाली)</label>
                          <textarea
                            rows={2}
                            value={editingDish.descriptionNe}
                            onChange={(e) =>
                              setEditingDish({ ...editingDish, descriptionNe: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-sans"
                          />
                        </div>

                        {/* Availability Toggle */}
                        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
                          <label className="flex items-center gap-2 cursor-pointer text-white min-h-[44px]">
                            <input
                              type="checkbox"
                              checked={editingDish.isAvailable}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, isAvailable: e.target.checked })
                              }
                              className="w-4 h-4 rounded border-white/20 text-[#d61f26]"
                            />
                            <span>Available to Order Fresh</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer text-white min-h-[44px]">
                            <input
                              type="checkbox"
                              checked={editingDish.isPopular}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, isPopular: e.target.checked })
                              }
                              className="w-4 h-4 rounded border-white/20 text-[#d61f26]"
                            />
                            <span>Chef Special Highlight</span>
                          </label>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsDishModalOpen(false)}
                            className="min-h-[44px] px-4 py-2 text-xs text-neutral-300 hover:text-white bg-white/5 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={async () => {
                              const exists = localMenuItems.some((m) => m.id === editingDish.id);
                              if (exists) {
                                await updateMenuItem(editingDish);
                                setLocalMenuItems(
                                  localMenuItems.map((m) =>
                                    m.id === editingDish.id ? editingDish : m
                                  )
                                );
                              } else {
                                await addMenuItem(editingDish);
                                setLocalMenuItems([editingDish, ...localMenuItems]);
                              }
                              setIsDishModalOpen(false);
                              showNotification(`Dish "${editingDish.nameEn}" saved to menu.`);
                            }}
                            className="min-h-[44px] px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#d61f26] to-[#b3141a] rounded-lg shadow-md"
                          >
                            Save Dish to Menu
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: HOTEL DESCRIPTIONS & CONTENT */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                        Hotel Descriptions and Content Editor
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Customize English and Nepali descriptions, official phone numbers, and front desk hours.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await updateHotelInfo(localHotelInfo);
                        if (ok) {
                          showNotification('Hotel content and contacts saved successfully!');
                        }
                      }}
                      disabled={isSaving}
                      className="min-h-[44px] px-4 py-2 text-xs font-semibold text-black bg-[#c5a880] hover:bg-[#d8b880] rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-md w-full sm:w-fit"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Saving...' : 'Save All Content'}</span>
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 rounded-xl bg-[#0c1a2f] border border-[#1b3a66] space-y-5 text-xs">
                    {/* About Descriptions */}
                    <div className="space-y-3 pb-4 border-b border-white/10">
                      <h4 className="text-sm font-semibold text-white">
                        About Hotel Diamond Overview Descriptions
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-neutral-300 block mb-1">About Paragraph 1 (English)</label>
                          <textarea
                            rows={3}
                            value={localHotelInfo.aboutDescEn1}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, aboutDescEn1: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-300 block mb-1">About Paragraph 1 (नेपाली)</label>
                          <textarea
                            rows={3}
                            value={localHotelInfo.aboutDescNe1}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, aboutDescNe1: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-sans"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-neutral-300 block mb-1">About Paragraph 2 (English)</label>
                          <textarea
                            rows={3}
                            value={localHotelInfo.aboutDescEn2}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, aboutDescEn2: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-300 block mb-1">About Paragraph 2 (नेपाली)</label>
                          <textarea
                            rows={3}
                            value={localHotelInfo.aboutDescNe2}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, aboutDescNe2: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Front Desk Contacts */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-white">
                        Official Front Desk Contact Information
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-neutral-300 block mb-1">Reception Phone Numbers</label>
                          <input
                            type="text"
                            value={localHotelInfo.phonePrimary}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, phonePrimary: e.target.value })
                            }
                            className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-300 block mb-1">Reception Email</label>
                          <input
                            type="email"
                            value={localHotelInfo.email}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, email: e.target.value })
                            }
                            className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-neutral-300 block mb-1">Front Desk Hours</label>
                          <input
                            type="text"
                            value={localHotelInfo.frontDeskHours}
                            onChange={(e) =>
                              setLocalHotelInfo({ ...localHotelInfo, frontDeskHours: e.target.value })
                            }
                            className="w-full min-h-[44px] px-3 py-2 bg-black/50 border border-white/10 rounded text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: INQUIRIES REGISTER */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                        Guest Inquiries & Bookings Register
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Manage live booking inquiries from guests and travelers.
                      </p>
                    </div>

                    {/* Status Filters */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-black/40 border border-white/10 rounded-lg text-xs">
                      {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setStatusFilter(filter)}
                          className={`min-h-[36px] px-3 py-1 rounded capitalize transition-colors ${
                            statusFilter === filter
                              ? 'bg-[#c5a880] text-black font-semibold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by guest name, phone, or request..."
                      className="w-full min-h-[44px] pl-9 pr-4 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  {filteredInquiries.length === 0 ? (
                    <div className="p-8 text-center rounded-xl bg-[#0c1a2f] border border-[#1b3a66] text-xs text-neutral-400">
                      No inquiries match the current filter.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredInquiries.map((inquiry) => (
                        <div
                          key={inquiry.id}
                          className="p-4 rounded-xl bg-[#0c1a2f] border border-[#1b3a66] hover:border-white/20 transition-all text-xs space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                            <div>
                              <span className="font-semibold text-white text-sm">
                                {inquiry.fullName}
                              </span>
                              <span className="text-neutral-400 ml-2 text-[11px] block sm:inline">
                                Submitted: {inquiry.createdAt}
                              </span>
                            </div>

                            {/* Status Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-neutral-400">Status:</span>
                              <select
                                value={inquiry.status}
                                onChange={(e) =>
                                  onUpdateInquiryStatus(
                                    inquiry.id,
                                    e.target.value as 'pending' | 'confirmed' | 'cancelled'
                                  )
                                }
                                className={`min-h-[38px] px-2.5 py-1 rounded text-xs font-medium border ${
                                  inquiry.status === 'confirmed'
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                    : inquiry.status === 'cancelled'
                                    ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                                    : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => onDeleteInquiry(inquiry.id)}
                                className="min-h-[38px] min-w-[38px] flex items-center justify-center p-1 text-neutral-500 hover:text-red-400 transition-colors"
                                title="Delete record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-300">
                            <div>
                              <span className="text-neutral-400 block text-[11px]">Contact Phone:</span>
                              <a
                                href={`tel:${inquiry.phone}`}
                                className="font-mono text-white hover:text-[#c5a880] inline-flex items-center gap-1.5 py-1"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                                <span>{inquiry.phone}</span>
                              </a>
                              {inquiry.email && (
                                <span className="block text-neutral-400 text-[11px]">
                                  {inquiry.email}
                                </span>
                              )}
                            </div>

                            <div>
                              <span className="text-neutral-400 block text-[11px]">Booking Type:</span>
                              <span className="text-white font-medium">{inquiry.inquiryType}</span>
                              <span className="block text-neutral-400 text-[11px]">
                                {inquiry.guestsCount || '1-2 Guests'}
                              </span>
                            </div>

                            <div>
                              <span className="text-neutral-400 block text-[11px]">Dates:</span>
                              <span className="font-mono text-white">
                                {inquiry.checkInDate || 'Not specified'}
                                {inquiry.checkOutDate ? ` to ${inquiry.checkOutDate}` : ''}
                              </span>
                            </div>
                          </div>

                          {inquiry.message && (
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-neutral-300">
                              <span className="text-neutral-400 block text-[10px] uppercase font-semibold">
                                Special Request / Message:
                              </span>
                              <p className="mt-0.5 italic">{inquiry.message}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
