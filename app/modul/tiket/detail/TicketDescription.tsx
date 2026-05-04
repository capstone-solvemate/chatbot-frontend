type Props = { deskripsi: string };

export default function TicketDescription({ deskripsi }: Props) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
      <p className="text-gray-700">{deskripsi}</p>
    </div>
  );
}
