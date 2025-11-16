import React from 'react';

type ChatOption = {
  id: string;
  text: string;
};

type ChatMessage = {
  id: number;
  type: 'bot' | 'user-options';
  avatar?: string;
  message?: string;
  options?: ChatOption[];
};

interface ChatProps {
  conversation: ChatMessage[];
}

const ChatConversation: React.FC<ChatProps> = ({ conversation }) => {
  return (
    <div className="flex min-h-80 flex-col justify-end gap-4">
      {conversation.map((item) => (
        <div key={item.id}>
          {item.type === 'bot' && (
            <div className="flex items-start gap-3">
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt="Bot Avatar"
                  width={36}
                  height={36}
                  className="bg-chat-primary rounded-full p-2"
                />
              )}
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
                  className="max-w-[80%] rounded-xl bg-[#1F2023] px-4 py-2 text-right text-sm text-white"
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
