---
name: verify_spring_tests
description: JUnit5와 Mockito를 활용한 스프링 테스트 코드가 TDD 및 계층 별(DDD) 역할에 맞게 작성되었는지 확인하고 테스트 실행 결과를 분석합니다.
---

# Spring Test Verifier (TDD Focused)

이 스킬은 프로젝트의 테스트 코드를 점검하고 실행 피드백을 지원합니다. TDD의 Red-Green-Refactor 사이클이 원활하게 돌아가고 있는지, 도메인 로직이 잘 검증되고 있는지를 분석합니다.

## 점검 포인트

1. **테스트 커버리지 및 도메인 단위 유효성 검증**:
   - `Domain` 클래스(Entities/Value Objects) 내부에 선언된 핵심 비즈니스 로직(상태 변경 등)이 순수 자바 단위 테스트로 검증되고 있는지 확인합니다.
   - `Application Service`(UseCase) 테스트 시, Repository 등 인프라스트럭처가 `Mockito` 등을 통해 올바르게 Mocking 되었는지 검증합니다.
2. **테스트 수행 (Red/Green 체크)**:
   - 필요 시 사용자의 동의 하에 `backend/` 폴더 내에서 `./gradlew test` (혹은 `./mvnw test`) 명령어를 `run_command`로 수행하여 성공 여부를 분석해줍니다.
3. **TDD 리팩토링 제안**:
   - 테스트를 통과한(Green) 코드 중, 더 도메인 주도적으로 개선하거나 중복을 제거할 수 있는 지점(Refactor)이 있다면 제안합니다.
