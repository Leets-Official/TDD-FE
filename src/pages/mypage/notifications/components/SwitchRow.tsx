import { Switch } from "@/components/switch/Switch";

interface SwitchRowProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SwitchRow({ title, checked, onChange }: SwitchRowProps) {
  return (
    <div className="flex w-full items-center justify-between p-4">
      <p className="text-m text-black">{title}</p>
      <Switch aria-label={title} checked={checked} onChange={onChange} />
    </div>
  );
}
