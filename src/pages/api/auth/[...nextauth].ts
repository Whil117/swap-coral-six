/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import refeshToken from '@Utils/refeshToken';
import { CONFIG_SPOTIFY } from 'config/spotify';
import Cookies from 'js-cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      SpotifyProvider({
        clientId: req.cookies?.CLIENT_ID ?? CONFIG_SPOTIFY.CLIENT_ID,
        clientSecret:
          req.cookies?.CLIENT_SECRET ?? CONFIG_SPOTIFY.CLIENT_SECRET,
        authorization: CONFIG_SPOTIFY.AUTHORIZATION_URL
      })
    ],
    secret: CONFIG_SPOTIFY.AUTH_SECRET,
    pages: {
      signIn: '/'
    },
    callbacks: {
      async jwt({ token, account, user }: any) {
        if (account && user) {
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            username: account.providerAccountId,
            accessTokenExpires: (account?.expires_at as number) * 1000
          };
        }

        if (Date.now() < token.accessTokenExpires) {
          console.log('[NextAuth]: Token is valid; no need to refresh');
          return token;
        } else {
          return await refeshToken(token, req);
        }
      },
      async session({ session, token }: any) {
        Cookies.set('accessToken', token.accessToken);
        if (session) {
          return {
            ...session,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            accessTokenExpires: token.accessTokenExpires
          };
        }
      }
    }
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, nextAuthOptions(req, res));
}
