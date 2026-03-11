---
description: DDD 및 TDD 원칙을 준수하며 새로운 도메인 기능을 추가
---

# Feature Development Workflow (DDD & TDD)

새로운 도메인 요구사항(예: 로그인, 도메인 생성 등)을 프로젝트에 반영하는 표준 절차입니다.

## 1. 요구사항 설계 및 분석

1. 추가할 기능의 Bounded Context를 정의하고 핵심 Aggregate Root를 식별합니다.
2. `DEVELOPMENT_RULES.md`를 참고하여 API 스펙(Request/Response)을 사전에 정의합니다.

## 2. 코드 스캐폴딩 (TDD 시작)

1. `.agent/skills/generate_spring_api_scaffold` 스킬을 사용하여 테스트 코드와 기본 계층 파일들을 생성합니다.
2. 생성된 `Test` 클래스에서 실패하는 테스트 케이스(Red)를 먼저 구체화합니다.

## 3. 비즈니스 로직 구현 및 리팩토링

1. 테스트를 통과하기 위한 최소한의 도메인 로직을 `domain/` 계층에 구현합니다.
2. `application/` 계층에서 UseCase를 완성하고 트랜잭션을 설정합니다.
3. 로직이 완성되면 `Refactor` 단계에 따라 클린 코드로 다듬습니다.

## 4. 검증 및 완료

1. `.agent/skills/verify_spring_tests` 스킬을 실행하여 모든 테스트 통과 여부를 최종 확인합니다.
2. `.agent/skills/analyze_spring_architecture` 스킬로 아키텍처 규칙 위반 사항이 없는지 검사합니다.
3. 작업 내용을 커밋합니다.
