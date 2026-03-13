---
name: refactor_nextjs_frontend
description: 기존 단일 React 컴포넌트(Vite/CRA)를 Next.js App Router 아키텍처 규칙에 맞춰 View, UI State, Business Logic, Action 등으로 분할 리팩토링합니다.
---

# Next.js 프론트엔드 리팩토링 가이드

## 목적
기존의 방대한 단일 React 파일(예: 수백 줄의 View, 상태, 서버 통신 로직이 혼재된 파일)을 `booklink-web-v2`의 `.agent/rules/frontend-architecture.md` 규칙에 따라 관심사별로 분리하고 Next.js App Router 구조로 마이그레이션합니다.

## 디렉토리 구조 및 명명 규칙 지침
단일 기능(Feature)이나 페이지 도메인은 `src/features/{feature-name}` 폴더 하위에 독립적으로 구성합니다.

- `index.tsx` (또는 페이지 내 `page.tsx`): 화면(View) 렌더링에만 집중합니다. JSX 요소만 반환하며 복잡한 로직은 포함하지 않습니다.
- `use-{feature}.ts`: Controller 역할. UI 상태 훅과 Business Logic 훅 데이터를 묶어 View에 제공합니다.
- `use-{feature}.ui.ts`: UI 전용 상태(e.g., 열림/닫힘, 단순 입력값)만 관리합니다.
- `use-{feature}.business.ts`: 데이터 패칭, Mutate 등 비즈니스 로직(react-query 등)을 관리합니다. View의 형태를 몰라야 합니다.
- `actions/`: Next.js Server Actions (서버 통신 및 뮤테이션 로직)를 위치시킵니다.
- `schema.ts`: Zod나 Yup을 사용한 데이터 유효성 검사 스키마를 정의합니다.

## 작업 절차

1. **분석**: 대상 컴포넌트를 분석하여 UI 상태, 비즈니스 로직(API 호출, 데이터 가공), 렌더링 요소를 식별합니다.
2. **Schema 정의**: 데이터 페이로드 및 폼 검증 스키마를 `schema.ts`에 추출합니다.
3. **Action 분리**: API 호출부(또는 기존 fetch 로직)를 서버 액션 또는 독립된 fetch 헬퍼로 분리합니다.
4. **Logic Hook 분리**: API 통신 등 비즈니스 로직을 `use-{feature}.business.ts`로 추출합니다.
5. **UI State Hook 분리**: 단순 화면 상태(모달 여부, 탭 전환 등)를 `use-{feature}.ui.ts`로 추출합니다.
6. **Controller Hook 작성**: `use-{feature}.ts`를 작성하여 위 두 훅을 연결하고 View에서 사용하기 좋은 형태로 데이터를 서빙합니다.
7. **View 정리**: 원래 컴포넌트를 `index.tsx`로 만들고, JSX 렌더링 시 Controller Hook만을 호출하도록 정리합니다. 하위의 복잡한 UI가 있다면 `components/` 폴더로 추가 분할합니다.

## 주의 사항
- `any` 타입을 사용하지 말고, 명시적인 인터페이스와 타입을 지정하세요.
- 비즈니스 로직은 UI 프레임워크나 특정 View 컴포넌트에 결합되지 않도록 작성하세요.
- Next.js 서버 컴포넌트(`Server Component`)와 클라이언트 컴포넌트(`"use client"`)의 경계를 명확히 식별하여, 최상단은 가급적 서버 컴포넌트를 유지하고 필요한 곳에만 클라이언트 컴포넌트를 사용하세요.
