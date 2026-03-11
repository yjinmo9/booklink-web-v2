---
name: generate_external_api_client
description: 외부 API 연동을 위한 DTO, 인터페이스, 변환 로직 및 예외 처리 클래스들을 자동 생성합니다.
---

# External API Client Generator

BookLink에 필요한 새로운 외부 리소스(도서관 API, 크롤러, 결제 모듈 등)가 추가될 때 초기 보일러플레이트를 생성합니다.

## 실행 절차

1. **외부 명세 기반 DTO 생성**: 외부에서 내려주는 JSON 구조를 담을 `XxxExternalResponse` 클래스를 생성합니다.
2. **내부 변환기(Mapper) 생성**: 외부 DTO를 우리 프로젝트의 `domain` 영역 객체로 바꾸는 `toDomain()` 등의 메서드를 포함합니다.
3. **클라이언트 인터페이스 구현**: `RestTemplate`, `WebClient` 또는 `FeignClient`를 사용한 통신 코드를 생성합니다.
4. **Resilience 설정**: 재시도(Retry)나 타임아웃 예외 처리 로직을 기본 포함합니다.
