---
name: coding_standards
description: 프로젝트 코드 품질과 DDD/TDD 구현을 위한 규칙 모음
---

# Project Coding Standards

본 프로젝트는 코드의 지속 가능성과 가독성을 위해 아래의 규칙을 엄격히 준수합니다.

## 1. Java / Spring Boot 규칙

- **Optional 사용**: `null`을 직접 반환하지 않고 `Optional<T>`를 적극 활용하여 NPE를 방지합니다.
- **불변성**: 도메인 엔티티와 DTO는 가능한 한 불변(immutable) 상태를 유지합니다. 엔티티 상태 변경 시 의미 있는 메서드 명을 사용합니다.
- **생성자 주입**: `@Autowired` 필드 주입 대신 생성자 주입(`RequiredArgsConstructor`)을 사용합니다.
- **예외 처리**: 전역 예외 처리기(`@RestControllerAdvice`)를 통해 일관된 에러 응답 포맷을 제공합니다.

## 2. 테스트(Testing) 규칙

- **단위 테스트 집중**: 비즈니스 로직은 스프링 컨텍스트 없이 동작하는 빠른 단위 테스트를 지향합니다.
- **Mocking**: 외부 의존성(DB, API)은 `Mockito`로 격리하여 테스트합니다.
- **Given-When-Then**: 모든 테스트 코드는 해당 구조를 사용하여 가독성을 높입니다.

## 3. 프론트엔드 규칙

- **역할 기반 파일 분할 (Architecture)**: 화면(View), 비즈니스 로직(Business), 화면 상태(UI State), 검증(Schema) 등을 역할별로 명확히 분리합니다. 자세한 구조는 [`frontend-architecture.md`](./frontend-architecture.md) 가이드를 참고합니다.
- **컴포넌트 분리**: 하나의 역할을 하는 파일은 가급적 짧게(예: 100줄 내외) 유지하며, 코드가 방대해지고 복잡해지면(입력 상태 다수, 서버 요청 등 포함 시) 역할별로 훅(Hook)을 분리합니다.
- **Type Safety**: `any` 타입 사용을 금지하고 타입 내지 인터페이스 또는 Zod Schema 등을 명확히 정의하여 재사용합니다.
