import TampilanDaftarFaq from "./TampilanDaftarFaq"

export default function BagianPopularFaqs() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-medium text-gray-900">
            Popular FAQs
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Find quick answers to common questions
          </p>
        </div>

        <TampilanDaftarFaq />

        <div className="mt-8 text-center">
          <button className="text-sm cursor-pointer font-medium text-blue-600 hover:underline">
            View all FAQs →
          </button>
        </div>

      </div>
    </section>
  )
}