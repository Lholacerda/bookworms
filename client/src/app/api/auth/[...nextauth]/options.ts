import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import api from 'services/api';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      score: number;
      bio: string;
      image: string;
      groupId: string;
      currentBookTitle: string;
      currentBookAuthor: string;
      currentBookCover: string;
      topBook1Title: string;
      topBook1Author: string;
      topBook1Cover: string;
      topBook2Title: string;
      topBook2Author: string;
      topBook2Cover: string;
      topBook3Title: string;
      topBook3Author: string;
      topBook3Cover: string;
    };
  }

  interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    score: number;
    bio: string;
    image: string;
    groupId: string;
    currentBookTitle: string;
    currentBookAuthor: string;
    currentBookCover: string;
    topBook1Title: string;
    topBook1Author: string;
    topBook1Cover: string;
    topBook2Title: string;
    topBook2Author: string;
    topBook2Cover: string;
    topBook3Title: string;
    topBook3Author: string;
    topBook3Cover: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      score: number;
      bio: string;
      image: string;
      groupId: string;
      currentBookTitle: string;
      currentBookAuthor: string;
      currentBookCover: string;
      topBook1Title: string;
      topBook1Author: string;
      topBook1Cover: string;
      topBook2Title: string;
      topBook2Author: string;
      topBook2Cover: string;
      topBook3Title: string;
      topBook3Author: string;
      topBook3Cover: string;
    };
  }
}

interface UserRes {
  id: string;
  name: string;
  username: string;
  email: string;
  score: number;
  bio: string;
  image: string;
  groupId: string;
  currentBookTitle: string;
  currentBookAuthor: string;
  currentBookCover: string;
  topBook1Title: string;
  topBook1Author: string;
  topBook1Cover: string;
  topBook2Title: string;
  topBook2Author: string;
  topBook2Cover: string;
  topBook3Title: string;
  topBook3Author: string;
  topBook3Cover: string;
}

interface ApiResponse {
  data: {
    loggedUser: UserRes;
    message: string;
  };
  status: number;
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailORusername: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await api.post<ApiResponse>('/sessions', {
            emailORusername: credentials?.emailORusername,
            password: credentials?.password
          });

          const user = response.data.data.loggedUser;
          console.log(user);
          if (user) {
            return user;
          }
        } catch (error) {
          throw new Error('Credenciais inválidas');
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          score: user.score,
          bio: user.bio,
          image: user.image,
          groupId: user.groupId,
          currentBookTitle: user.currentBookTitle,
          currentBookAuthor: user.currentBookAuthor,
          currentBookCover: user.currentBookCover,
          topBook1Title: user.topBook1Title,
          topBook1Author: user.topBook1Author,
          topBook1Cover: user.topBook1Cover,
          topBook2Title: user.topBook2Title,
          topBook2Author: user.topBook2Author,
          topBook2Cover: user.topBook2Cover,
          topBook3Title: user.topBook3Title,
          topBook3Author: user.topBook3Author,
          topBook3Cover: user.topBook3Cover
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.user.id,
        name: token.user.name,
        username: token.user.username,
        email: token.user.email,
        score: token.user.score,
        bio: token.user.bio,
        image: token.user.image,
        groupId: token.user.groupId,
        currentBookTitle: token.user.currentBookTitle,
        currentBookAuthor: token.user.currentBookAuthor,
        currentBookCover: token.user.currentBookCover,
        topBook1Title: token.user.topBook1Title,
        topBook1Author: token.user.topBook1Author,
        topBook1Cover: token.user.topBook1Cover,
        topBook2Title: token.user.topBook2Title,
        topBook2Author: token.user.topBook2Author,
        topBook2Cover: token.user.topBook2Cover,
        topBook3Title: token.user.topBook3Title,
        topBook3Author: token.user.topBook3Author,
        topBook3Cover: token.user.topBook3Cover
      };
      return session;
    }
  }
};
