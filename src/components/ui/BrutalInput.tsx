interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  multiline: true;
}

type Props = InputProps | TextareaProps;

function isTextarea(props: Props): props is TextareaProps {
  return "multiline" in props && props.multiline === true;
}

export default function BrutalInput(props: Props) {
  const { label, className = "", ...rest } = props;
  const base = "w-full bg-brutal-white brutal-border p-3 font-medium text-brutal-black placeholder:text-gray-400 focus:outline-none focus:shadow-[4px_4px_0px_#00FF66] transition-shadow rounded-lg";

  return (
    <div className="space-y-1">
      {label && <label className="font-bold text-sm text-brutal-black">{label}</label>}
      {isTextarea(props) ? (
        <textarea className={`${base} min-h-[120px] resize-y ${className}`} {...(rest as any)} />
      ) : (
        <input className={`${base} ${className}`} {...(rest as any)} />
      )}
    </div>
  );
}
