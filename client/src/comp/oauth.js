import dotenv from "dotenv";
dotenv.config();

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
