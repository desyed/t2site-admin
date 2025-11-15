import { ArrowRightOutline, MessageIcon } from '@/components/icons';

const ChatWidgetPreview = () => {
  return (
    <div className="w-[400px] overflow-hidden rounded-xl">
      {/* Chat Header */}
      <div className="bg-chat-primary/15 flex items-center justify-between border-b border-border/30 px-3.5 py-3 text-primary">
        <div className="flex items-center gap-2.5">
          <div>
            <div
              className={`bg-chat-primary flex size-11 items-center justify-center rounded-full`}
            >
              <div className="mt-[2px] size-3/5">
                <MessageIcon />
              </div>
            </div>
          </div>
          <div className="mt-[-4px]">
            <h3 className="font-medium">Support Assistant</h3>
            <p className="flex items-center text-xs">
              <span
                className={`mr-1.5 inline-block size-2 rounded-full bg-green-500`}
              ></span>
              Online | Typically replies in a few minutes
            </p>
          </div>
        </div>
        <button className="cursor-pointer transition-transform active:scale-90">
          <ArrowRightOutline className="size-6" />
        </button>
      </div>

      {/* Inbox Section */}
    </div>
  );
};
export default ChatWidgetPreview;
