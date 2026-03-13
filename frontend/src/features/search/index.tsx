"use client";

import { useSearch } from "./use-search";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, ShoppingCart, MapPin, ExternalLink, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { formatPrice, formatDistance } from "@/integrations/aladin-used-store";

export function SearchView() {
  const router = useRouter();

  const {
    query,
    mode,
    setMode,
    newLimit,
    setNewLimit,
    aladinLimit,
    setAladinLimit,
    marketLimit,
    setMarketLimit,
    libraryLimit,
    setLibraryLimit,
    loading,
    kakaoResults,
    aladinResults,
    libraryResults,
    libraryInfos,
    usedStoreResults,
    usedStoreLoading,
    userLocation,
    bookInfo,
    marketplaceResults,
  } = useSearch();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold flex-1">검색 결과</h2>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant={mode === "buy" ? "default" : "outline"} size="sm" onClick={() => setMode("buy")}>책 사기</Button>
              <Button variant={mode === "borrow" ? "default" : "outline"} size="sm" onClick={() => setMode("borrow")}>책 빌리기</Button>
            </div>
          </div>

          {mode === "buy" && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                새상품
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">가격 낮은 순으로 최대 6개 표시</p>
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <a href={`https://search.daum.net/search?w=book&q=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer">
                      카카오에서 더 보기
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...kakaoResults]
                  .filter((i) => (i.priceSales ?? i.priceStandard ?? 0) > 0)
                  .sort((a, b) => (a.priceSales ?? a.priceStandard ?? Infinity) - (b.priceSales ?? b.priceStandard ?? Infinity))
                  .slice(0, newLimit)
                  .map((item, index) => (
                    <Card key={`${item.isbn ?? index}`} className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-gradient-to-br from-card to-background">
                      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                        {item.cover ? (
                          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-semibold line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.author ?? ""}</p>
                        <p className="text-2xl font-bold text-primary">
                          {(item.priceSales ?? item.priceStandard ?? 0).toLocaleString()}원
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full gap-2">
                          <a href={item.link ?? "#"} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            구매하기
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                {!loading && kakaoResults.length === 0 && (
                  <div className="col-span-full text-sm text-muted-foreground">새상품(카카오) 결과가 없습니다.</div>
                )}
              </div>
              {[...kakaoResults].filter((i) => (i.priceSales ?? i.priceStandard ?? 0) > 0).length > newLimit && (
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => setNewLimit(kakaoResults.length)}>더 보기</Button>
                </div>
              )}
            </div>
          )}

          <div className="px-1">
            <p className="text-sm text-muted-foreground">
              '{query}' 검색 결과입니다.
            </p>
          </div>

          {mode === "buy" ? (
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                중고책
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">알라딘</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">가격 낮은 순으로 최대 6개 표시</p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=Book&SearchWord=${encodeURIComponent(query)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        알라딘에서 더 보기
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...aladinResults]
                    .filter((i) => (i.priceSales ?? i.priceStandard ?? 0) > 0)
                    .sort((a, b) => (a.priceSales ?? a.priceStandard ?? Infinity) - (b.priceSales ?? b.priceStandard ?? Infinity))
                    .slice(0, aladinLimit)
                    .map((item, index) => (
                    <Card key={`${item.isbn ?? index}`} className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-gradient-to-br from-card to-background">
                      <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                        {item.cover ? (
                          <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="h-16 w-16 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 space-y-2">
                        <h5 className="font-semibold line-clamp-2">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.author ?? ""}</p>
                        <p className="text-2xl font-bold text-primary">
                          {(item.priceSales ?? item.priceStandard ?? 0).toLocaleString()}원
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full gap-2">
                          <a href={item.link ?? "#"} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            바로가기
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {!loading && aladinResults.length === 0 && (
                    <div className="col-span-full text-sm text-muted-foreground">알라딘 결과가 없습니다.</div>
                  )}
                </div>
              </div>

              {usedStoreLoading && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">중고매장 정보를 불러오는 중...</div>
                  <div className="text-xs text-muted-foreground">
                    크롤링 중입니다. 잠시만 기다려주세요 (최대 1분 소요)
                  </div>
                </div>
              )}
              {!usedStoreLoading && usedStoreResults.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    알라딘 중고매장
                  </h4>
                  {usedStoreResults.map((book, index) => (
                    <Card key={index} className="p-4 space-y-3 border-border bg-gradient-to-br from-card to-background">
                      <div className="space-y-2">
                        <h5 className="font-semibold">{book.title}</h5>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">평균 가격: </span>
                            <span className="font-bold text-primary">{formatPrice(book.averagePrice)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">최저가: </span>
                            <span className="font-semibold">{formatPrice(book.minPrice)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">최고가: </span>
                            <span className="font-semibold">{formatPrice(book.maxPrice)}</span>
                          </div>
                        </div>
                      </div>
                      
                      {book.nearbyStores.length > 0 ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-primary">
                            반경 10km 내 지점 ({book.nearbyStores.length}개)
                          </p>
                          <div className="space-y-1">
                            {book.nearbyStores.map((store, storeIndex) => (
                              <div key={storeIndex} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{store.storeName}</span>
                                    {store.distance && (
                                      <span className="text-xs text-muted-foreground">
                                        ({formatDistance(store.distance)})
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {store.priceText} · {store.stock} · {store.location}
                                  </div>
                                </div>
                                <Button asChild variant="ghost" size="sm">
                                  <a href={store.url} target="_blank" rel="noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : userLocation && (
                        <div className="p-3 bg-muted/50 rounded text-sm text-muted-foreground">
                          근처 가게에는 알라딘 중고책이 없습니다
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">당근</h4>
                  <Button asChild variant="ghost" size="sm">
                    <a
                      href={`https://www.daangn.com/search/${encodeURIComponent(query)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      더 보기
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4 border-border bg-gradient-to-br from-card to-background">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        당근마켓 연동 준비 중입니다. 우선 외부 검색으로 이동해 보세요.
                      </p>
                      <Button asChild variant="outline" size="sm" className="w-full gap-2">
                        <a
                          href={`https://www.daangn.com/search/${encodeURIComponent(query)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          당근에서 검색
                        </a>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">BookLink 중고거래</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">가격 낮은 순으로 최대 6개 표시</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/marketplace?q=${encodeURIComponent(query)}`)}
                    >
                      더 보기
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[...marketplaceResults]
                    .filter((r) => typeof r.price === "number" && r.price > 0)
                    .sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
                    .slice(0, marketLimit)
                    .map((result) => (
                    <Card 
                      key={result.id} 
                      className="p-4 hover:shadow-[var(--shadow-hover)] transition-all cursor-pointer border-border bg-gradient-to-br from-card to-background"
                      onClick={() => router.push(`/book/${result.id}`)}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-28 bg-muted rounded flex-shrink-0 overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold">{bookInfo?.title ?? "도서"}</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                                {result.condition}
                              </span>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {result.location}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">판매자: {result.seller ?? "-"}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {result.price.toLocaleString()}원
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {!loading && marketplaceResults.length === 0 && (
                    <div className="text-sm text-muted-foreground">자체 중고 품목이 없습니다.</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  도서관 소장 검색
                </h3>
                {libraryResults.length > 0 && (
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">총 {libraryResults.length}개 도서</p>
                  </div>
                )}
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">도서관 정보나루에서 검색</p>
                    <p className="text-xs text-muted-foreground">
                      위치 정보를 허용하면 근처 도서관을 거리순으로 정렬하여 소장 여부를 확인합니다. 위치 정보가 없으면 일반 검색 결과를 표시합니다.
                    </p>
                  </div>
                </div>
              </div>

              {loading && libraryResults.length === 0 && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                  <p className="text-sm text-muted-foreground">도서관 정보를 검색하는 중...</p>
                </div>
              )}

              {!loading && libraryResults.length === 0 && libraryInfos.length === 0 && (
                <div className="text-center py-12 space-y-3">
                  <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                  <p className="text-sm text-muted-foreground">검색 결과가 없습니다.</p>
                  <p className="text-xs text-muted-foreground">다른 검색어로 시도해보세요.</p>
                </div>
              )}

              {libraryInfos.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">근처 도서관 소장 여부</h4>
                    <p className="text-xs text-muted-foreground">
                      반경 10km 내 {libraryInfos.length}개 도서관
                    </p>
                  </div>
                  <div className="space-y-3">
                    {libraryInfos.map((lib, idx) => (
                      <Card 
                        key={lib.libCode || idx}
                        className="p-4 border-border bg-gradient-to-br from-card to-background"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h5 className="font-semibold">{lib.libName}</h5>
                              {lib.distance && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {formatDistance(lib.distance)}
                                </span>
                              )}
                            </div>
                            {lib.address && (
                              <p className="text-sm text-muted-foreground">{lib.address}</p>
                            )}
                            {lib.tel && (
                              <p className="text-xs text-muted-foreground">전화: {lib.tel}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0">
                            <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                              lib.hasBook 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                              {lib.hasBook ? "있음" : "없음"}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {libraryResults.length > 0 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {libraryResults.slice(0, libraryLimit).map((item, idx) => (
                      <Card 
                        key={`${item.isbn ?? idx}`} 
                        className="overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all border-border bg-gradient-to-br from-card to-background"
                      >
                        <div className="p-4 space-y-3">
                          <div className="space-y-2">
                            <h4 className="font-semibold line-clamp-2 text-base leading-tight">{item.title}</h4>
                            {item.author && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <span className="text-xs">저자:</span>
                                <span>{item.author}</span>
                              </p>
                            )}
                            {(item.publisher || item.publishDate) && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                {item.publisher && <span>{item.publisher}</span>}
                                {item.publishDate && (
                                  <>
                                    {item.publisher && <span>·</span>}
                                    <span>{item.publishDate}</span>
                                  </>
                                )}
                              </p>
                            )}
                            {item.isbn && (
                              <p className="text-xs text-muted-foreground">
                                ISBN: {item.isbn}
                              </p>
                            )}
                          </div>
                          <div className="pt-2 border-t border-border">
                            <Button 
                              asChild 
                              variant="default" 
                              size="sm" 
                              className="w-full gap-2"
                            >
                              <a 
                                href={item.link ?? `https://data4library.kr/openapi/srchBooks?keyword=${encodeURIComponent(item.title)}`} 
                                target="_blank" 
                                rel="noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                                소장 도서관 보기
                              </a>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {libraryResults.length > libraryLimit && (
                    <div className="flex justify-center pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setLibraryLimit(libraryResults.length)}
                      >
                        더 보기 ({libraryResults.length - libraryLimit}개 더)
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
