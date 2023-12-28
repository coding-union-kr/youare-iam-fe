import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cookies from 'js-cookie';

const isProduction = process.env.NODE_ENV === 'production';
const MAX_AGE = 60 * 30; // 액세스 토큰 만료 시간 30분
export const ACCESS_TOKEN = 'accessToken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/members/kakao/callback?code=${code}`
    );

    const token = response.headers['authorization'];

    res.setHeader(
      'Set-Cookie',
      `${ACCESS_TOKEN}=${token}; Path=/; HttpOnly; ${
        isProduction ? 'Secure;' : ''
      } Max-Age=${MAX_AGE}`
    );

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
}
