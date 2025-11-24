import {
  Plus,
  Triangle,
  HelpCircle,
  Send,
  Activity,
  X,
  Search,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';
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
  bannerTitle: string;
  bannerSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  promotionalTitle: string;
  promotionalLink: string;
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
  bannerTitle,
  bannerSubtitle,
  ctaTitle,
  ctaSubtitle,
  ctaDescription,
  ctaButtonText,
  promotionalTitle,
  promotionalLink,
}: {
  logoPreviewUrl: string;
  promotionalImagePreviewUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  promotionalTitle: string;
  promotionalLink: string;
}) => (
  <div className="flex h-[424px] flex-col justify-end gap-4 overflow-y-auto px-4">
    <div className="flex h-full flex-col gap-4">
      <div>
        <p className="text-lg font-medium">{bannerTitle},</p>
        <p className="text-2xl font-bold">{bannerSubtitle}</p>
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

          {/* CTA Card */}
          <div className="flex w-3/4 flex-col gap-4">
            <div>
              <p className="text-sm font-bold">{ctaTitle}</p>
              <p className="text-sm text-gray-400">{ctaSubtitle}</p>
            </div>

            <p className="text-sm text-gray-800">{ctaDescription}</p>

            <Button className="flex items-center gap-2 rounded-full bg-[var(--chat-fg)]">
              {ctaButtonText}
              <Send />
            </Button>
          </div>
        </div>
      </div>

      <Link to={promotionalLink} target="_blank" title={promotionalLink}>
        <div className="relative h-40 overflow-hidden rounded-xl border">
          <div className="absolute left-0 top-0 z-10 flex items-center gap-2 px-4 py-2 text-sm text-white">
            <Activity className="size-4" /> {promotionalTitle}
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
      </Link>
    </div>
  </div>
);

const FaqBody = ({
  bannerTitle,
  bannerSubtitle,
}: {
  bannerTitle: string;
  bannerSubtitle: string;
}) => (
  <div className="flex h-[424px] flex-col justify-end gap-4 overflow-y-auto px-4">
    <div className="flex h-full flex-col justify-end gap-4">
      <div>
        <p className="text-lg font-medium">{bannerTitle},</p>
        <p className="text-2xl font-bold">{bannerSubtitle}</p>
      </div>

      <div className="h-[280px] rounded-xl bg-[#F5F5F5] px-4 py-6">
        {/* Input Field with Search Icon */}
        <div className="relative">
          <Input
            placeholder="Search for help"
            className="rounded-full border-none !bg-[#E6E6E6] px-4 focus-visible:shadow-none focus-visible:outline-none"
            readOnly
          />
          <Search
            size={20}
            strokeWidth={3}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* FAQ List */}
        <div className="no-scrollbar mt-4 flex h-[200px] flex-col gap-3 overflow-y-auto px-4 pb-4">
          {[1, 2, 3, 4, 5].map((faq) => (
            <div
              key={faq}
              className="flex cursor-pointer items-center justify-between text-gray-400 hover:text-gray-600"
            >
              <p className="text-sm">
                This is a sample frequently asked question #{faq}?
              </p>
              <ChevronRight />
            </div>
          ))}
        </div>
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
  bannerTitle,
  bannerSubtitle,
  ctaTitle,
  ctaSubtitle,
  ctaDescription,
  ctaButtonText,
  promotionalTitle,
  promotionalLink,
}: {
  config: ChatScreenConfig;
  logoPreviewUrl: string;
  bannerPreviewUrl: string;
  promotionalImagePreviewUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  promotionalTitle: string;
  promotionalLink: string;
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
            bannerTitle={bannerTitle}
            bannerSubtitle={bannerSubtitle}
            ctaTitle={ctaTitle}
            ctaSubtitle={ctaSubtitle}
            ctaDescription={ctaDescription}
            ctaButtonText={ctaButtonText}
            promotionalTitle={promotionalTitle}
            promotionalLink={promotionalLink}
          />
        );

      case 'faq':
        return (
          <FaqBody bannerTitle={bannerTitle} bannerSubtitle={bannerSubtitle} />
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
  bannerTitle,
  bannerSubtitle,
  ctaTitle,
  ctaSubtitle,
  ctaDescription,
  ctaButtonText,
  promotionalTitle,
  promotionalLink,
  screens = [{ type: 'conversation' }, { type: 'initial' }, { type: 'faq' }],
}: ChatWidgetPreviewProps) => {
  return (
    <div className="flex flex-col gap-8">
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
                bannerTitle={bannerTitle}
                bannerSubtitle={bannerSubtitle}
                ctaTitle={ctaTitle}
                ctaSubtitle={ctaSubtitle}
                ctaDescription={ctaDescription}
                ctaButtonText={ctaButtonText}
                promotionalTitle={promotionalTitle}
                promotionalLink={promotionalLink}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex justify-end">
        <div className="flex size-16 items-center justify-center rounded-full bg-[var(--chat-badge)] text-primary">
          <X size={36} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default ChatWidgetPreview;
