"use client";

import { useState } from "react";
import type { SellBook } from "./schema";

export const useSellUI = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<SellBook | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [recognizedBooks, setRecognizedBooks] = useState<SellBook[]>([]);
  const [editingBooks, setEditingBooks] = useState<SellBook[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return {
    isScanning,
    setIsScanning,
    scannedData,
    setScannedData,
    isDragging,
    setIsDragging,
    showConfirmDialog,
    setShowConfirmDialog,
    recognizedBooks,
    setRecognizedBooks,
    editingBooks,
    setEditingBooks,
    handleDragOver,
    handleDragLeave,
  };
};
