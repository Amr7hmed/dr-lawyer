/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreateOfferMutation } from "@/hooks/useOfferService";
import SignatureModal from "./signatureModal";
import OfferFormFields from "./OfferFormFields";
import OfferModalHeader from "./OfferModalHeader";
import CaseInfoCard from "./CaseInfoCard";

export default function CreateOfferModal({
  onClose,
  caseData,
}: {
  onClose: () => void;
  caseData: any;
}) {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [signature, setSignature] = useState<string | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);


  const createOfferMutation = useCreateOfferMutation({
    onSuccess: () => {
      console.log("Offer sent ✅");
      onClose();
    },
    onError: (err) => {
      console.error("Error ❌", err);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    if (!description || !duration || !price || !signature) {
      alert("Please fill all required fields and add signature");
      return;
    }

    createOfferMutation.mutate({
      payload: {
        caseId: caseData.id,
        description,
        duration,
        price,
        attachments,
        signature,
      },
    });
  };
  const handleNextStep = () => {
  if (!description || !duration || !price) {
    alert("Please fill all required fields before proceeding.");
    return;
  }
  setShowSignatureModal(true);
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6 relative flex flex-col gap-3">
        {/* Header */}
        <OfferModalHeader onClose={onClose} showSignatureModal={showSignatureModal} setShowSignatureModal={setShowSignatureModal} />
        {/* Form */}
        {showSignatureModal == false ? <>
          {/* Case Info */}
          <CaseInfoCard caseData={caseData} />
          <OfferFormFields
            description={description}
            setDescription={setDescription}
            duration={duration}
            setDuration={setDuration}
            price={price}
            setPrice={setPrice}
            attachments={attachments}
            handleFileChange={handleFileChange}
            setShowSignatureModal={setShowSignatureModal}
            onNextStep={handleNextStep}
          />
        </>
          :
          <SignatureModal
            onClose={() => setShowSignatureModal(false)}
            onSaveSignature={(sigFile: any) => {
              setSignature(sigFile);
              handleSubmit();
            }}
          />
        }
      </div>
    </div>
  );
}
