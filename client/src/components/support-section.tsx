import { Phone, Mail } from "lucide-react";

export default function SupportSection() {
  return (
    <div className="mt-6 bg-[#F5F8FB] rounded-md p-4">
      <h3 className="text-sm text-center text-gray-600 mb-3">For Any Support</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <a href="tel:+918951980850" className="hover:underline">
            +91-8951 980 850 [10:00 AM - 21:00 PM IST]
          </a>
        </div>
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <a href="mailto:infinityapp@artofliving.org" className="hover:underline">
            infinityapp@artofliving.org
          </a>
        </div>
      </div>
    </div>
  );
}
