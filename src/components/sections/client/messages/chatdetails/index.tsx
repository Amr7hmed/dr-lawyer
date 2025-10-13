/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { StreamChat } from "stream-chat";
import MessageHeader from "@/components/sections/messageslayout/headerMessage";
import InputMessage from "@/components/sections/messageslayout/inputMessage";
import ListMessage from "@/components/sections/messageslayout/listMessage";

type Message = {
  id: string;
  text: string;
  user: string;
  created_at: string;
  type?: string; 
  meta?: {
    title?: string;
    description?: string;
    date?: string;
    price?: string;
  };
};

const apiKey = "azkuawxzjres";
const client = StreamChat.getInstance(apiKey);

export default function ChatDetails({
  chat,
  currentUser,
  onUnread,
  selectedChatId,
}: {
  chat: { id: number; name: string; email: string; avatar: string };
  currentUser: string;
  onUnread?: (chatId: number) => void;
  selectedChatId?: number | null;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [channelReady, setChannelReady] = useState(false);

  const channelRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sanitizeUserId = (id: string) =>
    id.toLowerCase().replace(/[^a-z0-9@_-]/g, "_");

  const sanitizeChannelId = (id: string) =>
    id.toLowerCase().replace(/[^a-z0-9_-]/g, "_");

  const safeUserId = sanitizeUserId(currentUser);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let isMounted = true;

    const initChannel = async () => {
      try {
        const channelId = sanitizeChannelId(
          [safeUserId, sanitizeUserId(chat.email)].sort().join("-")
        );

        const ch = client.channel("messaging", channelId, {
          name: chat.name,
          members: [safeUserId, sanitizeUserId(chat.email)],
        });

        await ch.watch();
        if (!isMounted) return;

        channelRef.current = ch;
        setChannelReady(true);

        const state = await ch.query({ messages: { limit: 20 } });
        if (isMounted) {
          setMessages(
            state.messages.map((m: any) => ({
              id: m.id,
              text: m.text,
              user: m.user.id,
              created_at: m.created_at,
              type: m.type || "text",
              meta: m.meta || undefined,
            }))
          );
        }

        ch.on("message.new", (event) => {
          if (!isMounted || !event.message) return;
          setMessages((prev) => [
            ...prev,
            {
              id: event.message.id,
              text: event.message.text || "",
              user: event.user?.id || "",
              created_at: event.message.created_at || "",
              type: event.message.type || "text",
              meta: event.message.meta || undefined,
            },
          ]);

          if (selectedChatId !== chat.id && onUnread) {
            onUnread(chat.id);
          }
        });
      } catch (err) {
        console.error("❌ Error initializing channel:", err);
      }
    };

    if (!client.userID) {
      const devToken = client.devToken(safeUserId);
      client
        .connectUser({ id: safeUserId, name: currentUser }, devToken)
        .then(() => initChannel())
        .catch((err) => console.error("❌ ConnectUser error:", err));
    } else {
      initChannel();
    }

    return () => {
      isMounted = false;
    };
  }, [chat.email, chat.name, currentUser, selectedChatId, onUnread]);

  const sendMessage = async () => {
    if (!input.trim() || !channelReady || !channelRef.current) return;
    try {
      await channelRef.current.sendMessage({ text: input });
      setInput("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  return (
    <div className="w-full h-[750px] bg-white rounded-2xl flex flex-col overflow-hidden">
      <MessageHeader chat={chat} showOffer={true}/>
      <ListMessage messages={messages} safeUserId={safeUserId} messagesEndRef={messagesEndRef}/>
      <InputMessage sendMessage={sendMessage} setInput={setInput} input={input}/>
    </div>
  );
}
