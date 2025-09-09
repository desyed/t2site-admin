'use client';

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';
import { useId, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';

interface SitePasswordProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  error?: boolean;
}

export default function SitePassword({
  value,
  onChange,
  id,
}: SitePasswordProps) {
  const defaultId = useId();
  const actualId = id || defaultId;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: '8+ characters' },
      { regex: /\d/, text: 'Number' },
      { regex: /[a-z]/, text: 'Lowercase' },
      { regex: /[A-Z]/, text: 'Uppercase' },
      { regex: /[!"#$%&()*,.:<>?@^{|}]/, text: 'Symbol' },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border';
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-orange-500';
    if (score === 4) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className="*:not-first:mt-2">
        <div className="relative">
          <Input
            id={actualId}
            className="pe-9"
            placeholder="•••••••••••••••••••"
            type={isVisible ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-describedby={`${actualId}-description`}
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Password strength indicator */}
      <div
        className="mb-2 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      {/* Password requirements list */}
      <ul className="flex flex-wrap gap-2" aria-label="Password requirements">
        {checkStrength(value).map((req, index) => (
          <li
            key={index}
            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs ${req.met ? 'border-emerald-500 bg-emerald-50/50' : 'border-border'}`}
          >
            {req.met ? (
              <CheckIcon
                size={14}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <XIcon
                size={14}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? ' - Requirement met' : ' - Requirement not met'}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
