"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CareInstructionsFormProps } from "@/lib/definition";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function CareInstructionsForm({
  materials,
}: CareInstructionsFormProps) {
  const router = useRouter();
  const materialItems = materials
    ? Object.entries(materials).map(([key, value]) => ({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1), // Muuttaa ensimmäisen kirjaimen isoksi
        checked: value,
      }))
    : [];
  const defaultSelectedMaterials = materialItems
    .filter((item) => item.checked)
    .map((item) => item.id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: defaultSelectedMaterials,
    },
  });

  // Jos nahka on true näytä lisää uusi form lomake jolla kysytään mikä nahka kyseessä.
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selecterMaterialParams = data.items.join(",");
    router.push(`/care/search?materials=${selecterMaterialParams}`);
  }

  // Jos outdoori on true näytä vain outdoor hoito-ohjeet
  // Vaihad outdoor nimekssi outdoor furniture
  return (
    <div className="flex justify-center items-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 align-middle p-4 rounded-lg border-2 shadow-xl bg-zinc-50"
        >
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Found Materials</FormLabel>
                  <FormDescription className="flex align-middle text-left text-black">
                    Add or remove materials as needed.
                  </FormDescription>
                </div>
                {materialItems.map((item) => {
                  let label = item.label;
                  if (label === "Outdoor") {
                    label = "Outdoor furniture";
                  }

                  return (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked: any) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-base font-normal ">
                              {label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  );
                })}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
