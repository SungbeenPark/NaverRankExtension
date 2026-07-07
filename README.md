# Naver Rank Extension

네이버 검색 결과에 순위 번호를 표시하는 크롬 익스텐션

## 미리보기

| 순위 | 색상 | 설명 |
|------|------|------|
| 1위 | 🟢 찐초록 | |
| 2위 | 🟢 연한초록 | |
| 3위 | 🟢 희미초록 | |
| 4위~ | ⚫ 회색 | |

## 설치 방법

1. 이 저장소를 클론 또는 ZIP으로 다운로드
   ```bash
   git clone https://github.com/SungbeenPark/NaverRankExtension.git
   ```

2. 크롬 주소창에 `chrome://extensions` 입력

3. 우측 상단 **개발자 모드** 토글 ON

4. **압축 해제된 확장 프로그램을 로드합니다** 클릭

5. 다운로드한 폴더 선택

## 사용 방법

설치 후 [네이버 검색](https://search.naver.com)에서 아무 키워드나 검색하면 자동으로 순위 배지가 표시됩니다.

- 배지는 각 검색 결과 카드 **왼쪽 바깥**에 표시됩니다
- 파워링크(광고) 영역은 자동으로 제외됩니다
- 블로그, 웹사이트, 지식iN 등 통합검색 결과를 하나의 순위로 표시합니다

## 지원 영역

- 웹문서 (`fds-web-doc-root`)
- 블로그 / 카페 (`ugcItem`)
- 지식iN (`data-meta-ssuid="kin"`)
- 리뷰 (`data-meta-ssuid="review"`)

## 업데이트 방법

코드 수정 후 `chrome://extensions`에서 익스텐션 **새로고침(↺)** 버튼을 누르면 적용됩니다.
