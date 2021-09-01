const CLIENT_ID = "1e2b4e1cf49e438a572407555898e7b1";
const REDIRECT_URI = "http://localhost:3000/oauth";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
