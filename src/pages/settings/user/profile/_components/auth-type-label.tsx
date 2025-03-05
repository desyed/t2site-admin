import { GithubIcon, Mail, Lock } from 'lucide-react';

type AuthType = 'emailPassword' | 'google' | 'github';

interface AuthTypeLabelProps {
  type: AuthType;
}

export function AuthTypeLabel({ type }: AuthTypeLabelProps) {
  const getAuthTypeConfig = (type: AuthType) => {
    switch (type) {
      case 'github':
        return {
          label: 'GitHub',
          icon: GithubIcon,
          className: 'bg-[#24292e] text-white',
        };
      case 'google':
        return {
          label: 'Google',
          icon: Mail,
          className: 'bg-[#4285f4] text-white',
        };
      case 'emailPassword':
        return {
          label: 'Email & Password',
          icon: Lock,
          className: 'bg-muted text-foreground',
        };
      default:
        return {
          label: type,
          icon: Mail,
          className: 'bg-muted text-foreground',
        };
    }
  };

  const config = getAuthTypeConfig(type);
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="size-3" />
      {config.label}
    </div>
  );
}
