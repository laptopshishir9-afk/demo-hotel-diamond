import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { SiteDataState, AttractionData, MenuItemData, RoomItemData, HotelInfoData } from '../types/siteData';
import { INITIAL_SITE_DATA } from '../data/initialSiteData';

export interface PhotoSaveResult {
  success: boolean;
  permanentUrl: string;
  error?: string;
}

interface SiteDataContextType {
  siteData: SiteDataState;
  isLoading: boolean;
  isSaving: boolean;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  lastSyncTime: Date | null;
  authToken: string | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  updateSiteData: (updatedState: SiteDataState) => Promise<boolean>;
  updateHotelInfo: (info: Partial<HotelInfoData>) => Promise<boolean>;
  updateAttraction: (attraction: AttractionData) => Promise<boolean>;
  deleteAttraction: (id: string) => Promise<boolean>;
  addAttraction: (attraction: AttractionData) => Promise<boolean>;
  updateMenuItem: (item: MenuItemData) => Promise<boolean>;
  deleteMenuItem: (id: string) => Promise<boolean>;
  addMenuItem: (item: MenuItemData) => Promise<boolean>;
  updateRoom: (room: RoomItemData) => Promise<boolean>;
  uploadImage: (base64Data: string, filename?: string) => Promise<string | null>;
  saveAttractionPhoto: (attractionId: string, base64OrUrl: string, filename?: string) => Promise<PhotoSaveResult>;
  saveHotelPhoto: (fieldKey: keyof HotelInfoData, base64OrUrl: string, filename?: string) => Promise<PhotoSaveResult>;
  saveMenuItemPhoto: (dishId: string, base64OrUrl: string, filename?: string) => Promise<PhotoSaveResult>;
  saveRoomPhoto: (roomId: string, base64OrUrl: string, filename?: string) => Promise<PhotoSaveResult>;
  refetch: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

function normalizePath(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('/assets/')) return '.' + url;
  if (url.startsWith('/uploads/')) return '.' + url;
  return url;
}

function sanitizeSiteData(state: SiteDataState): SiteDataState {
  if (!state || !state.hotelInfo) return INITIAL_SITE_DATA;

  const cleanedHotelInfo: HotelInfoData = {
    ...state.hotelInfo,
    logoSrc: normalizePath(state.hotelInfo.logoSrc),
    heroImage: normalizePath(state.hotelInfo.heroImage),
    aboutImage: normalizePath(state.hotelInfo.aboutImage),
    roomImage: normalizePath(state.hotelInfo.roomImage),
    interiorImage: normalizePath(state.hotelInfo.interiorImage),
    eventImage: normalizePath(state.hotelInfo.eventImage),
    receptionImage: normalizePath(state.hotelInfo.receptionImage),
    heroTitle: state.hotelInfo.heroTitle || 'Hotel Diamond Exterior Facade',
    heroDesc: state.hotelInfo.heroDesc || 'The distinctive exterior presence of Hotel Diamond welcoming visitors to Sandhikharka.',
    aboutTitle: state.hotelInfo.aboutTitle || 'Main Street Entrance & Approach',
    aboutDesc: state.hotelInfo.aboutDesc || 'Main street entrance facing the town center with direct road accessibility.',
    roomTitle: (state.hotelInfo.roomTitle || 'Comfortable Twin Bedroom').replace(/\s*\(diamond\s*222\)/gi, '').trim(),
    roomDesc: (state.hotelInfo.roomDesc || 'Authentic guest bedroom featuring rich dark wood furnishings, dual beds, and private vanity.').replace(/\s*\(diamond\s*222\)/gi, '').trim(),
    interiorTitle: (state.hotelInfo.interiorTitle || 'Hotel Interior & Lounge').replace(/\s*\(diamond\s*22\)/gi, '').trim(),
    interiorDesc: (state.hotelInfo.interiorDesc || 'Spacious indoor seating hall arranged for ceremonies, celebrations, and dining.').replace(/\s*\(diamond\s*22\)/gi, '').trim(),
    eventTitle: state.hotelInfo.eventTitle || 'Multi-purpose Event Hall',
    eventDesc: state.hotelInfo.eventDesc || 'Expansive gathering hall suitable for weddings, party celebrations, and community assemblies.',
    receptionTitle: state.hotelInfo.receptionTitle || 'Lobby & Reception Desk',
    receptionDesc: state.hotelInfo.receptionDesc || 'Warm front desk and hospitality counter for seamless check-in and local travel guidance.',
  };

  const cleanedRooms = (state.rooms || []).map((rm) => ({
    ...rm,
    image: normalizePath(rm.image),
    titleEn: (rm.titleEn || '').replace(/\s*\(diamond\s*222\)/gi, '').trim(),
    titleNe: (rm.titleNe || '').replace(/\s*\(diamond\s*222\)/gi, '').trim(),
  }));

  const cleanedAttractions = (state.attractions || []).map((att) => ({
    ...att,
    image: normalizePath(att.image),
  }));

  const cleanedMenuItems = (state.menuItems || []).map((menu) => ({
    ...menu,
    image: normalizePath(menu.image),
  }));

  return {
    ...state,
    hotelInfo: cleanedHotelInfo,
    rooms: cleanedRooms,
    attractions: cleanedAttractions,
    menuItems: cleanedMenuItems,
  };
}

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteDataState>(() => {
    try {
      const cached = localStorage.getItem('hotel_diamond_live_data');
      if (cached) {
        return sanitizeSiteData(JSON.parse(cached));
      }
    } catch {
      // ignore
    }
    return sanitizeSiteData(INITIAL_SITE_DATA);
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Auth token persistence
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return sessionStorage.getItem('diamond_admin_token') || localStorage.getItem('diamond_admin_token');
  });

  const isEditingRef = useRef(isEditing);
  isEditingRef.current = isEditing;
  const isSavingRef = useRef(isSaving);
  isSavingRef.current = isSaving;
  const siteDataRef = useRef(siteData);
  siteDataRef.current = siteData;
  const authTokenRef = useRef(authToken);
  authTokenRef.current = authToken;

  // Build authenticated headers
  const getAuthHeaders = useCallback(() => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (authTokenRef.current) {
      headers['Authorization'] = `Bearer ${authTokenRef.current}`;
    }
    return headers;
  }, []);

  // Login handler
  const loginAdmin = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setAuthToken(data.token);
        sessionStorage.setItem('diamond_admin_token', data.token);
        localStorage.setItem('diamond_admin_token', data.token);
        return { success: true };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch (err) {
      return { success: false, error: 'Network error during login' };
    }
  };

  // Logout handler
  const logoutAdmin = async () => {
    try {
      if (authToken) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: getAuthHeaders(),
        });
      }
    } catch {
      // ignore
    } finally {
      setAuthToken(null);
      sessionStorage.removeItem('diamond_admin_token');
      localStorage.removeItem('diamond_admin_token');
    }
  };

  // Fetch latest state from backend
  const fetchSiteData = useCallback(async () => {
    // If the admin is actively editing or an upload/save is in flight, do not overwrite local state
    if (isEditingRef.current || isSavingRef.current) {
      return;
    }

    try {
      const res = await fetch('/api/site-data');
      if (res.ok) {
        const incoming: SiteDataState = await res.json();
        
        // Safety check: ensure incoming is valid object
        if (incoming && incoming.hotelInfo) {
          const currentVersion = siteDataRef.current.version || 0;
          const incomingVersion = incoming.version || 0;

          // Only update state if version is newer, or if siteData has never been fetched from server
          if (incomingVersion >= currentVersion) {
            setSiteData(incoming);
            setLastSyncTime(new Date());
            try {
              localStorage.setItem('hotel_diamond_live_data', JSON.stringify(incoming));
            } catch {
              // ignore
            }
          }
        }
      }
    } catch (err) {
      console.warn('Network sync with server paused, using local cached data', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Regular polling every 5 seconds for cross-device sync (paused during active edits)
  useEffect(() => {
    fetchSiteData();
    const interval = setInterval(fetchSiteData, 5000);
    return () => clearInterval(interval);
  }, [fetchSiteData]);

  // Upload raw base64 image data to persistent server storage
  const uploadImage = async (base64Data: string, filename?: string): Promise<string | null> => {
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ base64Data, filename }),
      });
      if (res.ok) {
        const json = await res.json();
        return json.url;
      }
      return null;
    } catch (err) {
      console.error('Image upload failed', err);
      return null;
    }
  };

  // Full state save
  const updateSiteData = async (updatedState: SiteDataState): Promise<boolean> => {
    setIsSaving(true);
    const cleaned = sanitizeSiteData(updatedState);
    try {
      const res = await fetch('/api/site-data', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(cleaned),
      });

      if (res.ok) {
        const json = await res.json();
        const savedState = sanitizeSiteData(json.state || cleaned);
        setSiteData(savedState);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(savedState));
        setLastSyncTime(new Date());
        return true;
      }
      // If deployed statically on GitHub Pages where /api/* endpoints return 404
      setSiteData(cleaned);
      localStorage.setItem('hotel_diamond_live_data', JSON.stringify(cleaned));
      setLastSyncTime(new Date());
      return true;
    } catch {
      // Local fallback for offline/static deployment
      setSiteData(cleaned);
      localStorage.setItem('hotel_diamond_live_data', JSON.stringify(cleaned));
      setLastSyncTime(new Date());
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  // Atomic Destination Photo Replacement (Strict 8-Step Workflow)
  const saveAttractionPhoto = async (
    attractionId: string,
    base64OrUrl: string,
    filename?: string
  ): Promise<PhotoSaveResult> => {
    setIsSaving(true);
    try {
      let permanentUrl = base64OrUrl;

      // Step 1: If base64 data, upload to persistent storage first
      if (base64OrUrl.startsWith('data:') || base64OrUrl.length > 500) {
        const uploaded = await uploadImage(base64OrUrl, filename || `attraction_${attractionId}`);
        if (!uploaded) {
          return { success: false, permanentUrl: '', error: 'Could not upload image to persistent server storage.' };
        }
        permanentUrl = uploaded;
      }

      // Step 2: Atomic update to backend database
      const res = await fetch(`/api/attractions/${attractionId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ image: permanentUrl }),
      });

      if (!res.ok) {
        // Fallback local update for static deployment
        const updatedAttractions = siteDataRef.current.attractions.map((a) =>
          a.id === attractionId ? { ...a, image: permanentUrl } : a
        );
        const newState = sanitizeSiteData({ ...siteDataRef.current, attractions: updatedAttractions });
        setSiteData(newState);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
        setLastSyncTime(new Date());
        return { success: true, permanentUrl };
      }

      const json = await res.json();
      if (json.state) {
        const cleaned = sanitizeSiteData(json.state);
        setSiteData(cleaned);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(cleaned));
      } else {
        // Fallback local update
        const updatedAttractions = siteDataRef.current.attractions.map((a) =>
          a.id === attractionId ? { ...a, image: permanentUrl } : a
        );
        const newState = sanitizeSiteData({ ...siteDataRef.current, attractions: updatedAttractions });
        setSiteData(newState);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
      }

      setLastSyncTime(new Date());
      return { success: true, permanentUrl };
    } catch (err: any) {
      console.warn('saveAttractionPhoto network fallback to local storage', err);
      const updatedAttractions = siteDataRef.current.attractions.map((a) =>
        a.id === attractionId ? { ...a, image: base64OrUrl } : a
      );
      const newState = sanitizeSiteData({ ...siteDataRef.current, attractions: updatedAttractions });
      setSiteData(newState);
      localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
      setLastSyncTime(new Date());
      return { success: true, permanentUrl: base64OrUrl };
    } finally {
      setIsSaving(false);
    }
  };

  // Atomic Hotel Photo Replacement (hero, about, room, interior, event, reception)
  const saveHotelPhoto = async (
    fieldKey: keyof HotelInfoData,
    base64OrUrl: string,
    filename?: string
  ): Promise<PhotoSaveResult> => {
    setIsSaving(true);
    try {
      let permanentUrl = base64OrUrl;

      if (base64OrUrl.startsWith('data:') || base64OrUrl.length > 500) {
        const uploaded = await uploadImage(base64OrUrl, filename || `hotel_${String(fieldKey)}`);
        if (uploaded) {
          permanentUrl = uploaded;
        }
      }

      const res = await fetch('/api/hotel-info', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ [fieldKey]: permanentUrl }),
      });

      if (!res.ok) {
        // Fallback local update for static deployment
        const newState = sanitizeSiteData({
          ...siteDataRef.current,
          hotelInfo: {
            ...siteDataRef.current.hotelInfo,
            [fieldKey]: permanentUrl,
          },
        });
        setSiteData(newState);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
        setLastSyncTime(new Date());
        return { success: true, permanentUrl };
      }

      const json = await res.json();
      if (json.state) {
        const cleaned = sanitizeSiteData(json.state);
        setSiteData(cleaned);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(cleaned));
      } else {
        const newState = sanitizeSiteData({
          ...siteDataRef.current,
          hotelInfo: {
            ...siteDataRef.current.hotelInfo,
            [fieldKey]: permanentUrl,
          },
        });
        setSiteData(newState);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
      }

      setLastSyncTime(new Date());
      return { success: true, permanentUrl };
    } catch (err: any) {
      console.warn('saveHotelPhoto network fallback to local storage', err);
      const newState = sanitizeSiteData({
        ...siteDataRef.current,
        hotelInfo: {
          ...siteDataRef.current.hotelInfo,
          [fieldKey]: base64OrUrl,
        },
      });
      setSiteData(newState);
      localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
      setLastSyncTime(new Date());
      return { success: true, permanentUrl: base64OrUrl };
    } finally {
      setIsSaving(false);
    }
  };

  // Atomic Menu Item Photo Replacement
  const saveMenuItemPhoto = async (
    dishId: string,
    base64OrUrl: string,
    filename?: string
  ): Promise<PhotoSaveResult> => {
    setIsSaving(true);
    try {
      let permanentUrl = base64OrUrl;
      if (base64OrUrl.startsWith('data:') || base64OrUrl.length > 500) {
        const uploaded = await uploadImage(base64OrUrl, filename || `dish_${dishId}`);
        if (!uploaded) {
          return { success: false, permanentUrl: '', error: 'Failed to upload dish photo to persistent storage.' };
        }
        permanentUrl = uploaded;
      }

      const res = await fetch(`/api/menu-items/${dishId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ image: permanentUrl }),
      });

      if (!res.ok) {
        return { success: false, permanentUrl: '', error: 'Failed to save menu dish record.' };
      }

      const json = await res.json();
      if (json.state) {
        setSiteData(json.state);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
      }

      setLastSyncTime(new Date());
      return { success: true, permanentUrl };
    } catch (err: any) {
      return { success: false, permanentUrl: '', error: err?.message || 'Error saving dish photo.' };
    } finally {
      setIsSaving(false);
    }
  };

  // Atomic Room Photo Replacement
  const saveRoomPhoto = async (
    roomId: string,
    base64OrUrl: string,
    filename?: string
  ): Promise<PhotoSaveResult> => {
    setIsSaving(true);
    try {
      let permanentUrl = base64OrUrl;
      if (base64OrUrl.startsWith('data:') || base64OrUrl.length > 500) {
        const uploaded = await uploadImage(base64OrUrl, filename || `room_${roomId}`);
        if (!uploaded) {
          return { success: false, permanentUrl: '', error: 'Failed to upload room photo to persistent storage.' };
        }
        permanentUrl = uploaded;
      }

      const res = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ image: permanentUrl }),
      });

      if (!res.ok) {
        return { success: false, permanentUrl: '', error: 'Failed to save room record.' };
      }

      const json = await res.json();
      if (json.state) {
        setSiteData(json.state);
        localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
      }

      setLastSyncTime(new Date());
      return { success: true, permanentUrl };
    } catch (err: any) {
      return { success: false, permanentUrl: '', error: err?.message || 'Error saving room photo.' };
    } finally {
      setIsSaving(false);
    }
  };

  const updateHotelInfo = async (info: Partial<HotelInfoData>): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/hotel-info', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(info),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.state) {
          const cleaned = sanitizeSiteData(json.state);
          setSiteData(cleaned);
          localStorage.setItem('hotel_diamond_live_data', JSON.stringify(cleaned));
        }
        setLastSyncTime(new Date());
        return true;
      }
      // Local fallback for static deployment
      const newState = sanitizeSiteData({
        ...siteDataRef.current,
        hotelInfo: {
          ...siteDataRef.current.hotelInfo,
          ...info,
        },
      });
      setSiteData(newState);
      localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
      setLastSyncTime(new Date());
      return true;
    } catch {
      const newState = sanitizeSiteData({
        ...siteDataRef.current,
        hotelInfo: {
          ...siteDataRef.current.hotelInfo,
          ...info,
        },
      });
      setSiteData(newState);
      localStorage.setItem('hotel_diamond_live_data', JSON.stringify(newState));
      setLastSyncTime(new Date());
      return true;
    } finally {
      setIsSaving(false);
    }
  };

  const updateAttraction = async (attraction: AttractionData): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/attractions/${attraction.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(attraction),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.state) {
          setSiteData(json.state);
          localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
        }
        setLastSyncTime(new Date());
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAttraction = async (id: string): Promise<boolean> => {
    const updated = siteData.attractions.filter((a) => a.id !== id);
    return updateSiteData({ ...siteData, attractions: updated });
  };

  const addAttraction = async (attraction: AttractionData): Promise<boolean> => {
    return updateSiteData({ ...siteData, attractions: [...siteData.attractions, attraction] });
  };

  const updateMenuItem = async (item: MenuItemData): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/menu-items/${item.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.state) {
          setSiteData(json.state);
          localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
        }
        setLastSyncTime(new Date());
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMenuItem = async (id: string): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/menu-items/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.state) {
          setSiteData(json.state);
          localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
        }
        setLastSyncTime(new Date());
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const addMenuItem = async (item: MenuItemData): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/menu-items', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.state) {
          setSiteData(json.state);
          localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
        }
        setLastSyncTime(new Date());
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateRoom = async (room: RoomItemData): Promise<boolean> => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(room),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.state) {
          setSiteData(json.state);
          localStorage.setItem('hotel_diamond_live_data', JSON.stringify(json.state));
        }
        setLastSyncTime(new Date());
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        isLoading,
        isSaving,
        isEditing,
        setIsEditing,
        lastSyncTime,
        authToken,
        isAdminAuthenticated: !!authToken,
        loginAdmin,
        logoutAdmin,
        updateSiteData,
        updateHotelInfo,
        updateAttraction,
        deleteAttraction,
        addAttraction,
        updateMenuItem,
        deleteMenuItem,
        addMenuItem,
        updateRoom,
        uploadImage,
        saveAttractionPhoto,
        saveHotelPhoto,
        saveMenuItemPhoto,
        saveRoomPhoto,
        refetch: fetchSiteData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
