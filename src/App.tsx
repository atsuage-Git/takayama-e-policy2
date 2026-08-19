import React, { useState, useEffect, useMemo } from 'react';
import { GUIDEBOOK_PAGES } from './data/guidebookData';
import { GuidebookPage, ViewMode } from './types';
import { Header } from './components/Header';
import { SlideViewer } from './components/SlideViewer';
import { BookViewer } from './components/BookViewer';
import { GridViewer } from './components/GridViewer';
import { PrintViewer } from './components/PrintViewer';
import { PageDetailsDrawer } from './components/PageDetailsDrawer';
import { ImageManagerModal } from './components/ImageManagerModal';
import { FavoritesModal } from './components/FavoritesModal';
import { loadImagesFromStorage, saveImagesToStorage } from './utils/imageStorage';

export default function App() {
  // Sort pages by file numerical prefix ascending
  // (001 -> 401 -> 403 -> 404 -> 406 -> 501-1 -> 501-2 -> 502 -> 601 -> 602 -> 603 -> 701 -> 702 -> 703 -> 704 -> 705 -> 706 -> 707 -> 708 -> 709)
  const pages: GuidebookPage[] = useMemo(() => {
    return [...GUIDEBOOK_PAGES].sort((a, b) => a.sortOrder - b.sortOrder);
  }, []);

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('slide');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals & Drawers
  const [selectedPageForDetails, setSelectedPageForDetails] = useState<GuidebookPage | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState<boolean>(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Local storage states: favorites, notes, customImages (IndexedDB persisted)
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('guidebook_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('guidebook_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customImages, setCustomImages] = useState<Record<number, string>>({});

  // Check static /images/ folder and load persisted images from IndexedDB on startup
  useEffect(() => {
    async function initImages() {
      // 1. First check IndexedDB
      const savedImages = await loadImagesFromStorage();
      const initialMap: Record<number, string> = { ...savedImages };

      // 2. Check if static files exist in /images/
      for (const p of pages) {
        if (!initialMap[p.id]) {
          const candidates = [
            `/images/${p.fileName}`,
            `/images/${encodeURIComponent(p.fileName)}`,
            `/images/${p.fileNumber}.png`,
            `/images/${p.fileNumber}.jpg`,
            `/images/${p.fileNumber}.jpeg`,
            `/images/${p.fileNumber}.PNG`,
            `/images/${p.fileNumber}.JPG`,
            `/images/${p.fileNumber}.webp`,
            `/images/page_${p.fileNumber}.png`,
            `/images/page_${p.fileNumber}.jpg`,
          ];
          for (const url of candidates) {
            try {
              const res = await fetch(url, { method: 'HEAD' });
              if (res.ok) {
                initialMap[p.id] = url;
                break;
              }
            } catch {
              // Ignore fetch error
            }
          }
        }
      }

      if (Object.keys(initialMap).length > 0) {
        setCustomImages(initialMap);
      }
    }

    initImages();
  }, [pages]);

  // Update custom images & persist to IndexedDB
  const handleUpdateImages = (newImages: Record<number, string>) => {
    setCustomImages(newImages);
    saveImagesToStorage(newImages);
  };

  // Upload single image for a specific page
  const handleUploadSingleImage = (pageId: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const dataUrl = e.target.result as string;
        const next = { ...customImages, [pageId]: dataUrl };
        handleUpdateImages(next);
      }
    };
    reader.readAsDataURL(file);
  };

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('guidebook_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.warn('Could not save favorites to localStorage', err);
    }
  }, [favorites]);

  // Sync notes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('guidebook_notes', JSON.stringify(notes));
    } catch (err) {
      console.warn('Could not save notes to localStorage', err);
    }
  }, [notes]);

  // Handle URL hash changes (e.g. #page=3)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/page=(\d+)/);
      if (match) {
        const pageId = parseInt(match[1], 10);
        const idx = pages.findIndex(p => p.id === pageId);
        if (idx !== -1) {
          setCurrentPageIndex(idx);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pages]);

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      setCurrentPageIndex(index);
      window.location.hash = `page=${pages[index].id}`;
    }
  };

  const handleSelectPageById = (pageId: number) => {
    const idx = pages.findIndex(p => p.id === pageId);
    if (idx !== -1) {
      setCurrentPageIndex(idx);
      setViewMode('slide');
      window.location.hash = `page=${pageId}`;
    }
  };

  const handleToggleFavorite = (pageId: number) => {
    setFavorites(prev => 
      prev.includes(pageId) ? prev.filter(id => id !== pageId) : [...prev, pageId]
    );
  };

  const handleSaveNote = (pageId: number, noteText: string) => {
    setNotes(prev => ({
      ...prev,
      [pageId]: noteText
    }));
  };

  const handleOpenDetails = (page: GuidebookPage) => {
    setSelectedPageForDetails(page);
    setIsDetailsOpen(true);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Filtered pages for search
  const displayPages = useMemo(() => {
    if (!searchQuery.trim()) return pages;
    const q = searchQuery.toLowerCase();
    return pages.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.fileName.toLowerCase().includes(q) ||
      p.fileNumber.includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.targetAudience.some(a => a.toLowerCase().includes(q))
    );
  }, [pages, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] font-sans text-[#43423E] antialiased select-none">
      {/* Navigation Header without AI */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenImageManager={() => setIsImageManagerOpen(true)}
        customImageCount={Object.keys(customImages).length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Content Area Based on View Mode */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {viewMode === 'slide' && (
          <SlideViewer
            pages={displayPages.length > 0 ? displayPages : pages}
            currentPageIndex={currentPageIndex >= (displayPages.length || pages.length) ? 0 : currentPageIndex}
            onPageChange={handlePageChange}
            customImages={customImages}
            isFavorite={(id) => favorites.includes(id)}
            onToggleFavorite={handleToggleFavorite}
            notes={notes}
            onSaveNote={handleSaveNote}
            onOpenDetails={handleOpenDetails}
            onUploadImage={handleUploadSingleImage}
          />
        )}

        {viewMode === 'book' && (
          <BookViewer
            pages={displayPages.length > 0 ? displayPages : pages}
            currentPageIndex={currentPageIndex}
            onPageChange={handlePageChange}
            customImages={customImages}
            isFavorite={(id) => favorites.includes(id)}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetails={handleOpenDetails}
          />
        )}

        {viewMode === 'grid' && (
          <GridViewer
            pages={pages}
            onSelectPage={(idx) => {
              setCurrentPageIndex(idx);
              setViewMode('slide');
            }}
            customImages={customImages}
            isFavorite={(id) => favorites.includes(id)}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetails={handleOpenDetails}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {viewMode === 'print' && (
          <PrintViewer
            pages={displayPages.length > 0 ? displayPages : pages}
            customImages={customImages}
          />
        )}
      </main>

      {/* Slide-out Details Drawer */}
      <PageDetailsDrawer
        page={selectedPageForDetails}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        isFavorite={selectedPageForDetails ? favorites.includes(selectedPageForDetails.id) : false}
        onToggleFavorite={() => {
          if (selectedPageForDetails) {
            handleToggleFavorite(selectedPageForDetails.id);
          }
        }}
        onNavigateToPage={(pageId) => {
          handleSelectPageById(pageId);
        }}
      />

      {/* Image Manager Modal (Drag & Drop PNGs with instant match) */}
      <ImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        pages={pages}
        customImages={customImages}
        onUpdateImages={handleUpdateImages}
      />

      {/* Favorites / Bookmarks Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favorites={favorites}
        pages={pages}
        onSelectPage={handleSelectPageById}
        onRemoveFavorite={(id) => handleToggleFavorite(id)}
        onClearAllFavorites={() => setFavorites([])}
      />
    </div>
  );
}
