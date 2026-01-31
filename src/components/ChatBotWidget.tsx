import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
     {!isOpen && (
  <button
    onClick={() => setIsOpen(true)}
    className="fixed bottom-5 right-5 z-[9999] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
    title="Chat with us"
  >
    <img
      src="https://cdn.dribbble.com/userupload/33219605/file/original-3e652baea723121800ca0068452af00e.gif" // <-- your GIF path
      alt="Chat Bot"
      className="w-20 h-20  rounded-full bg-transparent"
    />
  </button>
)}


      {/* Chatbox */}
      {isOpen && (
        <div
          className="
    fixed sm:fixed bottom-0 right-1/2 sm:right-5 translate-x-1/2 sm:translate-x-0
    w-[100vw] sm:w-80 md:w-[450px]
    h-[80vh] sm:h-96 md:h-[600px]
    bg-white rounded-t-xl sm:rounded-xl shadow-lg flex flex-col overflow-hidden
    touch-auto -webkit-overflow-scrolling: touch
    z-[9999]  /* 🔥 Make sure it's above everything */
  "
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-1">
           <h4 className="flex items-center gap-2 font-semibold text-sm sm:text-base md:text-sm text-white">
  💬 Ask Anything About <span className="underline decoration-yellow-300">Xpert Institute</span>
</h4>

            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200"
            >
              <X className="w-6 h-6 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Chatbot Iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/G6-18Uh1wle7G_nZg4-B9"
            width="100%"
            height="100%"
            frameBorder="0"
            className="flex-1 w-full h-full overflow-auto touch-auto"
            title="Xpert Institute Chatbot"
          />
        </div>
      )}
    </>
  );
}
