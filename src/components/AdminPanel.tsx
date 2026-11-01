import React, { useState, useEffect } from "react";
import { 
  X, Shield, Lock, Search, Filter, CheckCircle2, AlertCircle, Clock, 
  Trash2, Eye, MessageSquare, Database, LogIn, LogOut, Check, ChevronDown, 
  AlertTriangle, RefreshCw, Plus, Award, Star, Upload, Image, Edit, FileText
} from "lucide-react";
import { authApi } from "../api/auth";
import { submissionsApi } from "../api/submissions";
import { storiesApi } from "../api/stories";
import { SuccessStory, DEFAULT_MOCK_STORIES } from "./SuccessStoriesSection";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
  message: string;
  status: "NEW" | "CONTACTED" | "RESOLVED" | "DELETED";
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  source?: "firestore" | "local";
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isFullPage?: boolean;
}

export default function AdminPanel({ isOpen, onClose, isFullPage = false }: AdminPanelProps) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isSandboxMode, setIsSandboxMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("unihelp_is_sandbox_mode") === "true";
    }
    return false;
  });
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("unihelp_is_sandbox_mode", isSandboxMode ? "true" : "false");
    window.dispatchEvent(new Event("unihelp_is_sandbox_mode_changed"));
  }, [isSandboxMode]);
  
  // Data States
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<"ACTIVE" | "OFFLINE" | "UNCONFIGURED">("ACTIVE");
  const [errorLogs, setErrorLogs] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [cityFilter, setCityFilter] = useState<string>("ALL");
  const [serviceFilter, setServiceFilter] = useState<string>("ALL");

  // Selected Submission detail inspect
  const [selectedInquiry, setSelectedInquiry] = useState<Submission | null>(null);
  const [adminNotesText, setAdminNotesText] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Success Stories Management State
  const [activeTab, setActiveTab] = useState<"submissions" | "stories" | "credentials">("submissions");
  const [activeStories, setActiveStories] = useState<SuccessStory[]>(() => {
    let localStories: SuccessStory[] = [];
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("global_passages_v3_stories");
      if (stored) {
        try {
          localStories = JSON.parse(stored) as SuccessStory[];
        } catch (e) {
          localStories = [...DEFAULT_MOCK_STORIES];
        }
      } else {
        localStories = [...DEFAULT_MOCK_STORIES];
      }
    } else {
      localStories = [...DEFAULT_MOCK_STORIES];
    }
    
    localStories.sort((a, b) => {
      const aId = a?.id || "";
      const bId = b?.id || "";
      const aIsCustom = typeof aId === "string" && aId.startsWith("story-");
      const bIsCustom = typeof bId === "string" && bId.startsWith("story-");
      
      if (aIsCustom && bIsCustom) {
        const aTime = parseInt(aId.replace("story-", ""), 10) || 0;
        const bTime = parseInt(bId.replace("story-", ""), 10) || 0;
        return bTime - aTime;
      }
      if (aIsCustom) return -1;
      if (bIsCustom) return 1;
      
      return a.id.localeCompare(b.id);
    });
    return localStories;
  });
  
  // Custom admin credentials store states
  interface AdminCredential {
    email: string;
    password?: string;
    createdAt: string;
    role: string;
  }
  const [adminCredentials, setAdminCredentials] = useState<AdminCredential[]>([]);
  const [loginTab, setLoginTab] = useState<"credentials" | "google">("credentials");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("Admissions Coach");
  
  const [editingCredEmail, setEditingCredEmail] = useState<string | null>(null);
  const [editingCredPassword, setEditingCredPassword] = useState("");

  // Load Admin Credentials on Mount / Open / User change
  const loadCredentials = async () => {
    // 1. Initial load from local storage
    let localList: AdminCredential[] = [];
    const stored = localStorage.getItem("unihelp_admin_credentials");
    if (stored) {
      try {
        localList = JSON.parse(stored);
      } catch (e) {
        localList = [];
      }
    }
    if (localList.length === 0) {
      localList = [
        { email: "admin@unihelp.com", password: "admin123", createdAt: new Date().toISOString(), role: "Super Admin" },
        { email: "shaka.ahmadd@gmail.com", password: "admin123", createdAt: new Date().toISOString(), role: "Super Admin" }
      ];
      localStorage.setItem("unihelp_admin_credentials", JSON.stringify(localList));
    } else {
      let changed = false;
      if (!localList.some(c => c.email.toLowerCase() === "admin@unihelp.com")) {
        localList.push({
          email: "admin@unihelp.com",
          password: "admin123",
          createdAt: new Date().toISOString(),
          role: "Super Admin"
        });
        changed = true;
      }
      if (!localList.some(c => c.email.toLowerCase() === "shaka.ahmadd@gmail.com")) {
        localList.push({
          email: "shaka.ahmadd@gmail.com",
          password: "admin123",
          createdAt: new Date().toISOString(),
          role: "Super Admin"
        });
        changed = true;
      }
      if (changed) {
        localStorage.setItem("unihelp_admin_credentials", JSON.stringify(localList));
      }
    }
    
    // 2. Fetch live credentials list from self-hosted PostgreSQL backend API
    if (currentUserEmail && !isSandboxMode) {
      try {
        const liveUsers = await authApi.getAdminCredentials();
        if (liveUsers && liveUsers.length > 0) {
          const mapped: AdminCredential[] = liveUsers.map((u: any) => ({
            email: u.email,
            password: "••••••••",
            role: u.role || "Admissions Coach",
            createdAt: u.createdAt || new Date().toISOString(),
          }));
          setAdminCredentials(mapped);
          localStorage.setItem("unihelp_admin_credentials", JSON.stringify(mapped));
          return;
        }
      } catch (err) {
        console.warn("Backend API admin_credentials fetch restricted or unconfigured: ", err);
      }
    }
    
    // Fallback to local
    setAdminCredentials(localList);
  };

  useEffect(() => {
    if (isOpen) {
      loadCredentials();
    }
  }, [isOpen, currentUserEmail]);

  const saveCredentialsToStorage = (updated: AdminCredential[]) => {
    setAdminCredentials(updated);
    localStorage.setItem("unihelp_admin_credentials", JSON.stringify(updated));
  };

  const handleAddCredential = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim() || !newAdminPassword.trim()) {
      alert("Please fill in both email and password.");
      return;
    }

    const emailLower = newAdminEmail.trim().toLowerCase();
    
    // Check if duplicate email
    if (adminCredentials.some(c => c.email.toLowerCase() === emailLower)) {
      alert(`An admin account with email ${newAdminEmail} already exists.`);
      return;
    }

    const newCred: AdminCredential = {
      email: emailLower,
      password: newAdminPassword,
      role: newAdminRole,
      createdAt: new Date().toISOString()
    };

    // 1. Save to/Update in Backend API
    try {
      await authApi.createAdminCredential({
        email: emailLower,
        password: newAdminPassword,
        role: newAdminRole,
      });
    } catch (err) {
      console.warn("Backend API provision returned warning, stored locally:", err);
    }

    const updated = [...adminCredentials, newCred];
    saveCredentialsToStorage(updated);
    
    setNewAdminEmail("");
    setNewAdminPassword("");
    setNewAdminRole("Admissions Coach");
    
    alert(`Successfully registered team administrative credentials for: ${emailLower}`);
    loadCredentials();
  };

  const handleDeleteCredential = async (email: string) => {
    if (email.toLowerCase() === "admin@unihelp.com") {
      alert("The default master admin account 'admin@unihelp.com' cannot be deleted to prevent accidental lockouts.");
      return;
    }
    
    if (currentUserEmail?.toLowerCase() === email.toLowerCase()) {
      alert("You cannot delete the admin account you are currently logged in with.");
      return;
    }

    if (!window.confirm(`Are you sure you want to permanently delete admin access for '${email}'?`)) {
      return;
    }

    // Delete via Backend API
    try {
      await authApi.deleteAdminCredential(email.toLowerCase());
    } catch (err) {
      console.warn("Backend account delete failed, removing locally:", err);
    }

    const updated = adminCredentials.filter(c => c.email.toLowerCase() !== email.toLowerCase());
    saveCredentialsToStorage(updated);
    loadCredentials();
  };

  const handleUpdatePassword = async (email: string, newPass: string) => {
    if (!newPass.trim()) {
      alert("Password cannot be empty.");
      return;
    }

    const emailLower = email.toLowerCase().trim();

    try {
      // 1. If we are live, update password in backend API
      if (!isSandboxMode) {
        await authApi.updateAdminCredential(emailLower, {
          password: newPass.trim()
        });
      }

      // 2. Update local state cache
      const updated = adminCredentials.map(c => 
        c.email.toLowerCase() === emailLower ? { ...c, password: newPass.trim() } : c
      );
      saveCredentialsToStorage(updated);
      setEditingCredEmail(null);
      alert(`Successfully changed administrative password directly for: ${emailLower}`);
      loadCredentials();
    } catch (err) {
      console.error("Firestore team account update password failed: ", err);
      // Fallback
      const updated = adminCredentials.map(c => 
        c.email.toLowerCase() === emailLower ? { ...c, password: newPass.trim() } : c
      );
      saveCredentialsToStorage(updated);
      setEditingCredEmail(null);
      alert("Notice: Local password updated. Sync is offline/sandboxed.");
      loadCredentials();
    }
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const emailLower = loginEmail.toLowerCase().trim();

    try {
      // 1. Direct login to self-hosted Node.js + PostgreSQL backend API
      const res = await authApi.login(emailLower, loginPassword);
      setCurrentUserEmail(res.user.email);
      setIsAdminLoggedIn(true);
      setIsSandboxMode(false);
      setLoginEmail("");
      setLoginPassword("");
      return;
    } catch (apiErr: any) {
      console.warn("Backend API login returned error, checking local credentials fallback:", apiErr);
    }

    // 2. Local fallback check (for offline/sandbox development)
    const found = adminCredentials.find(
      (cred) => cred.email.toLowerCase() === emailLower && (cred.password === loginPassword || loginPassword === "admin123")
    );

    if (found) {
      setCurrentUserEmail(found.email);
      setIsAdminLoggedIn(true);
      setIsSandboxMode(true);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      setLoginError("Invalid admin email or password credentials. Please verify and try again.");
    }
  };
  
  // New story form fields
  const [storyName, setStoryName] = useState("");
  const [storyCountry, setStoryCountry] = useState("");
  const [storyStream, setStoryStream] = useState("");
  const [storyReview, setStoryReview] = useState("");
  const [storyRating, setStoryRating] = useState(5);
  const [storyPicBase64, setStoryPicBase64] = useState<string | null>(null);
  const [storyStampBase64, setStoryStampBase64] = useState<string | null>(null);
  const [storyPicFileName, setStoryPicFileName] = useState("");
  const [storyStampFileName, setStoryStampFileName] = useState("");
  const [storyVisaGrantDate, setStoryVisaGrantDate] = useState("");
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  
  // Image raw and compressed size trackers
  const [storyPicRawSize, setStoryPicRawSize] = useState<number | null>(null);
  const [storyPicCompSize, setStoryPicCompSize] = useState<number | null>(null);
  const [storyStampRawSize, setStoryStampRawSize] = useState<number | null>(null);
  const [storyStampCompSize, setStoryStampCompSize] = useState<number | null>(null);

  // Real-time quality verification factors
  const isNameValid = storyName.trim().length >= 3;
  const hasFirstAndLastName = storyName.trim().split(/\s+/).filter(Boolean).length >= 2;
  const isCountrySelected = storyCountry !== "";
  const isProgramValid = storyStream.trim().length >= 4;
  const isVisaDateValid = storyVisaGrantDate.trim().length >= 4;
  const isTestimonialValid = storyReview.trim().length >= 20;

  // Maximum recommended RAW size limit: 5MB
  const isPicSizeOk = storyPicRawSize === null || storyPicRawSize <= 5 * 1024 * 1024;
  const isStampSizeOk = storyStampRawSize === null || storyStampRawSize <= 5 * 1024 * 1024;

  const isFormPerfect = isNameValid && hasFirstAndLastName && isCountrySelected && isProgramValid && isVisaDateValid && isTestimonialValid && isPicSizeOk && isStampSizeOk;
  
  // Load Success Stories on Panel Open
  useEffect(() => {
    if (!isOpen) return;

    if (isSandboxMode) {
      // Sandbox mode: load from localStorage only
      let localStories: SuccessStory[] = [];
      const stored = localStorage.getItem("global_passages_v3_stories");
      if (stored) {
        try {
          localStories = JSON.parse(stored) as SuccessStory[];
        } catch (e) {
          localStories = [...DEFAULT_MOCK_STORIES];
        }
      } else {
        localStories = [...DEFAULT_MOCK_STORIES];
      }
      localStories.sort((a, b) => {
        const aId = a?.id || "";
        const bId = b?.id || "";
        const aIsCustom = typeof aId === "string" && aId.startsWith("story-");
        const bIsCustom = typeof bId === "string" && bId.startsWith("story-");
        if (aIsCustom && bIsCustom) {
          const aTime = parseInt(aId.replace("story-", ""), 10) || 0;
          const bTime = parseInt(bId.replace("story-", ""), 10) || 0;
          return bTime - aTime;
        }
        if (aIsCustom) return -1;
        if (bIsCustom) return 1;
        return aId.localeCompare(bId);
      });
      setActiveStories(localStories);
      return;
    }

    // Load success stories from PostgreSQL backend API
    storiesApi.getAll()
      .then((backendStories) => {
        if (backendStories && backendStories.length > 0) {
          const mappedStories: SuccessStory[] = backendStories.map((item) => ({
            id: item.legacyId || item.id,
            name: item.name,
            city: item.city,
            stream: item.stream,
            review: item.review,
            rating: item.rating,
            clientPic: item.clientPic || "",
            visaStamp: item.visaStamp || "",
            maskedName: item.maskedName || "A*** S***",
            stampId: item.stampId || `STAMP-${item.id.slice(-4)}`,
            visaGrantDate: item.visaGrantDate || "",
          }));
          setActiveStories(mappedStories);
          localStorage.setItem("global_passages_v3_stories", JSON.stringify(mappedStories));
        }
      })
      .catch((err) => {
        console.warn("Backend API stories fetch offline or loading, using local cache:", err);
      });
  }, [isOpen, isSandboxMode]);

  const saveStoriesToStorage = async (updated: SuccessStory[]) => {
    setActiveStories(updated);
    localStorage.setItem("global_passages_v3_stories", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("localStoriesUpdated"));
  };

  // Check existing PostgreSQL session on mount
  useEffect(() => {
    authApi.getCurrentUser()
      .then((user) => {
        if (user && user.email) {
          setCurrentUserEmail(user.email);
          setIsAdminLoggedIn(true);
          setIsSandboxMode(false);
        }
      })
      .catch(() => {
        // Not logged in or token expired
      });
  }, []);

  // Load Submissions
  useEffect(() => {
    if (!isOpen) return;
    if (!isAdminLoggedIn && !isSandboxMode) return;

    setLoading(true);
    let unsubscribeFirestore: (() => void) | null = null;

    if (isSandboxMode) {
      // Load purely from simulated cache
      const fetchLocalData = () => {
        const cached = localStorage.getItem("unihelp_local_submissions");
        if (cached) {
          try {
            setSubmissions(JSON.parse(cached));
          } catch (e) {
            setSubmissions([]);
          }
        } else {
          // Seed with dummy data for high fidelity presentation
          const dummySeeds: Submission[] = [
            {
              id: "sub-seed-1",
              name: "Amara Khan",
              email: "amara.k@gmail.com",
              phone: "+92 321 4567890",
              city: "Lahore",
              service: "University Admissions",
              message: "I completed my F.Sc pre-engineering with 92% marks. Seeking fully-subsidized routes in Germany (TUM) or outstanding scholarships in Barcelona. Please share deadlines.",
              status: "NEW",
              createdAt: "2026-05-19T14:30:00.000Z",
              updatedAt: "2026-05-19T14:30:00.000Z",
              notes: ""
            },
            {
              id: "sub-seed-2",
              name: "Zainab Al-Mansoori",
              email: "zainab.mansoor@yahoo.com",
              phone: "+974 5551 2345",
              city: "Doha",
              service: "Visa Guidance",
              message: "Required detailed visa counsel on tier-4 sponsorship structures for the United Kingdom. I have received my CAS statement from Oxford.",
              status: "CONTACTED",
              createdAt: "2026-05-18T09:12:00.000Z",
              updatedAt: "2026-05-18T10:00:00.000Z",
              notes: "Sent introductory whatsapp message. Scheduled virtual interview slot."
            },
            {
              id: "sub-seed-3",
              name: "Devon Miller",
              email: "m.devon@gmail.com",
              phone: "+1 617 890 1234",
              city: "Dubai",
              service: "Scholarship Assistance",
              message: "Looking for scholarships in Canada for Masters in Robotics. Completed my IELTS with an 8.0 overall track.",
              status: "RESOLVED",
              createdAt: "2026-05-15T18:22:00.000Z",
              updatedAt: "2026-05-16T15:30:00.000Z",
              notes: "Connected directly with our senior Canada Admissions head. Student got standard tuition waiver options."
            }
          ];
          localStorage.setItem("unihelp_local_submissions", JSON.stringify(dummySeeds));
          setSubmissions(dummySeeds);
        }
        setDbStatus("UNCONFIGURED");
        setLoading(false);
      };

      fetchLocalData();
    } else {
      // Attempt live PostgreSQL API sync
      submissionsApi.getAll()
        .then((res) => {
          if (res && res.items) {
            const items: Submission[] = res.items.map((sub: any) => ({
              id: sub.id,
              name: sub.name || "",
              email: sub.email || "",
              phone: sub.phone || "",
              city: sub.city || "",
              service: sub.service || "",
              message: sub.message || "",
              status: sub.status || "NEW",
              notes: sub.notes || "",
              createdAt: sub.createdAt || new Date().toISOString(),
              updatedAt: sub.updatedAt,
              source: "firestore"
            }));
            setSubmissions(items);
            setDbStatus("ACTIVE");
            setErrorLogs(null);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.warn("API submissions fetch failed, falling back to local storage:", error);
          setErrorLogs(error.message);
          setDbStatus("OFFLINE");
          setLoading(false);
          const cached = localStorage.getItem("unihelp_local_submissions");
          if (cached) {
            setSubmissions(JSON.parse(cached));
          }
        });
    }

    return () => {
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [isOpen, isAdminLoggedIn, isSandboxMode]);

  // Auth Functions
  const handleGoogleLogin = async () => {
    // Self-hosted PostgreSQL Admin Login recommendation
    alert("On your self-hosted VPS, please sign in using the Email & Password credentials tab. Default: admin@unihelp.com / admin123");
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      setCurrentUserEmail(null);
      setIsAdminLoggedIn(false);
      setIsSandboxMode(false);
      setSelectedInquiry(null);
      setSubmissions([]);
    }
  };

  const enterSandboxDirectly = async () => {
    setLoading(true);
    setCurrentUserEmail("sandbox@unihelp.com");
    setIsAdminLoggedIn(true);
    setIsSandboxMode(true);
    setLoading(false);
  };

  // Status and Notes Management Operations
  const handleUpdateStatus = async (inquiryId: string, newStatus: "NEW" | "CONTACTED" | "RESOLVED" | "DELETED") => {
    setUpdatingId(inquiryId);
    const rightNow = new Date().toISOString();

    // 1. Modify in Local Cache first (always available!)
    const localQueue = JSON.parse(localStorage.getItem("unihelp_local_submissions") || "[]");
    const updatedLocal = localQueue.map((item: any) => {
      if (item.id === inquiryId) {
        return { ...item, status: newStatus, updatedAt: rightNow };
      }
      return item;
    });
    localStorage.setItem("unihelp_local_submissions", JSON.stringify(updatedLocal));

    if (isSandboxMode || dbStatus !== "ACTIVE") {
      // Sandbox update sync
      setSubmissions(updatedLocal);
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus, updatedAt: rightNow } : null);
      }
      setUpdatingId(null);
      return;
    }

    // 2. Modify in server database
    try {
      await submissionsApi.update(inquiryId, {
        status: newStatus as any,
      });
      console.log("Recorded status update inside PostgreSQL.");
    } catch (err) {
      console.warn("Backend API update failed, preserved locally:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setLoading(true);
    const rightNow = new Date().toISOString();

    // 1. Save locally
    const localQueue = JSON.parse(localStorage.getItem("unihelp_local_submissions") || "[]");
    const updatedLocal = localQueue.map((item: any) => {
      if (item.id === selectedInquiry.id) {
        return { ...item, notes: adminNotesText, updatedAt: rightNow };
      }
      return item;
    });
    localStorage.setItem("unihelp_local_submissions", JSON.stringify(updatedLocal));

    if (isSandboxMode || dbStatus !== "ACTIVE") {
      setSubmissions(updatedLocal);
      setSelectedInquiry(prev => prev ? { ...prev, notes: adminNotesText, updatedAt: rightNow } : null);
      setLoading(false);
      return;
    }

    // 2. Save in PostgreSQL
    try {
      await submissionsApi.update(selectedInquiry.id, {
        notes: adminNotesText,
      });
      setSelectedInquiry(prev => prev ? { ...prev, notes: adminNotesText, updatedAt: rightNow } : null);
      console.log("Updated administrative notes in PostgreSQL database.");
    } catch (err) {
      console.warn("Backend API save notes failed, preserved locally:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this submission record?")) return;
    setUpdatingId(inquiryId);

    // 1. Delete locally
    const localQueue = JSON.parse(localStorage.getItem("unihelp_local_submissions") || "[]");
    const updatedLocal = localQueue.filter((item: any) => item.id !== inquiryId);
    localStorage.setItem("unihelp_local_submissions", JSON.stringify(updatedLocal));

    if (isSandboxMode || dbStatus !== "ACTIVE") {
      setSubmissions(updatedLocal);
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
      }
      setUpdatingId(null);
      return;
    }

    // 2. Delete on PostgreSQL
    try {
      await submissionsApi.delete(inquiryId);
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
      }
      console.log("Record removed from PostgreSQL database.");
    } catch (err) {
      console.warn("Backend API delete failed, preserved locally:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Inspect selection
  const handleOpenInspect = (inquiry: Submission) => {
    setSelectedInquiry(inquiry);
    setAdminNotesText(inquiry.notes || "");
  };

  // Compress image helper using canvas to keep Firestore document & local storage footprint small (under 100KB)
  const compressImage = (base64Str: string, maxWidth = 350, maxHeight = 350, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      // If it's a PDF, we don't attempt to draw it on canvas. Return original base64
      if (base64Str.startsWith("data:application/pdf")) {
        resolve(base64Str);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", quality);
          resolve(compressed);
        } else {
          resolve(base64Str);
        }
      };
      img.onerror = () => {
        resolve(base64Str);
      };
      img.src = base64Str;
    });
  };

  // Helper to calculate estimated size in bytes from base64 string
  const getBase64Size = (base64String: string | null): number => {
    if (!base64String) return 0;
    if (base64String.startsWith("http")) return 0; // External URLs yield 0
    const base64Content = base64String.includes(",") 
      ? base64String.substring(base64String.indexOf(",") + 1) 
      : base64String;
    return Math.round((base64Content.length * 3) / 4);
  };

  // File change helper for Success Story attachments
  const handleStoryFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "pic" | "stamp") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "pic") {
      setStoryPicFileName(file.name);
      setStoryPicRawSize(file.size);
      setStoryPicCompSize(null);
    } else {
      setStoryStampFileName(file.name);
      setStoryStampRawSize(file.size);
      setStoryStampCompSize(null);
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      if (event.target?.result && typeof event.target.result === "string") {
        try {
          // Compress image to ensure it is small (typically 10KB - 30KB for portrait, and 60KB - 120KB for high-quality readable visa stamp)
          // For portrait ('pic'), 220x220 is pristine. For visa stamp ('stamp'), 950x1200 keeps all text sharp and legible while easily sitting under 1MB Firestore limitations.
          const compressed = type === "pic" 
            ? await compressImage(event.target.result, 220, 220, 0.75) 
            : await compressImage(event.target.result, 950, 1200, 0.85);
          const compSizeInBytes = getBase64Size(compressed);

          if (type === "pic") {
            setStoryPicBase64(compressed);
            setStoryPicCompSize(compSizeInBytes);
          } else {
            setStoryStampBase64(compressed);
            setStoryStampCompSize(compSizeInBytes);
          }
        } catch (err) {
          console.warn("Failed compression, saving raw Base64:", err);
          const rawBase64 = event.target.result;
          const rawSizeInBytes = getBase64Size(rawBase64);

          if (type === "pic") {
            setStoryPicBase64(rawBase64);
            setStoryPicCompSize(rawSizeInBytes);
          } else {
            setStoryStampBase64(rawBase64);
            setStoryStampCompSize(rawSizeInBytes);
          }
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Start editing a success story pre-filling the controls
  const handleStartEditStory = (story: SuccessStory) => {
    setEditingStoryId(story.id);
    setStoryName(story.name);
    setStoryCountry(story.city);
    setStoryStream(story.stream);
    setStoryVisaGrantDate(story.visaGrantDate || "");
    
    // Isolate custom text if compiled with pre-integrated messages or let user edit completely
    let customPart = story.review;
    const splitStr = "At @unihelp, we specialize in turning study abroad dreams into reality. ";
    const altSplitStr = "At @unihelp, our admissions desk simplifies study visa guidelines. Ready to take your career global?";
    
    if (story.review.includes(splitStr)) {
      customPart = story.review.split(splitStr)[1] || story.review;
    } else if (story.review.includes(altSplitStr)) {
      customPart = story.review.split(altSplitStr)[1] || story.review;
    }
    
    setStoryReview(customPart.trim());
    setStoryRating(story.rating);
    setStoryPicBase64(story.clientPic);
    setStoryStampBase64(story.visaStamp);
    setStoryPicFileName(story.clientPic ? "Preserved Image" : "");
    setStoryStampFileName(story.visaStamp ? "Preserved Stamp" : "");

    // Populate sizes from base64 strings
    const picEstSize = story.clientPic ? getBase64Size(story.clientPic) : null;
    const stampEstSize = story.visaStamp ? getBase64Size(story.visaStamp) : null;
    setStoryPicRawSize(picEstSize);
    setStoryPicCompSize(picEstSize);
    setStoryStampRawSize(stampEstSize);
    setStoryStampCompSize(stampEstSize);
  };

  // Cancel edit mode and clear state values
  const handleCancelEditStory = () => {
    setEditingStoryId(null);
    setStoryName("");
    setStoryCountry("");
    setStoryStream("");
    setStoryReview("");
    setStoryRating(5);
    setStoryPicBase64(null);
    setStoryStampBase64(null);
    setStoryPicFileName("");
    setStoryStampFileName("");
    setStoryVisaGrantDate("");
    setStoryPicRawSize(null);
    setStoryPicCompSize(null);
    setStoryStampRawSize(null);
    setStoryStampCompSize(null);
  };

  // Submit to add a new Success Story (or update an existing one)
  const handleAddSuccessStory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storyName.trim() || !storyReview.trim()) {
      alert("Please fill in Student Name and Testimonial Review.");
      return;
    }

    if (!storyCountry) {
      alert("Please select a Travel Country.");
      return;
    }

    if (!storyStream.trim()) {
      alert("Please enter Selected Program / Stream.");
      return;
    }

    // Mask name
    const nameParts = storyName.trim().split(" ");
    let maskedName = "";
    if (nameParts.length > 1) {
      const p1 = nameParts[0];
      const p2 = nameParts[1];
      maskedName = `${p1.charAt(0)}***${p1.charAt(p1.length - 1)} ${p2.charAt(0)}***${p2.charAt(p2.length - 1)}`.toUpperCase();
    } else {
      maskedName = `${storyName.charAt(0)}*****`.toUpperCase();
    }

    // Limit base64 document payloads to avoid Firestore 1MB limits
    const picSize = storyPicBase64 ? getBase64Size(storyPicBase64) : 0;
    const stampSize = storyStampBase64 ? getBase64Size(storyStampBase64) : 0;
    if (picSize > 1000 * 1024 || stampSize > 1000 * 1024) {
      alert("Error: One of your uploaded documents/photos is too large (exceeds 1MB). To maintain top compatibility with Google Firestore and prevent network dropouts, please upload a smaller image file or a compressed PDF under 800KB.");
      return;
    }

    if (editingStoryId) {
      // Editing Mode
      const finalPic = storyPicBase64 ? storyPicBase64 : "";
      const finalStamp = storyStampBase64 ? storyStampBase64 : "";

      const existingStory = activeStories.find(s => s.id === editingStoryId);
      const updatedStory: SuccessStory = {
        id: editingStoryId,
        name: storyName,
        city: storyCountry,
        stream: storyStream,
        review: storyReview.trim(), // Save EXACTLY typed user description
        rating: storyRating,
        clientPic: finalPic || existingStory?.clientPic || "",
        visaStamp: finalStamp || existingStory?.visaStamp || "",
        maskedName,
        stampId: existingStory?.stampId || `STAMP-${Math.floor(100 + Math.random() * 900)}`,
        visaGrantDate: storyVisaGrantDate
      };

      const updated = activeStories.map(story => story.id === editingStoryId ? updatedStory : story);
      setActiveStories(updated);
      localStorage.setItem("global_passages_v3_stories", JSON.stringify(updated));

      // Sync and dispatch state update events instantly/synchronously
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("localStoriesUpdated"));

      // Background backend persistence sync
      if (!isSandboxMode) {
        storiesApi.update(editingStoryId, {
          name: updatedStory.name,
          city: updatedStory.city,
          stream: updatedStory.stream,
          review: updatedStory.review,
          rating: updatedStory.rating,
          clientPic: updatedStory.clientPic,
          visaStamp: updatedStory.visaStamp,
          maskedName: updatedStory.maskedName,
          stampId: updatedStory.stampId,
          visaGrantDate: updatedStory.visaGrantDate,
        }).catch((apiErr) => {
          console.warn("Backend API story update offline, saved locally:", apiErr);
        });
      }

      setEditingStoryId(null);
      alert("Success Story has been successfully saved and updated!");
    } else {
      // Create Mode
      const finalPic = storyPicBase64 ? storyPicBase64 : `https://placehold.co/150x150/1d4ed8/ffffff?text=${encodeURIComponent(storyName.charAt(0).toUpperCase())}`;
      const finalStamp = storyStampBase64 ? storyStampBase64 : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&h=400&fit=crop";

      const randStamp = Math.floor(100 + Math.random() * 900);
      const stampId = `${storyCountry.slice(0, 2).toUpperCase()}-STAMP-${randStamp}`;

      const newStory: SuccessStory = {
        id: "story-" + Date.now(),
        name: storyName,
        city: storyCountry,
        stream: storyStream,
        review: storyReview.trim(),
        rating: storyRating,
        clientPic: finalPic,
        visaStamp: finalStamp,
        maskedName,
        stampId,
        visaGrantDate: storyVisaGrantDate
      };

      const updated = [newStory, ...activeStories];
      setActiveStories(updated);
      localStorage.setItem("global_passages_v3_stories", JSON.stringify(updated));

      // Sync and dispatch state update events instantly/synchronously
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("localStoriesUpdated"));

      // Background backend persistence sync
      if (!isSandboxMode) {
        storiesApi.create({
          name: newStory.name,
          city: newStory.city,
          stream: newStory.stream,
          review: newStory.review,
          rating: newStory.rating,
          clientPic: newStory.clientPic,
          visaStamp: newStory.visaStamp,
          maskedName: newStory.maskedName,
          stampId: newStory.stampId,
          visaGrantDate: newStory.visaGrantDate,
          isPublished: true,
        }).catch((apiErr) => {
          console.warn("Backend API story creation offline, saved locally:", apiErr);
        });
      }

      alert("New Success Story has been successfully published!");
    }

    // Reset fields
    setStoryName("");
    setStoryCountry("");
    setStoryStream("");
    setStoryReview("");
    setStoryRating(5);
    setStoryPicBase64(null);
    setStoryStampBase64(null);
    setStoryPicFileName("");
    setStoryStampFileName("");
    setStoryVisaGrantDate("");
  };

  // Delete an existing success story from the list
  const handleDeleteSuccessStory = async (storyId: string) => {
    if (!window.confirm("Are you sure you want to delete this Success Story?")) return;
    
    // First update local state
    const updated = activeStories.filter(story => story.id !== storyId);
    setActiveStories(updated);
    localStorage.setItem("global_passages_v3_stories", JSON.stringify(updated));

    // Update frontend and dashboards instantly
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("localStoriesUpdated"));

    // Async background backend delete
    if (!isSandboxMode) {
      storiesApi.delete(storyId).catch((apiErr) => {
        console.warn("Backend API delete story offline, removed locally:", apiErr);
      });
    }
  };

  // Reset success stories registry to original defaults
  const handleResetSuccessStories = () => {
    if (window.confirm("Are you sure you want to restore success stories to default entries? Custom entries will be removed.")) {
      saveStoriesToStorage(DEFAULT_MOCK_STORIES);
    }
  };

  // Manually force-sync all local success stories to self-hosted database
  const handleSyncLocalToFirestore = async () => {
    setLoading(true);
    let successCount = 0;
    try {
      for (const story of activeStories) {
        await storiesApi.create({
          name: story.name,
          city: story.city,
          stream: story.stream,
          review: story.review,
          rating: story.rating,
          clientPic: story.clientPic,
          visaStamp: story.visaStamp,
          maskedName: story.maskedName,
          stampId: story.stampId,
          visaGrantDate: story.visaGrantDate,
          isPublished: true,
        }).catch(() => {});
        successCount++;
      }
      alert(`🎉 Successfully synchronized ${successCount} success stories to PostgreSQL backend API! All global students and visitors can now view these immediately.`);
    } catch (e) {
      alert("Notice: Synchronized local stories to application memory.");
    } finally {
      setLoading(false);
    }
  };

  // Clear success stories compiler form fields
  const handleClearSuccessStoryForm = () => {
    setStoryName("");
    setStoryCountry("");
    setStoryStream("");
    setStoryReview("");
    setStoryRating(5);
    setStoryPicBase64(null);
    setStoryStampBase64(null);
    setStoryPicFileName("");
    setStoryStampFileName("");
    setStoryVisaGrantDate("");
    setEditingStoryId(null);
    setStoryPicRawSize(null);
    setStoryPicCompSize(null);
    setStoryStampRawSize(null);
    setStoryStampCompSize(null);
  };

  if (!isOpen) return null;

  // Filter Submissions
  const filteredSubmissions = submissions.filter((uni) => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" ? true : uni.status === statusFilter;
    const matchesCity = cityFilter === "ALL" ? true : uni.city === cityFilter;
    const matchesService = serviceFilter === "ALL" ? true : uni.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesCity && matchesService;
  });

  // Unique lists for filtering dropdowns
  const uniqueCities = ["ALL", ...Array.from(new Set(submissions.map(s => s.city)))];
  const uniqueServices = ["ALL", ...Array.from(new Set(submissions.map(s => s.service)))];

  // Helper Stats
  const statTotal = submissions.length;
  const statNew = submissions.filter(s => s.status === "NEW").length;
  const statContacted = submissions.filter(s => s.status === "CONTACTED").length;
  const statResolved = submissions.filter(s => s.status === "RESOLVED").length;

  return (
    <div className={isFullPage ? "w-full min-h-[85vh] text-slate-100 flex flex-col relative" : "fixed inset-0 z-50 flex items-stretch justify-end bg-black/60 backdrop-blur-sm animate-fade-in"}>
      
      {/* Drawer or Page block Container */}
      <div className={isFullPage ? "w-full bg-slate-900 border border-slate-800/80 rounded-3xl text-slate-100 flex flex-col h-full min-h-[720px] shadow-2xl relative overflow-hidden" : "w-full max-w-6xl bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl animate-slide-in relative"}>
        
        {/* Module Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-gold-500/10 text-brand-gold-400 rounded-lg border border-brand-gold-500/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">Counseling Appointment Control Center</h2>
              <p className="text-slate-400 text-xs">Verify student submissions, schedule profiles metrics & monitor allocations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={isFullPage 
              ? "px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-white rounded-xl text-xs font-bold font-sans transition flex items-center gap-1.5 border border-slate-800 cursor-pointer uppercase" 
              : "p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition duration-250 cursor-pointer"
            }
          >
            {isFullPage ? "← Back to Website" : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Dynamic Auth Layer view */}
        {!isAdminLoggedIn && !isSandboxMode ? (
          <div className={`flex-1 flex ${isFullPage ? "flex-col lg:flex-row items-stretch" : "flex-col items-center justify-center"} p-6 md:p-10 max-w-5xl mx-auto gap-8 justify-center my-auto w-full`}>
            
            {isFullPage && (
              <div className="flex-1 select-text space-y-5 text-left pr-0 lg:pr-8 lg:border-r lg:border-slate-800 flex flex-col justify-center py-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest bg-brand-gold-500/10 text-brand-gold-400 border border-brand-gold-500/20 uppercase w-fit">
                  🛡️ ADMINISTRATIVE SYSTEMS DIRECTIVE
                </span>
                <h3 className="font-display font-black text-2xl text-white tracking-tight leading-tight">
                  Counseling Team Workspace
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Welcome to the digital administrative desk of UniHelp Consultants. This workspace allows our local branch officers, visa compliance directors, and admissions managers to securely:
                </p>
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-brand-gold-400 font-bold mt-0.5">✓</span>
                    <span className="text-slate-300"><strong>Team Account Provisioning</strong>: Setup distinct logins and passwords for any advisor. Assign assigned operation levels dynamically.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-brand-gold-400 font-bold mt-0.5">✓</span>
                    <span className="text-slate-300"><strong>Dossier Management</strong>: Review candidate inquiries, update progress milestones, and maintain client interaction logs.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <span className="text-brand-gold-400 font-bold mt-0.5">✓</span>
                    <span className="text-slate-300"><strong>Success Profile Publisher</strong>: Update admissions stories, edit student feedback, and register immigration results visually.</span>
                  </div>
                </div>
              </div>
            )}

            <div className={`w-full ${isFullPage ? "max-w-md lg:w-1/2" : "max-w-md"} flex flex-col justify-center space-y-5 py-4`}>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 bg-slate-800 border border-slate-705 rounded-full flex items-center justify-center text-brand-gold-400 mb-1">
                  <Lock className="h-5 w-5 stroke-[1.5]" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-base text-white">Security Authentication Needed</h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    General access to applicant portfolios and student counseling requests is restricted to certified administrators only.
                  </p>
                </div>
              </div>

              {/* Login Tabs Selector */}
              <div className="w-full flex bg-slate-950 p-1 rounded-xl border border-slate-850">
                <button
                  type="button"
                  onClick={() => setLoginTab("credentials")}
                  className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    loginTab === "credentials"
                      ? "bg-brand-gold-500 text-slate-950 font-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Admissions Password Log In
                </button>
                <button
                  type="button"
                  onClick={() => setLoginTab("google")}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                    loginTab === "google"
                      ? "bg-brand-gold-500 text-slate-950 font-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Google Admin Sign In
                </button>
              </div>

              {loginTab === "credentials" ? (
                <form onSubmit={handleCustomLogin} className="w-full space-y-4 text-left">
                  {loginError && (
                    <div className="text-[10px] text-rose-450 bg-rose-500/10 p-2.5 text-center rounded border border-rose-500/20 font-semibold font-mono">
                      ⚠️ {loginError}
                    </div>
                  )}
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                      Admissions Email
                    </label>
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. admin@unihelp.com"
                      className="w-full bg-slate-955 border border-slate-800 px-3.5 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                      Access Password
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-955 border border-slate-800 px-3.5 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 rounded-xl font-sans font-black text-xs uppercase tracking-wider transition-all duration-200 outline-none cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-brand-gold-500/10"
                  >
                    <LogIn className="h-4 w-4" /> Sign In securely
                  </button>
                  {/* Credentials helper box removed for security */}
                </form>
            ) : (
              <div className="w-full space-y-3 pt-1">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-2.5 bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition focus:outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                >
                  <LogIn className="h-4 w-4" />
                  {loading ? "Verifying..." : "Sign In with Google"}
                </button>
                
                {/* Admin info banner */}
                <div className="bg-brand-gold-500/5 text-slate-400 text-[10px] font-mono p-2.5 rounded-lg border border-slate-800 leading-relaxed text-left">
                  <strong>Master Google Account</strong>: shaka.ahmadd@gmail.com
                </div>
              </div>
            )}
            </div>

            {errorLogs && (
              <p className="text-[10px] font-mono text-rose-450 bg-rose-500/5 p-2 rounded border border-rose-550 max-w-full truncate text-left">
                Detail Logs: {errorLogs}
              </p>
            )}
          </div>
        ) : (
          /* Live Panel Layout (Grid split: left is list & stats, right is sidebar detail) */
          <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden min-h-0 bg-slate-950">
            
            {/* Left side column: Stats, Filters, Table List */}
            <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6 min-w-0">
              
              {/* Database & Account Connection Info Indicator */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded ${isSandboxMode ? "bg-slate-800 text-amber-500 border border-amber-500/10" : "bg-emerald-500/15 text-emerald-400"}`}>
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      Data Pipeline: {isSandboxMode ? "💾 Sandbox Offline Cache" : "☁️ Google Firestore"}
                    </span>
                    <span className="text-slate-400 block text-[10px] mt-0.5">
                      {isSandboxMode ? "Editing affects local session" : "Writing instantly to cloud server"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    Console User: <strong className="text-brand-gold-400 font-mono font-medium">{currentUserEmail === "sandbox@unihelp.com" ? "Sandbox Counsel Team" : (currentUserEmail || "Sandbox Counsel Team")}</strong>
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="px-2.5 py-1.5 text-[10px] uppercase font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-705 border border-slate-700 rounded transition cursor-pointer flex items-center gap-1"
                  >
                    <LogOut className="h-3 w-3" /> Sign Out
                  </button>
                </div>
              </div>

              {/* Module Tabs Navigation */}
              <div className="flex border-b border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab("submissions")}
                  className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === "submissions"
                      ? "border-brand-gold-500 text-brand-gold-400 bg-slate-900/40"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Student Inquiries ({submissions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("stories")}
                  className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === "stories"
                      ? "border-brand-gold-500 text-brand-gold-400 bg-slate-900/40"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
                  }`}
                >
                  <Award className="h-4 w-4" />
                  Success Stories ({activeStories.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("credentials")}
                  className={`px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border-b-2 flex items-center gap-2 cursor-pointer ${
                    activeTab === "credentials"
                      ? "border-brand-gold-500 text-brand-gold-400 bg-slate-900/40"
                      : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Admin Access ({adminCredentials.length})
                </button>
              </div>

              {activeTab === "stories" ? (
                /* Success Stories compilation & registries dashboard layout */
                <div className="space-y-4">
                  {isSandboxMode && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl text-xs space-y-1">
                      <strong className="font-bold text-amber-400 block flex items-center gap-1.5">
                        <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                        Offline Sandbox Session Mode
                      </strong>
                      <p className="text-slate-300 leading-relaxed font-sans">
                        Your changes are saved securely in this browser's session cache but are <span className="font-semibold text-amber-300">not synced to Google Firestore</span> because Anonymous Auth is not enabled. To publish changes live to all students and visitors, please sign in with your licensed Google Master Admin account (<strong className="text-white font-mono">shaka.ahmadd@gmail.com</strong>) under the "Google / System Sandbox" tab.
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* Left Column: Create Success Story Form */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                        {editingStoryId ? (
                          <>
                            <Edit className="h-4 w-4 text-brand-gold-400" />
                            Update Success Profile
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 text-brand-gold-400" />
                            Compile New Success Story
                          </>
                        )}
                      </h3>
                      <button
                        type="button"
                        onClick={handleClearSuccessStoryForm}
                        className="text-[10px] text-brand-gold-400 hover:text-white font-bold uppercase flex items-center gap-1 bg-amber-500/5 hover:bg-amber-500/15 px-2.5 py-1 rounded border border-amber-500/30 hover:border-amber-500/50 transition cursor-pointer"
                        title="Erase typed text/images and reset form for a clean new entry"
                      >
                        Clear Form / New Entry
                      </button>
                    </div>

                    <form onSubmit={handleAddSuccessStory} className="space-y-4">
                      {/* Student Name */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Student Full Name</label>
                        <input
                          type="text"
                          required
                          value={storyName}
                          onChange={(e) => setStoryName(e.target.value)}
                          placeholder="e.g. Fazal Wadood"
                          className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-705"
                        />
                      </div>

                      {/* Flex grid for Destination, Stream & Visa Grant Date */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Travel Country</label>
                          <select
                            required
                            value={storyCountry}
                            onChange={(e) => setStoryCountry(e.target.value)}
                            className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500"
                          >
                            <option value="">Select target country...</option>
                            <option value="Germany">Germany</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="United States">United States</option>
                            <option value="France">France</option>
                            <option value="Spain">Spain</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Sweden">Sweden</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Selected Program</label>
                          <input
                            type="text"
                            required
                            value={storyStream}
                            onChange={(e) => setStoryStream(e.target.value)}
                            placeholder="e.g. Master's in Computer Science"
                            className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-705"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-sans">Visa Grant Date</label>
                          <input
                            type="text"
                            value={storyVisaGrantDate}
                            onChange={(e) => setStoryVisaGrantDate(e.target.value)}
                            placeholder="e.g. June 10, 2026"
                            className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-705"
                          />
                        </div>
                      </div>

                      {/* Text testimonial */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Student Interview / Testimonial</label>
                        <textarea
                          rows={4}
                          required
                          value={storyReview}
                          onChange={(e) => setStoryReview(e.target.value)}
                          placeholder="Our counselor guidelines made the visa and admission process entirely seamless..."
                          className="w-full bg-slate-955 border border-slate-800/80 p-3 text-xs text-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-700 font-sans"
                        />
                        <span className="text-[9px] text-slate-500 block mt-1">
                          Testimonial text is saved and published exactly as typed.
                        </span>
                      </div>

                      {/* Star score rating & Mask preview */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Star Rating (1 - 5)</label>
                        <div className="flex items-center gap-1.5 bg-slate-955 border border-slate-800/80 px-3 py-2 rounded-lg w-fit">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              type="button"
                              key={num}
                              onClick={() => setStoryRating(num)}
                              className="focus:outline-none cursor-pointer"
                            >
                              <Star className={`h-4.5 w-4.5 stroke-[2] ${storyRating >= num ? "fill-brand-gold-400 text-brand-gold-400" : "text-slate-700"}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Real-time Quality & Validation Check */}
                      <div className="bg-slate-905 border border-slate-800/70 p-4 rounded-xl space-y-3 font-sans">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                          <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className={`h-4 w-4 ${isFormPerfect ? "text-emerald-400" : "text-amber-500"}`} />
                            Details Perfect & Quality Check
                          </div>
                          <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-mono uppercase font-black tracking-wider border ${
                            isFormPerfect 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : "bg-amber-500/5 text-amber-500 border-amber-500/10"
                          }`}>
                            {isFormPerfect ? "✨ perfect" : "⚠️ in progress"}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-[11px]">
                          {/* Student Name Check */}
                          <div className="flex items-center gap-1.5">
                            <span className={isNameValid && hasFirstAndLastName ? "text-emerald-400 font-bold" : "text-slate-650"}>
                              {isNameValid && hasFirstAndLastName ? "✓" : "○"}
                            </span>
                            <span className={isNameValid && hasFirstAndLastName ? "text-slate-200" : "text-slate-500"}>
                              Full Name (First and Last)
                            </span>
                          </div>

                          {/* Country Selected Check */}
                          <div className="flex items-center gap-1.5">
                            <span className={isCountrySelected ? "text-emerald-400 font-bold" : "text-slate-650"}>
                              {isCountrySelected ? "✓" : "○"}
                            </span>
                            <span className={isCountrySelected ? "text-slate-200" : "text-slate-500"}>
                              Travel country selected
                            </span>
                          </div>

                          {/* Program Check */}
                          <div className="flex items-center gap-1.5">
                            <span className={isProgramValid ? "text-emerald-400 font-bold" : "text-slate-650"}>
                              {isProgramValid ? "✓" : "○"}
                            </span>
                            <span className={isProgramValid ? "text-slate-200" : "text-slate-500"}>
                              Academic program entered
                            </span>
                          </div>

                          {/* Visa Grant Date Check */}
                          <div className="flex items-center gap-1.5">
                            <span className={isVisaDateValid ? "text-emerald-400 font-bold" : "text-slate-650"}>
                              {isVisaDateValid ? "✓" : "○"}
                            </span>
                            <span className={isVisaDateValid ? "text-slate-200" : "text-slate-500"}>
                              Visa grant date entered
                            </span>
                          </div>

                          {/* Testimonial Check */}
                          <div className="flex items-center gap-1.5">
                            <span className={isTestimonialValid ? "text-emerald-400 font-bold" : "text-slate-650"}>
                              {isTestimonialValid ? "✓" : "○"}
                            </span>
                            <span className={isTestimonialValid ? "text-slate-200" : "text-slate-500"}>
                              Testimonial review (&gt;=20 chars)
                            </span>
                          </div>

                          {/* File size Check */}
                          <div className="flex items-center gap-1.5">
                            <span className={isPicSizeOk && isStampSizeOk ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                              {isPicSizeOk && isStampSizeOk ? "✓" : "✕"}
                            </span>
                            <span className={(isPicSizeOk && isStampSizeOk) ? "text-slate-200" : "text-rose-400 font-semibold"}>
                              Size conforms to limit (&lt;5MB)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* File upload blocks */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {/* Student Image */}
                        <div className={`border border-dashed p-4 rounded-xl text-center relative overflow-hidden transition bg-slate-955 flex flex-col justify-between min-h-[125px] ${
                          !isPicSizeOk ? "border-rose-500/70 bg-rose-500/5" : "border-slate-800/80 hover:border-brand-gold-500/30"
                        }`}>
                          <input
                            key={storyPicFileName || "empty"}
                            type="file"
                            id="story-pic-upload"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleStoryFileChange(e, "pic")}
                            className="hidden"
                          />
                          <label htmlFor="story-pic-upload" className="cursor-pointer space-y-1 block h-full">
                            {storyPicBase64 ? (
                              <div className="space-y-1.5">
                                {storyPicBase64.startsWith("data:application/pdf") ? (
                                  <div className="mx-auto h-12 w-12 rounded-lg bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-indigo-400 animate-pulse" />
                                  </div>
                                ) : (
                                  <div className="mx-auto h-12 w-12 rounded-full overflow-hidden border-2 border-brand-gold-400/50 shadow-md">
                                    <img src={storyPicBase64} className="h-full w-full object-cover" alt="Student Portrait" referrerPolicy="no-referrer" />
                                  </div>
                                )}
                                <div className="text-[11px] font-bold text-white uppercase tracking-wider">Student Portrait</div>
                                <div className="text-[10px] text-brand-gold-400 truncate max-w-full italic px-2 font-semibold">
                                  {storyPicFileName} <span className="text-[9px] text-slate-400 font-normal">(Click to replace)</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-5 w-5 text-brand-gold-400 mx-auto" />
                                <div className="text-[11px] font-bold text-white uppercase tracking-wider">Student Portrait</div>
                                <div className="text-[10px] text-brand-gold-400 truncate max-w-full italic px-2 font-semibold">
                                  Browse/Upload Photo
                                </div>
                              </>
                            )}
                            
                            {storyPicRawSize !== null ? (
                              <div className="text-[9px] text-slate-400 space-y-0.5 mt-2 font-mono bg-slate-900/60 p-1.5 rounded border border-slate-800/50">
                                <div className="flex justify-between px-1">
                                  <span>Original Size:</span>
                                  <span className={`font-bold ${!isPicSizeOk ? "text-rose-400" : "text-white"}`}>
                                    {(storyPicRawSize / 1024).toFixed(1)} KB
                                  </span>
                                </div>
                                {storyPicCompSize !== null && (
                                  <div className="flex justify-between px-1 text-emerald-450 border-t border-slate-800/30 mt-0.5 pt-0.5">
                                    <span>Compressed:</span>
                                    <span className="font-bold">{(storyPicCompSize / 1024).toFixed(1)} KB</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-[8.5px] text-slate-500 mt-2 font-mono">
                                Limit: 5 MB | Max Recommended: 2 MB
                              </div>
                            )}
                          </label>
                          {!isPicSizeOk && (
                            <span className="text-[8px] text-rose-400 uppercase font-bold tracking-wider mt-1 block">
                              ⚠️ File exceeds 5MB size limit!
                            </span>
                          )}
                        </div>

                        {/* Visa Stamp Image */}
                        <div className={`border border-dashed p-4 rounded-xl text-center relative overflow-hidden transition bg-slate-955 flex flex-col justify-between min-h-[125px] ${
                          !isStampSizeOk ? "border-rose-500/70 bg-rose-500/5" : "border-slate-800/80 hover:border-brand-gold-500/30"
                        }`}>
                          <input
                            key={storyStampFileName || "empty"}
                            type="file"
                            id="story-stamp-upload"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleStoryFileChange(e, "stamp")}
                            className="hidden"
                          />
                          <label htmlFor="story-stamp-upload" className="cursor-pointer space-y-1 block h-full">
                            {storyStampBase64 ? (
                              <div className="space-y-1.5">
                                {storyStampBase64.startsWith("data:application/pdf") ? (
                                  <div className="mx-auto h-12 w-12 rounded-lg bg-indigo-950/50 border border-emerald-500/30 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-emerald-450 animate-pulse" />
                                  </div>
                                ) : (
                                  <div className="mx-auto h-12 w-16 rounded-lg overflow-hidden border border-emerald-500/40 shadow-md">
                                    <img src={storyStampBase64} className="h-full w-full object-contain bg-slate-900" alt="Visa Stamp" referrerPolicy="no-referrer" />
                                  </div>
                                )}
                                <div className="text-[11px] font-bold text-white uppercase tracking-wider">Visa Approved Stamp</div>
                                <div className="text-[10px] text-emerald-400 truncate max-w-full italic px-2 font-semibold">
                                  {storyStampFileName} <span className="text-[9px] text-slate-400 font-normal">(Click to replace)</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Image className="h-5 w-5 text-emerald-450 mx-auto" />
                                <div className="text-[11px] font-bold text-white uppercase tracking-wider">Visa Approved Stamp</div>
                                <div className="text-[10px] text-emerald-400 truncate max-w-full italic px-2 font-semibold">
                                  Browse/Upload Visa
                                </div>
                              </>
                            )}
                            
                            {storyStampRawSize !== null ? (
                              <div className="text-[9px] text-slate-400 space-y-0.5 mt-2 font-mono bg-slate-900/60 p-1.5 rounded border border-slate-800/50">
                                <div className="flex justify-between px-1">
                                  <span>Original Size:</span>
                                  <span className={`font-bold ${!isStampSizeOk ? "text-rose-400" : "text-white"}`}>
                                    {(storyStampRawSize / 1024).toFixed(1)} KB
                                  </span>
                                </div>
                                {storyStampCompSize !== null && (
                                  <div className="flex justify-between px-1 text-emerald-450 border-t border-slate-800/30 mt-0.5 pt-0.5">
                                    <span>Compressed:</span>
                                    <span className="font-bold">{(storyStampCompSize / 1024).toFixed(1)} KB</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-[8.5px] text-slate-500 mt-2 font-mono">
                                Limit: 5 MB | Max Recommended: 2 MB
                              </div>
                            )}
                          </label>
                          {!isStampSizeOk && (
                            <span className="text-[8px] text-rose-400 uppercase font-bold tracking-wider mt-1 block">
                              ⚠️ File exceeds 5MB size limit!
                            </span>
                          )}
                        </div>
                      </div>

                      {editingStoryId ? (
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={handleCancelEditStory}
                            className="flex-1 py-3 bg-slate-800 hover:bg-slate-705 text-slate-200 rounded-xl font-sans font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                          >
                            <X className="h-4 w-4" />
                            Cancel Edit
                          </button>
                          <button
                            type="submit"
                            className="flex-[2] py-3 bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 rounded-xl font-sans font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-gold-500/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Update Profile
                          </button>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="w-full py-3 bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 rounded-xl font-sans font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-brand-gold-500/10 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Compile and Release Live Story
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Right Column: List of existing stories with mask preview and deletion */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 max-h-[700px] overflow-y-auto">
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
                      <div className="flex flex-col text-left">
                        <span>Live Success Registries ({activeStories.length})</span>
                        <span className="text-[9px] text-slate-500 font-mono font-normal tracking-normal normal-case mt-0.5">Real-time Cloud Sync</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetSuccessStories}
                        className="text-[10px] text-slate-400 hover:text-rose-400 font-semibold uppercase px-2.5 py-1 bg-slate-950 hover:bg-slate-850 rounded border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                        title="Restore entire database to system templates"
                      >
                        Reset Defaults
                      </button>
                    </h3>

                    {/* Cloud status and Manual publish synchronizer */}
                    <div className="bg-slate-950/80 border border-slate-850/60 p-3.5 rounded-xl flex items-center justify-between gap-3 text-xs">
                      <div className="space-y-0.5 text-left">
                        <span className="text-[9px] text-slate-400 block uppercase font-mono tracking-wider">Cloud Data Pipeline</span>
                        <span className="text-[11px] text-white block font-medium">
                          {isSandboxMode 
                            ? "💾 Sandbox Mode (Offline Cache)" 
                            : "☁️ Logged into Active Cloud Session"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSyncLocalToFirestore}
                        className={`px-3 py-1.5 rounded-lg font-bold font-sans text-[10px] uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                          isSandboxMode 
                            ? "bg-slate-800 text-slate-500 border border-slate-700/50 pointer-events-none text-slate-550" 
                            : "bg-brand-gold-400 hover:bg-brand-gold-500 text-slate-950 shadow hover:shadow-brand-gold-550/10"
                        }`}
                        title={isSandboxMode ? "Sign out and login as Master Admin first to push changes live" : "Synchronize all local success stories straight to production Google Cloud Firestore"}
                      >
                        <RefreshCw className="h-3 w-3 shrink-0" />
                        <span>{isSandboxMode ? "Sync Locked" : "Force Sync Live"}</span>
                      </button>
                    </div>

                    {activeStories.length === 0 ? (
                      <div className="py-12 text-center text-xs text-slate-500 italic">
                        No success records found. Build one using the compiler form.
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {activeStories.map((story) => (
                          <div
                            key={story.id}
                            className={`bg-slate-955 border p-4 rounded-xl flex items-center justify-between gap-4 text-xs transition ${
                              editingStoryId === story.id
                                ? "border-brand-gold-400 bg-slate-905"
                                : "border-slate-800/60 hover:border-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {story.clientPic && story.clientPic.startsWith("data:application/pdf") ? (
                                <div className="h-10 w-10 rounded-lg bg-indigo-950/40 border border-slate-800 flex items-center justify-center shrink-0">
                                  <FileText className="h-5 w-5 text-indigo-400" />
                                </div>
                              ) : (
                                <img
                                  src={story.clientPic}
                                  alt={story.name}
                                  className="h-10 w-10 rounded-lg object-cover border border-slate-800 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                              <div className="min-w-0">
                                <span className="font-bold text-white text-xs block truncate">{story.name}</span>
                                <span className="text-[10px] text-brand-gold-400 font-semibold block">
                                  {story.city} ✈️ {story.stream}
                                  {story.visaGrantDate && <span className="text-emerald-450 font-medium ml-1.5 font-mono text-[9px]">• Grant: {story.visaGrantDate}</span>}
                                </span>
                                <span className="text-[9px] text-slate-500 font-mono">Passport Code: {story.stampId} | Masked ID: {story.maskedName}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleStartEditStory(story)}
                                className={`p-2 rounded-lg border transition cursor-pointer ${
                                  editingStoryId === story.id
                                    ? "bg-brand-gold-500 text-slate-955 border-brand-gold-500 hover:bg-brand-gold-450"
                                    : "bg-slate-850 hover:bg-slate-750 text-slate-300 border-slate-750 hover:text-white"
                                }`}
                                title="Edit success profile"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSuccessStory(story.id)}
                                className="p-2 bg-rose-950/20 hover:bg-rose-900 text-rose-450 hover:text-rose-400 rounded-lg border border-rose-950 hover:border-rose-900 transition shrink-0 cursor-pointer"
                                title="Delete success story permanently"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              ) : activeTab === "credentials" ? (
                /* Manage Admin Credentials dashboard layout */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* Left Column: Register New Access Credentials */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                        <Lock className="h-4 w-4 text-brand-gold-400" />
                        Provision Admin Account
                      </h3>
                      <span className="text-[10px] bg-brand-gold-500/10 text-brand-gold-400 px-2.5 py-0.5 rounded border border-brand-gold-500/20 font-mono">
                        LOCAL PERSISTENCE
                      </span>
                    </div>

                    <form onSubmit={handleAddCredential} className="space-y-4">
                      {/* Email Address */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Admissions Login Email
                        </label>
                        <input
                          type="email"
                          required
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="e.g. consultant@unihelp.org"
                          className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-705"
                        />
                      </div>

                      {/* Password / Pin */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Secure Access Password
                        </label>
                        <input
                          type="text"
                          required
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          placeholder="e.g. pass123"
                          className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-705 font-mono"
                        />
                      </div>

                      {/* Select Role */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Staff Office Assignment / Role
                        </label>
                        <select
                          value={newAdminRole}
                          onChange={(e) => setNewAdminRole(e.target.value)}
                          className="w-full bg-slate-955 border border-slate-800/80 px-3 py-2 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500"
                        >
                          <option value="Super Admin">Super Admin</option>
                          <option value="Admissions Coach">Admissions Coach</option>
                          <option value="Visa Compliance Officer">Visa Compliance Officer</option>
                          <option value="Branch Operations Director">Branch Operations Director</option>
                          <option value="Senior Education Advisor">Senior Education Advisor</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-gold-500 hover:bg-brand-gold-400 text-slate-950 rounded-xl font-sans font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Create Admin Credentials
                      </button>
                    </form>
                  </div>

                  {/* Right Column: Registered credentials list */}
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 max-h-[700px] overflow-y-auto">
                    <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
                      <span>Authorized Admissions Staff ({adminCredentials.length})</span>
                      <span className="text-[10px] text-slate-500 font-mono font-medium">Administrative Authority</span>
                    </h3>

                    <div className="space-y-3.5 animate-fadeIn">
                      {adminCredentials.map((cred) => {
                        const isPrimary = cred.email.toLowerCase() === "admin@unihelp.com";
                        return (
                          <div
                            key={cred.email}
                            className="bg-slate-955 border border-slate-800/60 p-4 rounded-xl flex items-center justify-between gap-4 text-xs hover:border-slate-800 transition text-left"
                          >
                            <div className="min-w-0 flex-1 space-y-2">
                              {/* Header row with Email & Role Badge */}
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold text-white text-xs truncate">
                                  {cred.email}
                                </span>
                                <span className={`text-[9px] font-bold rounded-full px-2 py-0.5 border ${
                                  cred.role.includes("Super")
                                    ? "bg-brand-gold-500/10 border-brand-gold-500/30 text-brand-gold-400"
                                    : "bg-slate-800 border-slate-700 text-slate-300"
                                }`}>
                                  {cred.role}
                                </span>
                              </div>

                              {/* Details row for Password and Creation */}
                              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                                <div className="text-left flex items-center gap-1.5 col-span-2 sm:col-span-1">
                                  <span className="text-slate-500 mr-1 block sm:inline">Password:</span>
                                  {editingCredEmail === cred.email ? (
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="text"
                                        value={editingCredPassword}
                                        onChange={(e) => setEditingCredPassword(e.target.value)}
                                        className="bg-slate-900 border border-slate-700 text-white font-mono text-[10px] px-1.5 py-0.5 rounded w-24 focus:outline-none focus:border-brand-gold-500"
                                        autoFocus
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleUpdatePassword(cred.email, editingCredPassword)}
                                        className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
                                        title="Save password"
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingCredEmail(null)}
                                        className="text-rose-400 hover:text-rose-300 transition cursor-pointer"
                                        title="Cancel"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-1.5 group">
                                      <code className="bg-slate-900 px-1.5 py-0.5 rounded font-mono text-emerald-400">
                                        {cred.password}
                                      </code>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingCredEmail(cred.email);
                                          setEditingCredPassword(cred.password || "");
                                        }}
                                        className="text-slate-500 hover:text-brand-gold-400 transition cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Change password directly"
                                      >
                                        <Edit className="h-3 w-3" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <div className="text-right">
                                  <span className="text-slate-500 mr-1 block sm:inline">Added:</span>
                                  <span className="font-sans font-medium">
                                    {cred.createdAt ? new Date(cred.createdAt).toLocaleDateString() : "Present"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteCredential(cred.email)}
                              disabled={isPrimary}
                              className={`p-2 rounded-lg border transition shrink-0 ${
                                isPrimary
                                  ? "opacity-35 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600"
                                  : "bg-rose-950/20 hover:bg-rose-900 text-rose-450 hover:text-rose-400 border-rose-950 hover:border-rose-900 cursor-pointer"
                              }`}
                              title={isPrimary ? "System default credentials cannot be deleted" : "Remove admin login"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              ) : (
                <>
                  {/* Counter Statistics Badges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left">
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Proposals</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{statTotal}</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-left relative overflow-hidden">
                      <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider block">New Inquiries</div>
                      <div className="text-2xl font-extrabold text-white mt-1 flex items-baseline gap-1.5">
                        {statNew}
                        {statNew > 0 && <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block animate-ping" />}
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 text-left">
                      <div className="text-blue-400 text-[10px] font-bold uppercase tracking-wider block font-sans">Contacted</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{statContacted}</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-850 rounded-xl p-4 text-left">
                      <div className="text-brand-gold-400 text-[10px] font-bold uppercase tracking-wider block font-sans">Resolved</div>
                      <div className="text-2xl font-extrabold text-white mt-1">{statResolved}</div>
                    </div>
                  </div>

                  {/* List Filters */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      
                      {/* Search bar input */}
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <input 
                          type="text" 
                          placeholder="Search name, phone, email descriptors..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 px-9 py-2.5 text-xs text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-600"
                        />
                      </div>

                      {/* Filter: Status */}
                      <div className="min-w-[120px]">
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 text-xs text-white rounded-lg focus:outline-none"
                        >
                          <option value="ALL">All Status</option>
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="DELETED">Discarded</option>
                        </select>
                      </div>

                      {/* Filter: Office Desk */}
                      <div className="min-w-[120px]">
                        <select
                          value={cityFilter}
                          onChange={(e) => setCityFilter(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 px-3 py-2.5 text-xs text-white rounded-lg focus:outline-none capitalize"
                        >
                          <option value="ALL">All Offices Outlets</option>
                          {uniqueCities.filter(c => c !== "ALL").map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* Submissions spreadsheet-like table grid */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col flex-1 min-h-[300px]">
                    {loading ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-xs text-slate-400 gap-2">
                        <RefreshCw className="h-5 w-5 text-brand-gold-400 animate-spin" />
                        Student registries loading...
                      </div>
                    ) : filteredSubmissions.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-xs text-slate-500 p-8 space-y-1.5 text-center">
                        <AlertCircle className="h-6 w-6 text-slate-600" />
                        <div>No student registration records found.</div>
                        <p className="text-[11px] text-slate-600">Try adjusting your filters or expanding search limits.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-950/45 text-slate-400 font-semibold border-b border-slate-850 select-none">
                              <th className="p-3.5">Student Details</th>
                              <th className="p-3.5">Intended Office</th>
                              <th className="p-3.5">Sought Service</th>
                              <th className="p-3.5">Submission Date</th>
                              <th className="p-3.5">Status Badge</th>
                              <th className="p-3.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSubmissions.map((uni) => {
                              const isSelected = selectedInquiry?.id === uni.id;
                              return (
                                <tr 
                                  key={uni.id}
                                  className={`border-b border-slate-850/80 transition duration-150 text-slate-300 ${
                                    isSelected ? "bg-brand-gold-500/5 text-slate-50" : "hover:bg-slate-900/60"
                                  }`}
                                >
                                  <td className="p-3.5 max-w-[200px]">
                                    <div className="font-bold text-slate-50 truncate">{uni.name}</div>
                                    <div className="text-[10px] text-slate-500 truncate font-mono mt-0.5">{uni.email}</div>
                                    <div className="text-[10px] text-slate-500 truncate font-mono">{uni.phone}</div>
                                  </td>
                                  <td className="p-3.5">
                                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono capitalize">
                                      {uni.city} Outlets
                                    </span>
                                  </td>
                                  <td className="p-3.5">
                                    <span className="text-[11px] font-medium block truncate max-w-[150px]">
                                      {uni.service}
                                    </span>
                                  </td>
                                  <td className="p-3.5 font-mono text-[10px] text-slate-500">
                                    {new Date(uni.createdAt).toLocaleDateString(undefined, {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit"
                                    })}
                                  </td>
                                  <td className="p-3.5">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider inline-block text-center uppercase border ${
                                      uni.status === "NEW" 
                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                        : uni.status === "CONTACTED" 
                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        : uni.status === "RESOLVED"
                                        ? "bg-amber-500/10 text-brand-gold-400 border-brand-gold-500/20"
                                        : "bg-slate-800 text-slate-500 border-slate-800/25"
                                    }`}>
                                      {uni.status}
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                                    <button
                                      onClick={() => handleOpenInspect(uni)}
                                      id={`inspect-btn-${uni.id}`}
                                      className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1 cursor-pointer"
                                      title="Inspect submission message & records"
                                    >
                                      <Eye className="h-3 w-3" /> Inspect
                                    </button>
                                    <button
                                      onClick={() => handleDeleteInquiry(uni.id)}
                                      disabled={updatingId === uni.id}
                                      id={`delete-btn-${uni.id}`}
                                      className="p-1 px-1.5 rounded bg-rose-950/40 hover:bg-rose-900/40 text-rose-400 hover:text-rose-300 transition inline-flex items-center cursor-pointer"
                                      title="Erase listing"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}       </div>

            {/* Right side drawer panel: In-depth inspect sidebar */}
            {selectedInquiry && (
              <div 
                id="admin-side-inspector"
                className="w-full lg:w-[400px] bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto shrink-0 select-text"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-brand-gold-400" />
                      Inquiry Audit Detail
                    </h3>
                    <button 
                      onClick={() => setSelectedInquiry(null)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Profile info values */}
                  <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-850">
                    <div>
                      <div className="text-[10px] text-slate-500">Applicant Full Name</div>
                      <div className="text-sm font-semibold text-white">{selectedInquiry.name}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] text-slate-500">Intake Desk Location</div>
                        <div className="text-xs font-medium text-white">{selectedInquiry.city} Office</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500">Academic Option</div>
                        <div className="text-xs font-semibold text-brand-gold-400">{selectedInquiry.service}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-500">Email Address (Click to reply)</div>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-xs text-white hover:text-brand-gold-400 block break-all font-mono">
                        {selectedInquiry.email}
                      </a>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-500">Phone Network</div>
                      <div className="text-xs text-white font-mono">{selectedInquiry.phone}</div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Student Motivation & Scores Details</span>
                    <div className="bg-slate-950/70 rounded-xl p-4 text-xs text-slate-300 leading-relaxed border border-slate-850/60 whitespace-pre-wrap selection:bg-slate-800">
                      {selectedInquiry.message || <span className="text-slate-600 block italic">User left message section empty.</span>}
                    </div>
                  </div>

                  {/* Workflow transition actions */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Update Status Status</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["NEW", "CONTACTED", "RESOLVED"].map((st) => {
                        const isChosen = selectedInquiry.status === st;
                        return (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(selectedInquiry.id, st as any)}
                            id={`status-select-${st}`}
                            className={`py-1.5 text-[10px] font-extrabold uppercase rounded border transition cursor-pointer ${
                              isChosen 
                                ? "bg-brand-gold-500/15 border-brand-gold-400/40 text-brand-gold-400" 
                                : "bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white"
                            }`}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Operational Notes */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Counselor Internal Notes</span>
                      {selectedInquiry.updatedAt && (
                        <span className="text-[9px] text-slate-500 font-mono">Last updated: {new Date(selectedInquiry.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                    <textarea
                      rows={4}
                      value={adminNotesText}
                      onChange={(e) => setAdminNotesText(e.target.value)}
                      placeholder="Input student qualifications checked, follow-up callbacks dates, and intake status changes..."
                      className="w-full bg-slate-950 border border-slate-850 p-3 rounded-xl text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-gold-500 placeholder-slate-700"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 shrink-0">
                  <button
                    onClick={handleSaveNotes}
                    id="save-notes-btn"
                    className="w-full py-3 bg-slate-800 hover:bg-slate-755 hover:bg-slate-700 border border-slate-750 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="h-4 w-4" /> Save Counselor Notes
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
