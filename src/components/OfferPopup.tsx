import { X } from "lucide-react";

interface OfferPopupProps {
  onClose: () => void;
}

export default function OfferPopup({ onClose }: OfferPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <X size={22} />
        </button>

        {/* Poster image */}
        <img
          src="src/Offer_poster_img/Republic-day-offer.png" 
          alt="Republic Day Offer"
          className="w-full h-auto"
        />

        {/* CTA
        <div className="p-4 text-center">
          <h3 className="text-lg font-bold text-green-700">
            🇮🇳 Republic Day Special 🇮🇳
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Get <b>10% EXTRA DISCOUNT</b> on all courses
          </p>
        </div> */}
      </div>
    </div>
  );
}
