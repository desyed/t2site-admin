import { Icon } from '@iconify/react';
import { useMemo } from 'react';

import { Button } from '@/components/site-button';

export type T2OAuthType = 'google' | 'github' | 'microsoft';

export type OAuthButtonProps = {
  type: T2OAuthType;
  label?: boolean;
};

export default function OAuthButton(props: OAuthButtonProps) {
  const { type, label = true } = props;

  const from = window.localStorage.getItem('redirect_to') || '/';

  const OAuthIcon = useMemo(() => {
    switch (type) {
      case 'google':
        return <Icon icon="logos:google-icon" />;
      case 'github':
        return <Icon icon="fa6-brands:github" />;
      case 'microsoft':
        return <Icon icon="logos:microsoft-icon" />;
    }
  }, [type]);

  const redirect_url = `${window.location.origin}/auth/?rp=${from}&auth_login=success`;

  const redirect_error = `${window.location.origin}/login`;

  return (
    <form
      action={`${import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '/server'}/auth/${type}`}
      method="post"
    >
      <input type="hidden" name="redirect_url" value={redirect_url} />
      <input type="hidden" name="redirect_error" value={redirect_error} />
      <input type="hidden" name="csrf_token" value="" />
      <div className="grid flex-1">
        <Button
          variant="outline"
          size="sm"
          className="capitalize"
          type="submit"
          data-oauth-type={type}
          onClick={() => {
            window.localStorage.removeItem('redirect_to');
          }}
        >
          {OAuthIcon}
          {label && `Continue With ${type}`}
        </Button>
      </div>
    </form>
  );
}
