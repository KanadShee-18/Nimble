import { BsExclamationTriangle } from "react-icons/bs";
interface FormErrorProps {
  errorMessage?: string;
}

const FormError = ({ errorMessage }: FormErrorProps) => {
  return (
    <div className="flex space-x-4 items-center rounded-lg p-2 text-rose-500 bg-red-500/15 text-sm">
      <BsExclamationTriangle className="w-4 h-4" />
      <p>{errorMessage}</p>
    </div>
  );
};

export default FormError;
