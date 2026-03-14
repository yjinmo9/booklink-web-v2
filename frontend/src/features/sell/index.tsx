"use client";

import { useSellController } from "./use-sell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Camera, Upload, Sparkles, Plus, X } from "lucide-react";

export function SellView() {
  const {
    isScanning,
    scannedData,
    isDragging,
    showConfirmDialog,
    setShowConfirmDialog,
    editingBooks,
    isMobile,
    fileInputRef,
    cameraInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelectClick,
    handleFileInput,
    handleCameraClick,
    handleCameraCapture,
    handleAddBook,
    handleRemoveBook,
    handleEditBook,
    handleConfirmBooks,
    handleSubmit,
    navigateToMarketplace,
  } = useSellController();

  return (
    <div className="min-h-screen bg-background">
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>인식된 책 정보</DialogTitle>
            <DialogDescription>
              이 정보가 맞습니까? 수정이 필요하면 직접 편집할 수 있습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {editingBooks.map((book, index) => (
              <Card key={index} className="p-4 space-y-3 relative">
                {editingBooks.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => handleRemoveBook(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                <div className="space-y-2">
                  <Label>책 제목 {editingBooks.length > 1 && `#${index + 1}`}</Label>
                  <Input
                    value={book.title}
                    onChange={(e) => handleEditBook(index, "title", e.target.value)}
                    placeholder="책 제목을 입력하세요"
                  />
                </div>

                <div className="space-y-2">
                  <Label>저자</Label>
                  <Input
                    value={book.author}
                    onChange={(e) => handleEditBook(index, "author", e.target.value)}
                    placeholder="저자를 입력하세요"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>ISBN</Label>
                    <Input
                      value={book.isbn || ""}
                      onChange={(e) => handleEditBook(index, "isbn", e.target.value)}
                      placeholder="ISBN (선택)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>출판사</Label>
                    <Input
                      value={book.publisher || ""}
                      onChange={(e) => handleEditBook(index, "publisher", e.target.value)}
                      placeholder="출판사 (선택)"
                    />
                  </div>
                </div>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleAddBook}
            >
              <Plus className="h-4 w-4" />
              책 추가하기
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              취소
            </Button>
            <Button onClick={handleConfirmBooks}>
              네, 맞습니다
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={navigateToMarketplace}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold flex-1">책 등록하기</h2>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">책 등록하기</h2>
            <p className="text-muted-foreground">
              책 표지를 촬영하면 AI가 자동으로 정보를 인식합니다
            </p>
          </div>

          {!scannedData && (
            <Card className="p-6 border-border bg-gradient-to-br from-card to-background">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center space-y-4 transition-all ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                {isScanning ? (
                  <>
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">AI가 책 표지를 인식하는 중...</p>
                      <p className="text-sm text-muted-foreground">잠시만 기다려주세요</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">책 표지 사진 업로드</p>
                      <p className="text-sm text-muted-foreground">
                        {isDragging ? "여기에 놓으세요" : "클릭하거나 파일을 드래그하세요"}
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      {isMobile ? (
                        <>
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="gap-2 cursor-pointer"
                            onClick={handleCameraClick}
                            disabled={isScanning}
                          >
                            <Camera className="h-4 w-4" />
                            사진 찍기
                          </Button>
                          <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handleCameraCapture}
                            disabled={isScanning}
                          />
                        </>
                      ) : (
                        <Button type="button" variant="outline" className="gap-2" disabled title="모바일에서만 지원됩니다">
                          <Camera className="h-4 w-4" />
                          사진 찍기
                        </Button>
                      )}
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="gap-2 cursor-pointer"
                        onClick={handleFileSelectClick}
                        disabled={isScanning}
                      >
                        <Upload className="h-4 w-4" />
                        파일 선택
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInput}
                        disabled={isScanning}
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}

          {scannedData && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="p-6 space-y-4 border-border bg-gradient-to-br from-card to-background">
                <div className="flex items-center gap-2 text-accent">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-medium">AI가 인식한 정보</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">책 제목</Label>
                    <Input
                      id="title"
                      defaultValue={scannedData.title}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">저자</Label>
                    <Input
                      id="author"
                      defaultValue={scannedData.author}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      defaultValue={scannedData.isbn}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">출판사</Label>
                    <Input
                      id="publisher"
                      defaultValue={scannedData.publisher}
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4 border-border bg-gradient-to-br from-card to-background">
                <h3 className="font-semibold text-lg">판매 정보</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">판매 가격 (원)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="12000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">상태</Label>
                    <select
                      id="condition"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="최상">최상 - 새 책 수준</option>
                      <option value="상">상 - 사용감 거의 없음</option>
                      <option value="중">중 - 약간의 사용감</option>
                      <option value="하">하 - 사용감 많음</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">거래 지역</Label>
                    <Input
                      id="location"
                      placeholder="서울 강남구"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">상세 설명</Label>
                    <Textarea
                      id="description"
                      placeholder="책의 상태나 특이사항을 자세히 적어주세요"
                      rows={4}
                    />
                  </div>
                </div>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                등록하기
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
