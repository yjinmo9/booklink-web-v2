---
name: frontend_architecture
description: 프론트엔드 코드 역할별 분리 및 구조화 가이드 (View, UI State, Business Logic, Schema, Action)
---

# 프론트엔드 아키텍처 가이드 (Frontend Architecture Guide)

본 가이드는 프론트엔드 코드의 유지보수성과 가독성을 높이기 위해 “한 파일이 한 가지 역할에 최대한 집중하게 만든다”는 원칙을 기반으로 작성되었습니다.

## 1. 핵심 원칙: 역할별 코드 분리

화면(View), 화면 상태(UI State), 서버 요청 및 비즈니스 로직(Business), 검증(Schema), 실제 연동(Action)을 명확히 분리합니다.

- **View (`index.tsx` 또는 `page.tsx`)**: 화면 구성(JSX) 및 UI 렌더링에만 집중합니다. 값 표시, 이벤트 연결, 상태에 따른 UI 분기 처리만 담당합니다.
- **Controller (`use-[component].ts`)**: 화면 상태(UI)와 비즈니스 로직(Business)을 가져와 View가 쓰기 편하게 묶어주는 중간 지휘자 역할을 합니다.
- **UI State (`use-[component].ui.ts`)**: 입력창, 체크박스 등 순수한 화면의 상태(useState)만을 관리합니다. (저장 로직, 검증 로직 제외)
- **Business Logic (`use-[component].business.ts`)**: 서버 저장, 조회, 성공 및 실패 처리(react-query 등) 등 실제 비즈니스 로직만을 담당합니다. 이 훅은 화면(UI)의 형태를 몰라야 합니다.
- **Schema (`schema.ts` 또는 폼 검증 데이터)**: Zod, Yup 등을 사용하여 데이터의 모양과 검증(Validation) 규칙을 명확히 정의합니다.
- **Action (`[action-name].ts`)**: 실제 서버와의 통신(Server Action, Fetch API 호출 등)을 수행합니다. 화면은 이 Action의 내부 동작을 알 필요가 없고, 저장할 때 호출만 하면 됩니다.

## 2. 파일 구조 예시

게시글 작성(PostEditor) 기능을 예시로 한 분리 구조입니다.

```text
post-editor/
 ┣ index.tsx                   # 화면 (View)
 ┣ use-post-editor.ts          # 화면과 로직을 연결 (Controller)
 ┣ use-post-editor.ui.ts       # 입력값 같은 UI 상태
 ┣ use-post-editor.business.ts # 저장 및 비즈니스 로직
shared/
 ┗ schema.ts                   # 검증 (Zod 등)
actions/
 ┗ create-post-action.ts       # 서버 액션 (API 호출)
```

## 3. 코드 분기 적용 기준

처음부터 모든 컴포넌트를 이 단위로 쪼갤 필요는 없습니다. 단순한 컴포넌트는 단일 파일로 작성하되, 아래의 기준에 부합하여 복잡도가 높아지면 구조를 분리합니다.

- 입력 상태가 3개 이상 생길 때
- 서버 요청 로직이 포함될 때
- 데이터 검증(Validation) 로직이 복잡해질 때
- 성공/실패 처리 분기가 많을 때
- 단일 컴포넌트 파일이 100줄을 넘기기 시작할 때

이러한 점진적 분리를 통해 처음에는 가볍게 시작하고, 복잡해질 때 유지보수 가능한 구조로 진화시킵니다.
