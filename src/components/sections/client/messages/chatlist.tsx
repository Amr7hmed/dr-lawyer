import { useState } from "react";
import {IconSearchChat,
IconFilterChat
} from "@/assets/icons/index";

type ChatItem = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};

function ChatCard({
  item,
  isActive,
  hasUnread,
  onClick,
}: {
  item: ChatItem;
  isActive: boolean;
  hasUnread?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative flex items-center gap-3 w-full cursor-pointer rounded-xl p-2 transition ${isActive ? "bg-slate-100" : "hover:bg-slate-50"
        }`}
    >
      <img
        src={item.avatar}
        alt={item.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      {hasUnread && !isActive && (
        <span className="absolute top-1 left-10 w-3 h-3 bg-red-500 rounded-full" />
      )}
      <div className="flex-1">
        <p className="text-sm font-semibold text-neutral-800">{item.name}</p>
        <p className="text-xs text-slate-500">{item.email}</p>
      </div>
    </div>
  );
}

export default function ChatList({
  onSelectChat,
  selectedChat,
  mockChats,
  unreadChats,
}: {
  onSelectChat: (chat: ChatItem) => void;
  selectedChat: number | null;
  mockChats: ChatItem[];
  unreadChats?: number[];
}) {
  const [chats] = useState<ChatItem[]>(mockChats);

  return (
    <div className="w-full  h-[750px] bg-white rounded-2xl overflow-hidden py-4 px-4 flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="justify-start text-slate-900 text-xl font-bold font-['Inter'] leading-7">Chat</h2>

        <div className="flex justify-between items-center gap-2">
          <button className="btn cursor-pointer" type="button">
            <IconSearchChat/>
          </button>
          <button className="btn cursor-pointer" type="button">
            <IconFilterChat/>
          </button>

        </div>

      </div>
      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            item={chat}
            isActive={chat.id === selectedChat}
            hasUnread={unreadChats?.includes(chat.id)}
            onClick={() => onSelectChat(chat)}
          />
        ))}
      </div>
    </div>
  );
}
