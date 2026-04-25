import { Button } from "~/komponen/Button";
import IkonTambah from "~/komponen/ikon/IkonTambah";

export default function PageHeader() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-900">FAQ Management</h1>

      <p className="text-sm text-gray-500 mt-2">
        Manage frequently asked questions
      </p>

      <Button
        className="mt-5 text-sm! ps-2! pe-3! py-2! gap-1!"
        leftIcon={<IkonTambah className="h-5" />}
      >
        Add New FAQ
      </Button>
    </section>
  );
}
