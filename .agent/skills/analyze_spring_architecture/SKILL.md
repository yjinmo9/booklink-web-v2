---
name: analyze_spring_architecture
description: Spring Boot 기반 백엔드 프로젝트의 아키텍처 규칙과 계층 간 의존성 문제(Controller, Service, Repository)를 검증합니다.
---

# Spring Architecture Analyzer

이 스킬은 사용자의 Spring Boot 프로젝트 코드가 [ARCHITECTURE.md](../../../ARCHITECTURE.md) 및 [DEVELOPMENT_RULES.md](../../../DEVELOPMENT_RULES.md)에 정의된 클린 아키텍처 및 계층 규칙을 준수하는지 점검합니다.

## 검증 포인트 (Verification Points)

1. **Controller 의존성 검사 (`@RestController`)**:
   - Controller 내부에 `Repository`나 `EntityManager`가 직접 주입되어 있는지 확인합니다. (반드시 `Service`를 통해서만 접근해야 함)
   - 응답 객체(Return Type)로 JPA `Entity`(`@Entity`)가 직접 반환되지 않고 `DTO`(`XxxResponse`)로 변환되는지 확인합니다.
2. **코드 냄새 분석**: `grep_search`나 코드 조회 툴을 사용해 `@RestController`, `@Service`, `@Repository` 어노테이션이 붙은 파일들의 위치(패키지) 및 `import` 구문을 검증합니다.

## 리포트 (Report)

- 규칙 위반 사항이 발견되면 문제의 원인(파일명, 위반된 패턴)과 해결 방법(비즈니스 로직을 Service로 분리 또는 DTO 매퍼 구현)을 제안하는 마크다운 리포트를 작성하여 제공합니다.
