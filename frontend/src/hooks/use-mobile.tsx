// 뷰포트 너비 기반으로 모바일 여부를 판단하는 간단한 훅
// - 컴포넌트에서 isMobile 값을 이용해 모바일 전용 UI를 분기 처리할 수 있다
import * as React from "react";

// 모바일 임계값(px). 이 값 미만이면 모바일로 간주한다
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // undefined → 초기 렌더(서버/클라이언트 차이) 고려, 이후 boolean으로 확정
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // matchMedia로 뷰포트 변화 감지
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    // 최초 값 동기화
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // boolean 보장 반환(초기 undefined → false 취급)
  return !!isMobile;
}
