---
name: external_integration_rules
description: 알라딘, 카카오 등 외부 API 연동 시 지켜야 할 안정성 및 데이터 정규화 규칙
---

# External Integration Rules (Anti-Corruption Layer)

BookLink 서비스는 다수의 외부 API에 의존하므로, 외부 시스템의 변경이 내부 도메인 로직을 오염시키지 않도록 아래 규칙을 엄격히 준수합니다.

## 1. 부패 방지 계층 (Anti-Corruption Layer, ACL)

- **외부 DTO 격리**: 외부 API의 응답 스펙(예: 알라딘 JSON 구조)을 그대로 Service 레이어까지 끌고 들어오지 않습니다.
- **Translation**: `infrastructure/client` 영역에서 외부 응답을 수신한 즉시, 우리 도메인에 최적화된 내부 DTO 또는 Domain 객체로 변환합니다.

## 2. 장애 전파 방지 (Resilience)

- **타임아웃 설정**: 모든 외부 요청에는 명시적인 Read/Connect Timeout을 설정합니다.
- **예외 처리**: 외부 API 서버 장애(5xx)나 응답 지연 시, 우리 서비스 전체가 멈추지 않도록 예외를 캐치하고 적절한 폴백(Fallback)이나 비어있는 결과를 반환하도록 설계합니다. (Circuit Breaker 권장)

## 3. 데이터 정규화

- 여러 출처(알라딘, 카카오, 공공데이터)에서 오는 도서 정보를 `BookInfo`와 같은 통합된 규격으로 맞추어 제공합니다.
