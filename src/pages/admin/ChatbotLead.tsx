import { useEffect, useState } from "react";

interface Chat {
  timestamp: string | number | Date;
  _id: string;
  userMessage: string;
  botReply: string;
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ChatbotLead = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("${API_BASE_URL}/api/chatbot")
    fetch(`${API_BASE}/api/chatbot`)
      .then((res) => res.json())
      .then((data) => setChats(data))
      .catch((err) => console.error("Error fetching chatbot history:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-screen bg-black text-white font-raleway flex flex-col p-0">
      <div className="sticky top-0 z-20 bg-black p-4 sm:p-6 border-b border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold">Chatbot History</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : chats.length === 0 ? (
          <p className="text-gray-400">No chat history found.</p>
        ) : (
          <>
            {/* Box format for mobile (hidden on sm and up) */}
            <div className="sm:hidden space-y-4">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className="bg-[#1e1e1e] rounded-lg p-4 border border-gray-700"
                >
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(chat.timestamp).toLocaleString()}
                  </p>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-300">User:</span>{" "}
                    {chat.userMessage}
                  </div>
                  <div>
                    <span className="font-semibold text-green-400">Bot:</span>{" "}
                    {chat.botReply}
                  </div>
                </div>
              ))}
            </div>

            {/* Table format for desktop (hidden on mobile) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-700 text-sm sm:text-base">
                <thead className="bg-[#1e1e1e] text-left">
                  <tr>
                    <th className="px-4 py-3 border-b border-gray-700">Date</th>
                    <th className="px-4 py-3 border-b border-gray-700">
                      User Message
                    </th>
                    <th className="px-4 py-3 border-b border-gray-700">
                      Bot Reply
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chats.map((chat) => (
                    <tr
                      key={chat._id}
                      className="even:bg-[#111] hover:bg-[#222] transition duration-200"
                    >
                      <td className="px-4 py-3">
                        {new Date(chat.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-wrap">
                        {chat.userMessage}
                      </td>
                      <td className="px-4 py-3 whitespace-pre-wrap">
                        {chat.botReply}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotLead;
