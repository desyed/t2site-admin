type ChatOption = {
  id: string;
  text: string;
};

export type ChatMessage = {
  id: number;
  type: 'bot' | 'user-options';
  avatar?: string;
  message?: string;
  options?: ChatOption[];
};

const conversation: ChatMessage[] = [
  {
    id: 1,
    type: 'bot',
    avatar: '/t2-chat-icon-light.svg',
    message: "Hi! I'm t2chat, an AI Assistant. Ask me anything about t2chat!",
  },
  {
    id: 2,
    type: 'user-options',
    options: [
      { id: 'opt1', text: 'What is t2chat?' },
      { id: 'opt2', text: 'Why should I choose t2chat?' },
      { id: 'opt3', text: 'How do I set up an AI Chatbot?' },
      { id: 'opt4', text: 'I have a different question?' },
    ],
  },
];

interface ChatConversationProps {
  logoPreviewUrl: string;
}

const ChatConversation = ({ logoPreviewUrl }: ChatConversationProps) => {
  return (
    <div className="flex min-h-80 flex-col justify-end gap-4">
      {conversation.map((item) => (
        <div key={item.id}>
          {item.type === 'bot' && (
            <div className="flex items-start gap-3">
              <div className="size-9 overflow-hidden rounded-full bg-[var(--chat-badge)]">
                {logoPreviewUrl ? (
                  <img
                    src={logoPreviewUrl}
                    alt="Bot Avatar"
                    className="size-full object-contain p-2"
                  />
                ) : (
                  <img
                    src={item.avatar}
                    alt="Bot Avatar"
                    className="size-full object-contain p-2"
                  />
                )}
              </div>

              <div className="max-w-[80%] rounded-xl bg-[#D9D9D9] px-4 py-2 text-sm text-gray-800">
                {item.message}
              </div>
            </div>
          )}

          {item.type === 'user-options' && (
            <div className="mt-3 flex flex-col items-end gap-2">
              {item.options?.map((option) => (
                <div
                  key={option.id}
                  className="max-w-[80%] rounded-xl bg-[var(--chat-fg)] px-4 py-2 text-right text-sm text-white"
                >
                  {option.text}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatConversation;
