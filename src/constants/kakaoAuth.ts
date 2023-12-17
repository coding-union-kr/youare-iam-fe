const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오 개발자 콘솔에서 발급받은 REST API 키
const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI; // 카카오로부터 인증 응답을 받을 서버의 URI

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
