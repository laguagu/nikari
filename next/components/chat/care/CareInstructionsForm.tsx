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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  woodOption: z.string().optional(), // Lisää tämä rivi
  leatherOption: z.string().optional(), // Lisää tämä rivi
});

export default function CareInstructionsForm({
  materials,
}: CareInstructionsFormProps) {
  const [selectValue, setSelectValue] = useState<string>("");
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
      woodOption: undefined,
      leatherOption: undefined,
    },
  });

  const items = form.watch("items");
  // Jos nahka on true näytä lisää uusi form lomake jolla kysytään mikä nahka kyseessä.
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selecterMaterialParams = data.items.join(",");
    const selectedWoodOption = data.woodOption; // Lisää tämä rivi
    const selectedLeatherOption = data.leatherOption; // Lisää tämä rivi
    console.log(selectedWoodOption); // Lisää tämä rivi
    console.log(selectedLeatherOption); // Lisää tämä rivi
    console.log(selecterMaterialParams); // Lisää tämä rivi

    // router.push(`/care/search?materials=${selecterMaterialParams}`);
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
                                onCheckedChange={(checked: boolean) => {
                                  const newValue = checked
                                    ? [...field.value, item.id]
                                    : field.value.filter(
                                        (value: string) => value !== item.id
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-base font-normal">
                              {label}
                            </FormLabel>
                            {(item.id === "wood" || item.id === "leather") && (
                              <FormField
                                control={form.control}
                                name={
                                  item.id === "wood"
                                    ? "woodOption"
                                    : "leatherOption"
                                }
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Type1">
                                        Option 1
                                      </SelectItem>
                                      <SelectItem value="Type2">
                                        Option 2
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            )}
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
