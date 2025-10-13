import { useState, useEffect } from "react";
import ChatDetails from "@/components/sections/lawyer/messages/chatdetails";
import ChatList from "@/components/sections/lawyer/messages/chatlist";
import { useGetStreamTokenQuery } from "@/hooks/useStreamService";
import { StreamChat } from "stream-chat";
import Container from "@/components/ui/container";
import { HeroSectionMessage } from "@/components/sections/client/messages/hero-section-message";
import { useTranslation } from "react-i18next";

type ChatItem = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export default function MessagesClient() {
  const { t } = useTranslation("clientHome");
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const [unreadChats, setUnreadChats] = useState<string[]>([]);
  const [chats, setChats] = useState<ChatItem[]>([]);

  const currentUser = "a@g.co";

  const { data: streamData, isLoading, error } = useGetStreamTokenQuery();
const [chatClient, setChatClient] = useState<StreamChat | null>(null);

useEffect(() => {
  if (!streamData?.data) return;

  const client = StreamChat.getInstance(streamData.data.apiKey);

  const initClient = async () => {
    try {
      await client.connectUser(
        { id: streamData.data.userId, name: currentUser },
        streamData.data.token
      );
      setChatClient(client);

      const channels = await client.queryChannels(
        { members: { $in: [streamData.data.userId] } },
        { last_message_at: -1 }
      );

      const chatsList: ChatItem[] = [];

      channels.forEach((channel) => {
        Object.values(channel.state.members).forEach((member: any) => {
          if (member.user_id !== streamData.data.userId) {
            chatsList.push({
              id: member.user_id,
              name: member.user?.name || member.user_id,
              email: member.user?.id || member.user_id,
              avatar: member.user?.image || "https://randomuser.me/api/portraits/lego/1.jpg",
            });
          }
        });
      });

      const uniqueChats = Array.from(
        new Map(chatsList.map((item) => [item.id, item])).values()
      );

      setChats(uniqueChats);
    } catch (err) {
      console.error("❌ Error initializing Stream client:", err);
    }
  };

  initClient();

  return () => {
    client.disconnectUser();
  };
}, [streamData, currentUser]);


  const handleUnread = (chatId: string) => {
    setUnreadChats((prev) => [...new Set([...prev, chatId])]);
  };

  const handleSelectChat = (chat: ChatItem) => {
    setSelectedChat(chat);
    setUnreadChats((prev) => prev.filter((id) => id !== chat.id));
  };

  return (
    <>
      <title>{`Dr-Lawyer | ${t("title")}`}</title>
      <Container className="flex flex-col gap-6 py-6">
        <HeroSectionMessage />
        <div className="w-full flex gap-3 h-full">
          <div className="w-90">
            <ChatList
              onSelectChat={handleSelectChat}
              selectedChat={selectedChat?.id || null}
              chats={chats}
              unreadChats={unreadChats}
            />
          </div>

          <div className="flex-1">
            {isLoading ? (
              <p>Loading token...</p>
            ) : error ? (
              <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
            ) : selectedChat && streamData?.data ? (
              <ChatDetails
                client={chatClient} // client هنا
                chat={selectedChat}
                userId={streamData.data.userId}
                onUnread={handleUnread}
                selectedChatId={selectedChat.id}
              />
            ) : (

              <div className="w-full h-full flex items-center justify-center text-slate-400 text-lg">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
