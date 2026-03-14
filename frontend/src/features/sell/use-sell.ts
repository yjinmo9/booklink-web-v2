"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSellUI } from "./use-sell.ui";
import { useSellBusiness } from "./use-sell.business";

export const useSellController = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const ui = useSellUI();
  const business = useSellBusiness({
    setIsScanning: ui.setIsScanning,
    setRecognizedBooks: ui.setRecognizedBooks,
    setEditingBooks: ui.setEditingBooks,
    setShowConfirmDialog: ui.setShowConfirmDialog,
    editingBooks: ui.editingBooks,
    setScannedData: ui.setScannedData,
  });

  const goBack = () => {
    router.back();
  };

  const navigateToMarketplace = () => {
    router.push("/marketplace");
  };

  const handleFileSelectClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      business.handleImageUpload(file);
      e.target.value = '';
    } else if (file) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    ui.setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      business.handleImageUpload(file);
    } else if (file) {
      toast.error("이미지 파일만 업로드 가능합니다.");
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      business.handleImageUpload(file);
      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("책이 성공적으로 등록되었습니다!");
    setTimeout(() => {
      navigateToMarketplace();
    }, 1500);
  };

  return {
    ...ui,
    ...business,
    isMobile,
    fileInputRef,
    cameraInputRef,
    handleFileSelectClick,
    handleFileInput,
    handleDrop,
    handleCameraClick,
    handleCameraCapture,
    handleSubmit,
    goBack,
    navigateToMarketplace,
  };
};
