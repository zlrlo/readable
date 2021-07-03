import React from 'react';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';
import { links } from '@readable/link';

interface Props {
  provider: string;
}

export function SocialLoginButton({ provider }: Props) {
  if (provider === 'google') {
    return (
      <a href={`${links.restUrl}/auth/google`}>
        <GoogleLoginButton />
      </a>
    );
  }

  if (provider === 'facebook') {
    return (
      <a href={`${links.restUrl}/auth/facebook`}>
        <FacebookLoginButton />
      </a>
    );
  }

  if (provider === 'github') {
    return (
      <a href={`${links.restUrl}/auth/github`}>
        <GithubLoginButton />
      </a>
    );
  }

  if (provider === 'twitter') {
    return (
      <a href={`${links.restUrl}/auth/twitter`}>
        <TwitterLoginButton />
      </a>
    );
  }

  return null;
}
