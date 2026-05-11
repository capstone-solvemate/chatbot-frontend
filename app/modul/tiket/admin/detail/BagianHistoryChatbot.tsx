import IkonBot from "~/komponen/ikon/IkonBot";
import BubbleChatHistori from "./BubbleChatHistory";
import type { PesanChat } from "./dto/TiketAdminDetail";

export default function BagianHistoryChatbot({
  historiChat,
}: {
  historiChat: PesanChat[];
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 bg-purple-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full text-purple-600 flex items-center justify-center shrink-0">
            <IkonBot />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              AI Chatbot Conversation
            </h2>
          </div>
        </div>
        <p className="text-gray-600 text-sm">
          Conversation before ticket creation
        </p>
      </div>

      <div className="px-5 py-4 space-y-3 max-h-96 overflow-y-auto bg-gray-50">
        {historiChat.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            No chatbot conversation recorded.
          </p>
        ) : (
          historiChat.map((p) => <BubbleChatHistori key={p.id} pesan={p} />)
        )}
      </div>
    </div>
  );
}
