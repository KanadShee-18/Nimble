import { CheckCheckIcon } from "lucide-react";

interface FormSuccessProps {
  successMessage?: string;
}

const FormSuccess = ({ successMessage }: FormSuccessProps) => {
  return (
    <div className="flex space-x-4 items-center rounded-lg p-2 text-emerald-500 bg-emerald-500/15 text-sm">
      <CheckCheckIcon className="w-4 h-4" />
      <p>{successMessage}</p>
    </div>
  );
};

export default FormSuccess;
