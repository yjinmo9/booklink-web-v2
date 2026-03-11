# 🛠 Development Rules

## 1. 프로젝트 접근 방식: TDD (Test-Driven Development)

본 프로젝트의 모든 백엔드 및 핵심 비즈니스 로직 작성은 **TDD(테스트 주도 개발)**를 원칙으로 합니다.

1. **Red**: 실패하는 테스트 코드를 먼저 작성합니다.
   - 명세(요구사항)를 바탕으로 단위 테스트를 작성해 의도된 동작과 API 스펙, 도메인 규칙을 먼저 정의합니다.
2. **Green**: 테스트를 통과할 수 있는 최소한의 코드를 작성합니다.
3. **Refactor**: 중복을 제거하고 클린 아키텍처 및 DDD 원칙에 맞게 리팩토링합니다.

## 2. 백엔드 (Spring Boot) - DDD & Architecture 규칙

1. **도메인 캡슐화와 Aggregate Root**
   - 데이터 변경은 반드시 Aggregate Root(최상위 엔티티)를 통해서만 수행되어야 합니다.
   - Entity에는 무분별한 `@Setter` 사용을 금지하며, 비즈니스 의미가 담긴 메서드(예: `changePassword`, `publishPost`)를 통해 상태를 변경합니다.
2. **의존성 역전 원칙 (DIP)**
   - 도메인 계층은 타 계층이나 인프라(DB, 외부 서비스)의 기술적 구현에 의존하지 않아야 합니다.
   - 필요한 경우 도메인 계층에 인터페이스를 두고, 인프라 계층에서 이를 구현합니다.
3. **DTO 계층 분리**
   - 클라이언트 데이터(Controller Request/Response) ↔ DTO ↔ Domain 객체 간 매핑을 철저히 진행합니다. Entity가 프레젠테이션 계층에 노출되어서는 안 됩니다.

## 3. 프론트엔드 (Next.js) 규칙

1. **API 통신 캡슐화**
   - 백엔드로 보내는 API 호출은 `src/lib/api/` 경로에 도메인별 함수 혹은 클래스로 분리하여 관리합니다.
2. **컴포넌트 계층화 & 상태 관리**
   - `components/ui/`: 프로젝트 전역 사용 가능한 공통 컴포넌트
   - `components/features/`: 특정 도메인 로직이 결합된 비즈니스 컴포넌트
   - 서버 상태(데이터 패칭): `React Query` 사용 방침
3. **프론트엔드 테스트**
   - 핵심 비즈니스 유틸리티 함수나 복잡한 UI 상태 변화에 대해서는 Jest + React Testing Library를 통한 단위 테스트를 권장합니다.
