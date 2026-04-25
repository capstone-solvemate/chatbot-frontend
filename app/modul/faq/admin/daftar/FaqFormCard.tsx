import { useEffect, useState, type SubmitEvent } from "react";
import type { Faq } from "../../Faq";
import { Button, ButtonColor } from "~/komponen/Button";

interface Props {
  oldFaq?: Faq | null;
  onCancel: () => void;
}

export default function FaqFormCard({ oldFaq = null, onCancel }: Props) {
  const [isValid, setIsValid] = useState(false);

  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState<string | null>(null);
  const [questionTouched, setQuestionTouched] = useState(false);

  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [answerTouched, setAnswerTouched] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (oldFaq !== null) {
      setQuestion(oldFaq.question);
      setAnswer(oldFaq.answer);
    }

    setIsEditing(oldFaq !== null);
  }, [oldFaq]);

  useEffect(() => {
    setIsValid(questionError === null && answerError === null);
  }, [questionError, answerError]);

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

  function setAllTouched() {
    setQuestionTouched(true);
    setAnswerTouched(true);
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) {
      setAllTouched();
      return;
    }
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm mt-6">
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
            <option>Select a category</option>
            <option>Printer</option>
            <option>Account</option>
            <option>Network</option>
          </select>
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
            onClick={onCancel}
            className="text-sm px-3! py-1.5!"
            color={ButtonColor.White}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
