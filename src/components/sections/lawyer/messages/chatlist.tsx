import { useState } from "react";
import {
  IconSearchChat,
  IconFilterChat
} from "@/assets/icons/index";

type ChatItem = {
  id: string;
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
      className={`relative flex items-center gap-3 w-full cursor-pointer rounded-xl p-2 transition ${
        isActive ? "bg-slate-100" : "hover:bg-slate-50"
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

function FilterModal({
  selectedFilter,
  onSelect,
  onClose,
}: {
  selectedFilter: string;
  onSelect: (filter: string) => void;
  onClose: () => void;
}) {
  const filters = ["All messages", "Unread", "Starred", "Blocked"];

  return (
    <div className="fixed inset-0 z-50  bg-black/50">
      {/* Modal Box */}
      <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden absolute top-[185px] left-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-base font-semibold text-gray-800">Filter</h3>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col px-4 py-4 gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                onSelect(filter);
                onClose();
              }}
              className={`flex items-center justify-between border rounded-xl px-4 py-3 text-sm font-medium transition ${
                selectedFilter === filter
                  ? "border-red-500 text-red-600"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{filter}</span>
              {/* Radio indicator */}
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedFilter === filter
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                {selectedFilter === filter && (
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function ChatList({
  onSelectChat,
  selectedChat,
  chats,
  unreadChats,
}: {
  onSelectChat: (chat: ChatItem) => void;
  selectedChat: string | null;
  chats: ChatItem[];
  unreadChats?: string[];
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All messages");

  const filteredChats = chats.filter((chat) => {
    if (filter === "Unread") return unreadChats?.includes(chat.id);
    if (filter === "Starred") return chat.name.includes("⭐"); 
    if (filter === "Blocked") return chat.name.includes("❌"); 
    return true;
  });

  return (
    <div className="relative w-full h-[900px] bg-white rounded-2xl overflow-hidden py-4 px-4 flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="justify-start text-slate-900 text-xl font-bold leading-7">
          Chat
        </h2>

        <div className="flex justify-between items-center gap-2">
          <button className="btn cursor-pointer" type="button">Search</button>
          <button
            className="btn cursor-pointer relative"
            type="button"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2">
        {filteredChats.map((chat) => (
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


