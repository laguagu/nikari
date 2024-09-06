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
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

const FormSchema = z
  .object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    woodOption: z.string().optional(),
    leatherOption: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.items.includes("wood") && !data.woodOption) {
      ctx.addIssue({
        path: ["woodOption"],
        message: "You must select a wood option.",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.items.includes("leather") && !data.leatherOption) {
      ctx.addIssue({
        path: ["leatherOption"],
        message: "You must select a leather option.",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export default function CareInstructionsForm({
  materials,
}: CareInstructionsFormProps) {
  const router = useRouter();
  const [clickedOk, setClickedOk] = useState(false);
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

  // Näytä Sonner/Toast kun komponentti vain kerran kun se renderöidään
  const toastDisplayed = useRef(false);
  useEffect(() => {
    if (!toastDisplayed.current) {
      toast.info("Notification", {
        description:
          "Please ensure that the materials suggested by the AI are correct. If you are unsure, please contact sales@nikari.fi",
        duration: Infinity,
        action: {
          label: "OK",
          onClick: () => setClickedOk(true),
        },
      });
      toastDisplayed.current = true;
    }
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const selectedWoodOption = data.woodOption;
    const selectedLeatherOption = data.leatherOption;
    const selectedCheckboxOptions = data.items.filter(
      (item) => item !== "wood" && item !== "leather",
    );

    const allSelectedOptions = [
      ...selectedCheckboxOptions,
      selectedWoodOption,
      selectedLeatherOption,
    ]
      .filter(Boolean)
      .join(",");

    router.push(`/care/search?materials=${allSelectedOptions}`);
  }

  const { watch, setValue } = form;
  const items = watch("items");

  // Jos outdoori on true näytä vain outdoor hoito-ohjeet
  // Vaihad outdoor nimekssi outdoor furniture
  return (
    <div className="flex justify-center items-center">
      {/* {
        toast("Warning", {
          description:
            "Please note that only specific care instructions apply to outdoor furnitures. Do not apply other selected care instructions.",
          duration: 10000,
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      } */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 align-middle p-4 mb-2 mt-1 rounded-lg border-2 shadow-xl bg-zinc-50 min-w-[339px] sm:min-w-[375px]"
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
                  // if (label === "Outdoor") {
                  //   label = "Outdoor furniture";
                  // }

                  return (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center justify-between space-x-3"
                          >
                            <div className="flex flex-row items-center space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked: boolean) => {
                                    const newValue = checked
                                      ? [...field.value, item.id]
                                      : field.value.filter(
                                          (value: string) => value !== item.id,
                                        );
                                    setValue("items", newValue);

                                    if (checked) {
                                      toast.info(`${label} Selected`, {
                                        description: `Please note that only specific care instructions apply to ${label}. Do not apply other selected care instructions.`,
                                        duration: 10000,

                                        action: {
                                          label: "OK",
                                          onClick: () => console.log("Undo"),
                                        },
                                      });
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-base font-normal">
                                {label}
                              </FormLabel>
                            </div>
                            {(item.id === "wood" || item.id === "leather") &&
                              items.includes(item.id) && (
                                <FormField
                                  control={form.control}
                                  name={
                                    item.id === "wood"
                                      ? "woodOption"
                                      : "leatherOption"
                                  }
                                  render={({ field, fieldState }) => (
                                    <div>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="justify-end">
                                            <SelectValue placeholder="Select material type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {item.id === "wood" ? (
                                            <>
                                              <SelectItem value="wood">
                                                Oiled
                                              </SelectItem>
                                              <SelectItem value="lacqueredWood">
                                                Lacquered
                                              </SelectItem>
                                              <SelectItem value="outdoor">
                                                Outdoor furniture
                                              </SelectItem>
                                              <SelectItem value="sauna">
                                                Sauna furniture
                                              </SelectItem>
                                            </>
                                          ) : (
                                            <>
                                              <SelectItem value="leather">
                                                Normal
                                              </SelectItem>
                                              <SelectItem value="vegetableTannedLeather">
                                                Vegetable Tanned
                                              </SelectItem>
                                            </>
                                          )}
                                        </SelectContent>
                                      </Select>
                                      {fieldState.error && (
                                        <FormMessage>
                                          {fieldState.error.message}
                                        </FormMessage>
                                      )}
                                    </div>
                                  )}
                                />
                              )}
                          </FormItem>
                        );
                      }}
                    />
                  );
                })}
                <FormMessage>
                  {form.formState.errors.items?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!clickedOk}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
