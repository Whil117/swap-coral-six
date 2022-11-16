import Cookies from 'js-cookie';
import SpotifyWebApi from 'spotify-web-api-node';

export const CLIENT_ID =
  Cookies.get('CLIENT_ID') ??
  (process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string);
export const CLIENT_SECRET =
  Cookies.get('CLIENT_SECRET') ??
  (process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string);
export const AUTH_SECRET = process.env.NEXTAUTH_SECRET as string;

const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-follow-read',
  'user-read-recently-played',
  'user-library-read',
  'user-read-private'
];
const params = {
  scope: scopes
};

const queryParam = new URLSearchParams(params as any);
const AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?${queryParam.toString()}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
});
export const CONFIG_SPOTIFY = {
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  AUTH_SECRET: AUTH_SECRET,
  AUTHORIZATION_URL: AUTHORIZATION_URL,
  SPOTIFY_API: spotifyAPI
};
