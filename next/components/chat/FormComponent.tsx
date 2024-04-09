import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatFormProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function FormComponent({ input, handleInputChange, handleSubmit }: ChatFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-4 items-center">
        <Input
          type="text"
          value={input}
          className="flex-1 border-2 p-2 rounded-md text-black font-semibold"
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
        <Button className="h-[3rem] w-20 shrink-0" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;