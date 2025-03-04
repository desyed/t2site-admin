import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import CopyButton from '@/components/copy-button';

import { useTheme } from './theme-provider';
interface SiteCodeBlockProps {
  code: string;
  language: string;
  mode?: 'dark' | 'light';
}

export default function SiteCodeBlock({
  code,
  language,
  mode,
}: SiteCodeBlockProps) {
  const { theme } = useTheme();

  const getTheme = () => {
    if (mode === 'dark' || theme === 'dark') {
      return oneDark;
    }
    return oneLight;
  };

  return (
    <div className="relative selection:!text-inherit">
      <SyntaxHighlighter language={language} style={getTheme()}>
        {code}
      </SyntaxHighlighter>
      <div className="absolute right-0 top-2">
        <CopyButton
          showToasterMessage="Copied to clipboard"
          className="size-9 [&_svg]:size-4"
          text={code}
        />
      </div>
    </div>
  );
}
