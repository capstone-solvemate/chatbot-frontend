import IkonJempolAtas from "~/komponen/ikon/IkonJempolAtas";
import IkonJempolBawah from "~/komponen/ikon/IkonJempolBawah";
import IkonTutup from "~/komponen/ikon/IkonTutup";
import type { KonektorBackend } from "~/dasar/KonektorBackend";
import type { Faq } from "../Faq";
import { useState } from "react";

interface Props {
  faq: Faq;
  jawabanSurvei: boolean | null;
  onJawabanSurveiChange: (jawaban: boolean | null) => void;
  onClose: () => void;
  konektorBackend: KonektorBackend;
}

export default function DetailFaq({
  faq,
  jawabanSurvei,
  onJawabanSurveiChange,
  onClose,
  konektorBackend,
}: Props) {
  const [submitting, setSubmitting] = useState(false);

  async function handleVote(vote: boolean) {
    if (submitting) return;
    const previousJawaban = jawabanSurvei;
    onJawabanSurveiChange(vote); // optimistic update
    setSubmitting(true);
    try {
      await konektorBackend.post(`/api/faqs/${faq.id}/survei`, {
        jawaban: vote,
      });
    } catch {
      onJawabanSurveiChange(previousJawaban); // rollback jika gagal
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-in">
        {/* Header */}
        <div className="px-7 pt-7 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 leading-snug">
                {faq.question}
              </h2>
              {faq.kategori && (
                <span className="inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {faq.kategori.nama}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <IkonTutup />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-7" />

        {/* Body */}
        <div className="px-7 py-5 space-y-4">
          <p className="text-sm text-gray-600">{faq.answer}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mx-7" />

        {/* Footer */}
        <div className="px-7 py-5 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-gray-600">Was this helpful?</p>
          <div className="flex gap-3">
            <VoteButton
              active={jawabanSurvei === true}
              loading={submitting}
              onClick={() => handleVote(true)}
              icon={<IkonJempolAtas />}
              label="Yes"
            />
            <VoteButton
              active={jawabanSurvei === false}
              loading={submitting}
              onClick={() => handleVote(false)}
              icon={<IkonJempolBawah />}
              label="No"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface VoteButtonProps {
  active: boolean;
  loading: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function VoteButton({
  active,
  loading,
  onClick,
  icon,
  label,
}: VoteButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed
        ${
          active
            ? "border-blue-500 bg-blue-50 text-blue-600"
            : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
