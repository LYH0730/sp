import { http, HttpResponse } from 'msw';
import parkingData from '../data/parkingData.json';

const users = [
    {
      id: 1,
      email: "asd@asd.com",
      password: "5678",
      nickname: "테스트",
      preferred_factor: "DISTANCE"
    }
  ];

export const handlers = [
  // ✅ 회원가입
  http.post('/api/users/register', async ({ request }) => {
    const body = await request.json();
    const { email, password, nickname, preferred_factor } = body;
    const exists = users.some((user) => user.email === email);
    if (exists) {
      return HttpResponse.json({ message: '이미 존재하는 이메일입니다.' }, { status: 409 });
    }
    const newUser = {
      id: users.length + 1,
      email,
      password,
      nickname,
      preferred_factor
    };
    users.push(newUser);
    return HttpResponse.json({ message: '회원가입 성공', user: newUser }, { status: 200 });
  }),

  // ✅ 로그인
  http.post('/api/users/login', async ({ request }) => {
    const body = await request.json();
    const { email, password } = body;
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!matchedUser) {
      return HttpResponse.json({ message: '이메일 또는 비밀번호가 틀렸습니다.' }, { status: 401 });
    }
    return HttpResponse.json({ message: '로그인 성공', email: matchedUser.email }, { status: 200 });
  }),

  // ✅ 사용자 정보 조회
  http.get('/api/users/:email', ({ params }) => {
    const user = users.find((u) => u.email === params.email);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }
    const { password, ...userData } = user; // 비밀번호 제외
    return HttpResponse.json(userData, { status: 200 });
  }),

  // ✅ 사용자 정보 수정 (닉네임, 선호 요소)
  http.patch('/api/users/:email', async ({ request, params }) => {
    const body = await request.json();
    const user = users.find((u) => u.email === params.email);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    if (body.nickname) user.nickname = body.nickname;
    if (body.preferred_factor) user.preferred_factor = body.preferred_factor;

    return HttpResponse.json({ message: '수정 완료', user }, { status: 200 });
  }),

  // ✅ 비밀번호 변경
  http.patch('/api/users/:email/password', async ({ request, params }) => {
    const body = await request.json();
    const user = users.find((u) => u.email === params.email);
    if (!user) {
      return HttpResponse.json({ message: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    if (user.password !== body.currentPassword) {
      return HttpResponse.json({ message: '현재 비밀번호가 일치하지 않습니다.' }, { status: 400 });
    }

    user.password = body.newPassword;
    return HttpResponse.json({ message: '비밀번호 변경 완료' }, { status: 200 });
  }),

  // ✅ 임시 데이터 API화
  http.get('/api/parkings', () => {
    return HttpResponse.json(parkingData, { status: 200 });
  })
];
