/* eslint-disable @typescript-eslint/no-explicit-any */

const ListMessage = ({ messages, safeUserId, messagesEndRef }: any) => {
  return (
    <div className="flex-1 px-4 py-2 overflow-y-auto flex flex-col gap-4 bg-slate-50">
      {messages.map((msg: any) => (
        <div
          key={msg.id}
          className={`flex ${msg.user === safeUserId ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm ${msg.user === safeUserId
                ? "bg-amber-100 text-neutral-900 rounded-br-none"
                : "bg-white border border-slate-200 text-neutral-800 rounded-bl-none"
              }`}
          >
            {msg.attachments?.length ? (
              msg.attachments.map((att: any, i: number) => {
                if (att.type === "image") {
                  return (
                    <img
                      key={i}
                      src={att.asset_url}
                      alt={att.title || "image"}
                      className="max-w-[200px] rounded-lg"
                    />
                  );
                } else if (att.type === "location") {
                  return (
                    <a
                      key={i}
                      href={att.asset_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block"
                    >
                      📍 {att.title || "Open Location"}
                    </a>
                  );
                } else {
                  return (
                    <a
                      key={i}
                      href={att.asset_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block"
                    >
                      📎 {att.title || "Download file"}
                    </a>
                  );
                }
              })
            ) : (
              msg.text
            )}


            <div className="text-[10px] text-slate-400 mt-1 text-right">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ListMessage;
