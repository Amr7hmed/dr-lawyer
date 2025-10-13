/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { StreamChat } from "stream-chat";
import MessageHeader from "@/components/sections/messageslayout/headerMessage";
import InputMessage from "@/components/sections/messageslayout/inputMessage";
import ListMessage from "@/components/sections/messageslayout/listMessage";
import { useSendMessageMutation } from "@/hooks/useStreamService";

type Message = {
  id: string;
  text: string;
  user: string;
  created_at: string;
  type?: string;
  attachments?: any[];
};

export default function ChatDetails({
  client,
  chat,
  userId,
  onUnread,
  selectedChatId,
}: any) {
  const sendMessageMutation = useSendMessageMutation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [channelReady, setChannelReady] = useState(false);

  const channelRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    let isMounted = true;
    const initChannel = async () => {
      try {
        const shortChannelId = `${userId.slice(0, 8)}-${chat.id.slice(0, 8)}`;
        const ch = client.channel("messaging", shortChannelId, {
          name: `${userId}-${chat.id}`,
          members: [userId, chat.id],
        });


        // 🔥 اعمل create لو القناة مش موجودة
        await ch.create();
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
              attachments: m.attachments || [],
            }))
          );
        }

        // events
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
              attachments: event.message.attachments || [],
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


    initChannel();

    return () => {
      isMounted = false;
    };
  }, [chat.id, chat.name, client, userId, onUnread, selectedChatId]);



  const sendMessage = async (options?: { file?: File; location?: any }) => {
    if ((!input.trim() && !options) || !channelReady || !channelRef.current) return;

    try {
      // ✅ لو text عادي
      if (!options && input.trim()) {
        // call API backend
        await sendMessageMutation.mutateAsync({
          channelId: channelRef.current.id,
          message: input.trim(),
        });

        // still push it locally
        await channelRef.current.sendMessage({ text: input });
        setInput("");
      }

      // ✅ لو file
      else if (options?.file) {
        const uploaded = options.file.type.startsWith("image/")
          ? await channelRef.current.sendImage(options.file)
          : await channelRef.current.sendFile(options.file);

        await channelRef.current.sendMessage({
          text: "",
          attachments: [
            {
              type: options.file.type.startsWith("image/") ? "image" : "file",
              asset_url: uploaded.file,
              title: options.file.name,
            },
          ],
        });
      }

      // ✅ لو location
      else if (options?.location) {
        await channelRef.current.sendMessage({
          text: "📍 My location",
          attachments: [
            {
              type: "location",
              latitude: options.location.latitude,
              longitude: options.location.longitude,
              asset_url: options.location.url,
              title: "View on Google Maps",
            },
          ],
        });
      }
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };


  return (
    <div className="w-full h-[900px] bg-white rounded-2xl flex flex-col overflow-hidden">
      <MessageHeader chat={chat} showOffer={false} />
      <ListMessage messages={messages} safeUserId={userId} messagesEndRef={messagesEndRef} />
      <InputMessage sendMessage={sendMessage} setInput={setInput} input={input} />
    </div>
  );
}
