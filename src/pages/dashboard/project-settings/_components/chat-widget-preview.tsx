import { Plus, Triangle, HelpCircle, Send, Activity } from 'lucide-react';
import Slider from 'react-slick';

import { MessageIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import ChatConversation from './chat-conversation';

interface ChatWidgetPreviewProps {
  logoPreviewUrl: string;
  bannerPreviewUrl: string;
  promotionalImagePreviewUrl: string;
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

const InitialBody = ({
  logoPreviewUrl,
  promotionalImagePreviewUrl,
}: {
  logoPreviewUrl: string;
  promotionalImagePreviewUrl: string;
}) => (
  <div className="flex h-[424px] flex-col justify-end gap-4 overflow-y-auto px-4 py-2">
    <div>
      <p className="text-lg font-medium">Hello Syed Shihab,</p>
      <p className="text-2xl font-bold">How Can I Help?</p>
    </div>

    <div className="rounded-xl bg-[#F5F5F5] p-4 shadow">
      <div className="flex gap-3">
        <div>
          <div className="flex size-9 items-center justify-center rounded-full bg-[var(--chat-badge)]">
            <div className="size-5">
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

        <div className="flex w-3/4 flex-col gap-4">
          <div>
            <p className="text-sm font-bold">t2chat</p>
            <p className="text-sm text-gray-400">Welcome to t2chat</p>
          </div>

          <p className="text-sm text-gray-800">
            Feel free to leave a message, we are here to help!
          </p>

          <Button className="flex items-center gap-2 rounded-full">
            Start a chat
            <Send />
          </Button>
        </div>
      </div>
    </div>

    <div className="relative h-40 overflow-hidden rounded-xl border">
      <div className="absolute left-0 top-0 z-10 flex items-center gap-2 px-4 py-2 text-sm text-white">
        <Activity className="size-4" /> T2Connects
      </div>
      <div className="absolute inset-0 size-full bg-gradient-to-b from-[#00000074] to-transparent" />
      <div>
        {promotionalImagePreviewUrl && (
          <img
            src={promotionalImagePreviewUrl}
            alt="promotional banner"
            className="h-auto w-full object-contain"
          />
        )}
      </div>
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
  promotionalImagePreviewUrl,
}: {
  config: ChatScreenConfig;
  logoPreviewUrl: string;
  bannerPreviewUrl: string;
  promotionalImagePreviewUrl: string;
}) => {
  const { type, showToolbar = true, customBody, customHeader } = config;

  const renderBody = () => {
    if (customBody) return customBody;

    switch (type) {
      case 'initial':
        return (
          <InitialBody
            logoPreviewUrl={logoPreviewUrl}
            promotionalImagePreviewUrl={promotionalImagePreviewUrl}
          />
        );
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
  promotionalImagePreviewUrl,
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
              promotionalImagePreviewUrl={promotionalImagePreviewUrl}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ChatWidgetPreview;
