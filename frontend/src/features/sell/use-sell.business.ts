"use client";

import { toast } from "sonner";
import { extractBooksFromImage, type BookInfo } from "@/integrations/ocr";
import type { SellBook } from "./schema";

export const useSellBusiness = ({
  setIsScanning,
  setRecognizedBooks,
  setEditingBooks,
  setShowConfirmDialog,
  editingBooks,
  setScannedData,
}: {
  setIsScanning: (v: boolean) => void;
  setRecognizedBooks: (v: SellBook[]) => void;
  setEditingBooks: (v: SellBook[]) => void;
  setShowConfirmDialog: (v: boolean) => void;
  editingBooks: SellBook[];
  setScannedData: (v: SellBook | null) => void;
}) => {

  const handleImageUpload = async (file: File) => {
    if (file) {
      setIsScanning(true);
      try {
        const books = await extractBooksFromImage(file);
        
        if (books.length === 0) {
          toast.error("책 정보를 인식할 수 없습니다. 다시 시도해주세요.");
          setIsScanning(false);
          return;
        }
        
        const converted = books.map(b => ({
          title: b.title,
          author: b.author,
          isbn: b.isbn,
          publisher: b.publisher,
        }));

        setRecognizedBooks(converted);
        setEditingBooks(converted);
        setIsScanning(false);
        setShowConfirmDialog(true);
        toast.success(`${books.length}권의 책을 인식했습니다.`);
      } catch (error) {
        console.error("책 인식 실패:", error);
        setIsScanning(false);
        toast.error(
          error instanceof Error 
            ? error.message 
            : "책 정보를 인식하는 중 오류가 발생했습니다."
        );
      }
    }
  };

  const handleConfirmBooks = () => {
    if (editingBooks.length > 0) {
      setScannedData(editingBooks[0]);
      setShowConfirmDialog(false);
      toast.success("책 정보가 확인되었습니다!");
    }
  };

  const handleAddBook = () => {
    setEditingBooks([...editingBooks, { title: "", author: "" }]);
  };

  const handleRemoveBook = (index: number) => {
    setEditingBooks(editingBooks.filter((_, i) => i !== index));
  };

  const handleEditBook = (index: number, field: keyof SellBook, value: string) => {
    const updated = [...editingBooks];
    updated[index] = { ...updated[index], [field]: value };
    setEditingBooks(updated);
  };

  return {
    handleImageUpload,
    handleConfirmBooks,
    handleAddBook,
    handleRemoveBook,
    handleEditBook,
  };
};
