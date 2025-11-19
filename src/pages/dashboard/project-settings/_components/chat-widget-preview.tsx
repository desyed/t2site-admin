import { Plus, Triangle, HelpCircle } from 'lucide-react';
import Slider from 'react-slick';

import { MessageIcon } from '@/components/icons';
import { Button } from '@/components/site-button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import ChatConversation from './chat-conversation';

interface ChatWidgetPreviewProps {
  logoPreviewUrl: string;
  bannerPreviewUrl: string;

  screens?: ChatScreenConfig[];
}

interface ChatScreenConfig {
  type: 'conversation' | 'initial' | string;
  showToolbar?: boolean;
  customBody?: React.ReactNode;
  customHeader?: React.ReactNode;
  backgroundOverlay?: React.ReactNode;
}

// -----------------------------------------------------------------------------
// Shared Components
// -----------------------------------------------------------------------------

const BannerBackground = ({
  bannerPreviewUrl,
}: {
  bannerPreviewUrl: string;
}) => (
  <>
    <div className="absolute inset-0 h-[600px] bg-gradient-to-b from-[var(--chat-bg)] to-[#F5F5F5]" />

    {bannerPreviewUrl && (
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerPreviewUrl})`,
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
        }}
      />
    )}
  </>
);

const DefaultHeader = ({ logoPreviewUrl }: { logoPreviewUrl: string }) => (
  <div className="flex h-[100px] items-center justify-between px-6 py-4 text-primary">
    <div className="flex items-center gap-2.5">
      <div className="flex size-11 items-center justify-center rounded-full bg-[var(--chat-badge)]">
        <div className="size-3/5">
          {logoPreviewUrl ? (
            <img
              src={logoPreviewUrl}
              alt="logo"
              className="size-full object-contain"
            />
          ) : (
            <MessageIcon />
          )}
        </div>
      </div>
    </div>
  </div>
);

const ConversationBody = ({ logoPreviewUrl }: { logoPreviewUrl: string }) => (
  <div className="h-[424px] px-2">
    <div className="h-full rounded-t-xl bg-[#F5F5F5] p-4">
      <ChatConversation logoPreviewUrl={logoPreviewUrl} />
    </div>
  </div>
);

const InitialBody = () => (
  <div className="flex h-[424px] items-center justify-center px-4">
    <div className="text-center text-gray-600">
      <p className="text-lg font-medium">Welcome to T2 Chat</p>
      <p className="text-sm opacity-70">
        Start conversation by clicking below.
      </p>
    </div>
  </div>
);

const Toolbar = () => (
  <div className="h-[76px] bg-[#E6E6E6] pb-2 pt-4">
    <div className="flex items-center gap-2 px-2 pb-1 sm:px-3 sm:pb-2">
      <div className="flex w-full items-center gap-2 overflow-hidden rounded-[28px] border bg-background">
        <div className={cn('pl-2', 'order-1 w-fit')}>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <Input
          className="order-2 flex-1 border-none focus-visible:shadow-none focus-visible:outline-none"
          placeholder="Write a message..."
          readOnly
        />

        <div className="order-3 flex items-center gap-2 px-2">
          <Button
            size="icon"
            className="size-7 gap-2 rounded-full bg-[var(--chat-fg)]"
          >
            <Triangle className="ml-0.5 size-4 rotate-90" />
          </Button>
        </div>
      </div>

      <HelpCircle />
    </div>
  </div>
);

// -----------------------------------------------------------------------------
// Configurable Screen Renderer
// -----------------------------------------------------------------------------

const ChatScreen = ({
  config,
  logoPreviewUrl,
  bannerPreviewUrl,
}: {
  config: ChatScreenConfig;
  logoPreviewUrl: string;
  bannerPreviewUrl: string;
}) => {
  const { type, showToolbar = true, customBody, customHeader } = config;

  const renderBody = () => {
    if (customBody) return customBody;

    switch (type) {
      case 'initial':
        return <InitialBody />;
      case 'conversation':
      default:
        return <ConversationBody logoPreviewUrl={logoPreviewUrl} />;
    }
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-xl">
      <BannerBackground bannerPreviewUrl={bannerPreviewUrl} />

      <div className="relative z-10 size-full">
        {customHeader ?? <DefaultHeader logoPreviewUrl={logoPreviewUrl} />}

        {renderBody()}

        {showToolbar && <Toolbar />}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

const ChatWidgetPreview = ({
  logoPreviewUrl,
  bannerPreviewUrl,
  screens = [{ type: 'conversation' }, { type: 'initial' }],
}: ChatWidgetPreviewProps) => {
  return (
    <div className="h-[600px] w-[400px]">
      <Slider
        dots
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        className="h-full overflow-hidden rounded-xl border"
      >
        {screens.map((screen, idx) => (
          <div key={idx}>
            <ChatScreen
              config={screen}
              logoPreviewUrl={logoPreviewUrl}
              bannerPreviewUrl={bannerPreviewUrl}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ChatWidgetPreview;
