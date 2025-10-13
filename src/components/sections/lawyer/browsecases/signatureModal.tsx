/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function dataURLtoFile(dataUrl: string, filename: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
}

export default function SignatureModal({
    onClose,
    onSaveSignature,
}: {
    onClose: any;
    onSaveSignature: any;
}) {
    const sigRef = useRef<SignatureCanvas>(null);

    const handleSave = () => {
        if (sigRef.current && !sigRef.current.isEmpty()) {
            const dataUrl = sigRef.current.getCanvas().toDataURL("image/png");

            const file = dataURLtoFile(dataUrl, "signature.png"); // 👈 حولناه لملف
            onSaveSignature(file);
            onClose();
        } else {
            alert("Please sign before submitting.");
        }
    };

    return (
        <div className="w-full] p-4 rounded-[34px] outline  outline-offset-[-1px] outline-Gray-300 inline-flex flex-col justify-center items-center gap-2.5">
            <SignatureCanvas
                ref={sigRef}
                penColor="black"
                canvasProps={{ className: "w-full h-[350px] border rounded-xl bg-gray-100" }}
            />

            <div className="flex items-center gap-2">
                <input type="checkbox" id="agree" />
                <label htmlFor="agree" className="text-sm text-gray-600">
                    I agree that this signature is considered as real signature.
                </label>
            </div>

            <button
                onClick={handleSave}
                className="bg-[#7D1D26] text-white rounded-full py-3 font-semibold hover:bg-[#65171e] w-80 h-14 cursor-pointer"
            >
                Save Signature
            </button>
        </div>
    );
}
