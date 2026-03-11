---
name: generate_spring_api_scaffold
description: DDD 계층 규칙과 TDD 원칙을 바탕으로 새로운 도메인 기능의 테스트 틀, Controller, Application Service, Repository, DTO, Entity 기본 코드를 자동 생성합니다.
---

# Spring API Scaffold Generator (DDD & TDD)

사용자가 새로운 기능 확장을 요청할 때, TDD 원칙에 따라 "실패하는 테스트 코드" 뼈대를 먼저 생성하고, DDD 기반의 클린 아키텍처 스캐폴딩 코드를 일괄로 작성하는 스킬입니다.

## 자동화 생성 절차

1. **명세 분석 및 테스트 코드 선행 작성 (TDD)**:
   - 사용자의 요구사항을 파악하여 단위/통합 테스트 코드(`src/test/java/...`) 뼈대를 먼저 작성합니다.
   - 예: `UserUseCaseTest.java`, `UserControllerTest.java`
2. **DDD 기반 파일 생성**: 주어진 도메인 명(예: `User` Bounded Context)을 기반으로 파일들을 작성합니다.
   - `domain`: `User` (Aggregate Root Entity), `UserRepository` (인터페이스)
   - `application`: `UserUseCase` (비즈니스 흐름 제어 Service)
   - `infrastructure`: `UserJpaRepository` (Spring Data JPA), `UserRepositoryImpl` (인터페이스 구현체)
   - `presentation`: `UserController`, `UserRequest`, `UserResponse`
3. 생성 시 패키지 배치는 특정 도메인 단위로 묶는 것을 기본으로 합니다. (예: `backend/src/main/java/com/example/booklink/user/...`)
4. 초기 코드 생성 후 "이제 테스트 코드를 구체화하고 Green 사이클을 만들어 갈 차례입니다."와 같이 TDD 사이클 시작을 유도합니다.
