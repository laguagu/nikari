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
import { toast } from "@/components/ui/use-toast";
import { careInstructions, Material } from "@/lib/hoitoOhjeet";
import { useState } from "react";
import CareGuides from "./CareGuides";

export type MaterialInstructions = {
  material: Material;
  instructions: { "1": string; "2": string; "3": string } | undefined;
};

type CareInstructionsFormProps = {
  materials: { [key: string]: boolean } | null;
};

// const materials = {
//   wood: true,
//   metal: false,
//   leather: false,
//   laminate: true,
//   plastic: false,
//   fabric: false,
//   outdoorFurniture: false,
// };

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function CareInstructionsForm({
  materials,
}: CareInstructionsFormProps) {
  const [careGuides, setcareGuides] = useState<MaterialInstructions[]>([]);
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

  // Muuta server komponentiksi omaan kansioon
  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedMaterials = data.items as Material[];
    const selectedCareInstructions = selectedMaterials.map((material) => {
      return {
        material,
        instructions: careInstructions[material],
      };
    });
    console.log(selectedCareInstructions);
    setcareGuides(selectedCareInstructions);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex justify-center items-center">
      {!careGuides.length && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 align-middle p-4 rounded-lg border-2 shadow-xl"
          >
            <FormField
              control={form.control}
              name="items"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Found Materials</FormLabel>
                    <FormDescription>
                      Select the items you want to display in the sidebar.
                    </FormDescription>
                  </div>
                  {materialItems.map((item) => (
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
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
      {careGuides.length > 0 && <CareGuides careGuides={careGuides} />}
    </div>
  );
}
