# Hulter V0.0 (2023.11 출시 예정)

![image](https://github.com/yjglab/Hulter/assets/70316567/07ad7756-d0c1-476f-8d4a-18cfee274e75)

Author: Jaekyeong Yuk

#### 기술 태그

<div> 
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=Tailwindcss&logoColor=black">
<img src="https://img.shields.io/badge/Emotion-569A31?style=for-the-badge&logo=Emotion&logoColor=black">
<img src="https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=Framer&logoColor=black">
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=black">
</div>

<div > 
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">
</div>

## 기획 문서

#### 구현할 기능 리스트 (추가 중)

> 프로젝트 업로드 과정

1. 업로드 폼에 정보(github 또는 behance link, 섹션별 헤더, 섹션별 설명, 사진 10p이내(이미지 링크 또는 업로드, 업로드 시 최대 2MB로 자동 압축)), 기술 스택 정보(검색 기능 algolia 도입) 제출
2. 어드민 이메일로 제출 정보 발송
3. 어드민 페이지 확인
4. 업로드 승인 후 페이지에 기재

> 프로젝트 포스트 기능

- 찜 기능
- 추천 기능
- 평점 입력 기능 (1-5)

> 프로젝트 삭제 기능

1. 삭제 사유 입력(선택 5, 직접입력 1) 제출(어드민 이메일로 전송) 및 삭제 대기 상태로 변경
2. 어드민 페이지 확인
3. 삭제 승인 후 완전 삭제

> 프로젝트 필터

- 기본 랜덤
- 기술 스택
- 가장 많이 찜 한 프로젝트
- 가장 많은 추천을 받은 프로젝트
- 가장 높은 평점 순

> 사용자 프로필

- Avvvatar 아바타 사용
- 닉네임
- 비밀번호 (bcrypt, 단방향 암호화-DB)
- 이메일 (cryptoJS, 양방향 암호화-DB, 복호화-클라이언트)

![image](https://github.com/yjglab/nebaram/assets/70316567/5bc77120-ce07-4052-9db3-460c082852b1)
