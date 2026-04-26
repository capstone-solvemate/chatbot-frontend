import { forwardRef, useEffect, useState, type SubmitEvent } from "react";
import type { Faq } from "../../Faq";
import { Button, ButtonColor } from "~/komponen/Button";
import type { ContextType } from "~/dasar/ContextType";
import { useOutletContext } from "react-router";
import type { SubmitFaqDto } from "../dto/SubmitFaqDto";
import type { Kategori } from "~/modul/settings/kategori/Kategori";

interface Props {
  daftarKategori: Kategori[];
  oldFaq?: Faq | null;
  onClose: (refreshRequired: boolean) => void;
}

const FaqFormCard = forwardRef<HTMLDivElement, Props>(
  ({ oldFaq = null, daftarKategori, onClose }: Props, ref) => {
    const [isValid, setIsValid] = useState(false);

    const [question, setQuestion] = useState("");
    const [questionError, setQuestionError] = useState<string | null>(null);
    const [questionTouched, setQuestionTouched] = useState(false);

    const [answer, setAnswer] = useState("");
    const [answerError, setAnswerError] = useState<string | null>(null);
    const [answerTouched, setAnswerTouched] = useState(false);

    const [idKategori, setIdKategori] = useState(0);
    const [kategoriError, setKategoriError] = useState<string | null>(null);
    const [kategoriTouched, setKategoriTouched] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [_a, _b, konektorBackend, _c, setMasterError]: ContextType =
      useOutletContext();

    useEffect(() => {
      if (oldFaq !== null) {
        setQuestion(oldFaq.question);
        setAnswer(oldFaq.answer);
      }

      setIsEditing(oldFaq !== null);
    }, [oldFaq]);

    useEffect(() => {
      setIsValid(
        questionError === null &&
          answerError === null &&
          kategoriError === null,
      );
    }, [questionError, answerError, kategoriError]);

    useEffect(() => {
      if (question.trim() === "") {
        setQuestionError("This field is required");
        return;
      }

      setQuestionError(null);
    }, [question]);

    useEffect(() => {
      if (answer.trim() === "") {
        setAnswerError("This field is required");
        return;
      }

      setAnswerError(null);
    }, [answer]);

    useEffect(() => {
      if (idKategori < 1) {
        setKategoriError("A category must be selected");
        return;
      }

      setKategoriError(null);
    }, [idKategori]);

    function setAllTouched() {
      setQuestionTouched(true);
      setAnswerTouched(true);
      setKategoriTouched(true);
    }

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);

      if (!isValid) {
        setAllTouched();
        setIsSubmitting(false);
        return;
      }

      try {
        const reqData: SubmitFaqDto = {
          idKategori: idKategori,
          question: question,
          answer: answer,
        };
        if (!isEditing) {
          await konektorBackend.post("/api/admin/faqs", reqData);
        }
        onClose(true);
      } catch (e: any) {
        setMasterError(e);
      } finally {
        setIsSubmitting(false);
      }
    }

    return (
      <section
        ref={ref}
        className="bg-white border border-gray-200 rounded-xl shadow-sm mt-6 scroll-mt-20"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit" : "Add New"} FAQ
          </h2>
        </div>

        {/* Form */}
        <form className="p-6 space-y-6" method="POST" onSubmit={handleSubmit}>
          {/* Question */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-800">
              Question
            </label>

            <input
              type="text"
              placeholder="Enter FAQ title..."
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              className="
              w-full
              rounded-md
              bg-gray-100
              border border-transparent
              px-3 py-2
              text-sm
              outline-none
              focus:border-blue-500
            "
              onBlur={() => setQuestionTouched(true)}
            />

            {questionError && questionTouched && (
              <div className="text-xs text-red-600">{questionError}</div>
            )}
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-800">
              Answer
            </label>

            <textarea
              rows={6}
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              placeholder="Enter the answer..."
              onBlur={() => setAnswerTouched(true)}
              className="
              w-full
              rounded-md
              bg-gray-100
              border border-transparent
              px-3 py-2
              text-sm
              resize-none
              outline-none
              focus:border-blue-500
            "
            />

            {answerError && answerTouched && (
              <div className="text-xs text-red-600">{answerError}</div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-800">
              Category
            </label>

            <select
              value={idKategori}
              onChange={(e) => setIdKategori(Number.parseInt(e.target.value))}
              onBlur={() => setKategoriTouched(true)}
              className="
              w-full
              rounded-md
              bg-gray-100
              border border-transparent
              px-3 py-2
              text-sm
              text-gray-700
              outline-none
              focus:border-blue-500
            "
            >
              <option value={0}>-- Select a category --</option>
              {daftarKategori.map((kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.nama}
                </option>
              ))}
            </select>

            {kategoriError && kategoriTouched && (
              <div className="text-xs text-red-600">{kategoriError}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              className="text-sm px-10! py-1.5!"
              color={isValid ? ButtonColor.Blue : ButtonColor.Gray}
            >
              {isEditing ? "Update" : "Add"} FAQ
            </Button>

            <Button
              disabled={isSubmitting}
              onClick={() => onClose(false)}
              className="text-sm px-3! py-1.5!"
              color={ButtonColor.White}
            >
              Cancel
            </Button>
          </div>
        </form>
      </section>
    );
  },
);

export default FaqFormCard;
