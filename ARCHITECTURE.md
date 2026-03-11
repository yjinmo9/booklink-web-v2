# 🏗 Architecture Overview

이 문서는 `booklink-web-v2` 애플리케이션의 전체 아키텍처 구조를 정의합니다. 본 프로젝트는
프론트엔드와 백엔드를 물리적/논리적으로 분리하고, 백엔드는 **DDD(Domain-Driven Design)**와 클린 아키텍처를 기반으로 설계됩니다.

## 시스템 구성

- **프론트엔드**: Next.js (React)
- **백엔드**: Spring Boot (Java/Kotlin)

## 폴더 구조 (DDD 기반)

```text
booklink-web-v2/
├── frontend/             # Next.js 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── app/          # App Router
│   │   ├── components/
│   │   ├── lib/          # API 클라이언트 및 유틸리티
│   │   └── types/        # 공통 타입 정의
│   └── package.json
├── backend/              # Spring Boot 백엔드 애플리케이션
│   ├── src/main/java/.../
│   │   └── {Bounded Context}/ # 예: user, book, order 등 도메인별 분리
│   │       ├── presentation/ # Controllers (REST API)
│   │       ├── application/  # Application Services, UseCases
│   │       ├── domain/       # Aggregate Roots, Entities, Value Objects, Domain Services
│   │       └── infrastructure/ # Repositories 구현체, 외부 API 클라이언트
│   └── build.gradle
├── docs/                 # 프로젝트 관련 문서
└── .agent/               # AntiGravity 에이전트 스킬 설정
```

## 백엔드: 전술적 DDD 및 클린 아키텍처

기존 4계층 구조를 도메인 주도로 강화하여 Bounded Context 단위로 모듈을 분리합니다.

1. **Presentation Layer**:
   - HTTP 요청을 처리하고, Application Service에 처리를 위임합니다. DTO 변환을 전담합니다.
2. **Application Layer**:
   - 도메인 객체들을 조합하여 비즈니스 유스케이스 단위의 흐름을 제어합니다. (Transaction Scope)
   - 비즈니스 로직을 직접 구현하지 않으며 Domain Layer에 위임합니다.
3. **Domain Layer (Core)**:
   - 애플리케이션의 핵심 비즈니스 로직을 담습니다.
   - **Aggregate**: 연관된 엔티티와 값 객체(Value Object)의 묶음입니다.
   - Repository 인터페이스를 선언하여 인프라스트럭처에 대한 의존성을 역전시킵니다. (DIP)
4. **Infrastructure Layer**:
   - DB 통신(Spring Data JPA), 메세지 큐, 외부 API 호출 등 기술적인 세부 사항을 구현합니다.
   - Domain Layer의 Repository 인터페이스를 구현합니다.
