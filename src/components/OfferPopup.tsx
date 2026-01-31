import { X } from "lucide-react";
import offerImage from "../Offer_poster_img/Republic-day-offer.png";
import { useEffect, useState } from "react";

interface OfferPopupProps {
  onClose: () => void;
}

export default function OfferPopup({ onClose }: OfferPopupProps) {
  const [showClose, setShowClose] = useState(false);

  // Show close button after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">

        {/* Poster image */}
        <img
          src={offerImage}
          alt="Republic Day Offer"
          className="w-full h-full object-contain"
        />

        {/* Close button */}
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-red-100 transition"
          >
            <X size={28} className="text-gray-700 hover:text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}
