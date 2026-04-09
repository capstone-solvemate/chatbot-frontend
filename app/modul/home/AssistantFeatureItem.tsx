import IkonCheck from "~/komponen/IkonCheck";

type FeatureItemProps = {
  text: string;
};

export function AssistantFeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-center gap-3 text-gray-600">
      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-100 text-green-600">
        <IkonCheck className="w-3.5" />
      </span>
      {text}
    </li>
  );
}
