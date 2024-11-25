import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircleMinus, CirclePlus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

type SkillsFormProps = {
  type: "teach" | "learn";
};

export function SkillsForm(props: SkillsFormProps) {
  const { type } = props;

  const form = useFormContext();

  const skillsFieldArray = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const handleAddSkill = () => {
    skillsFieldArray.append({
      category: "",
      skill: "",
    });
  };

  const handleRemoveSkill = (index: number) => {
    skillsFieldArray.remove(index);
  };

  return (
    <div>
      <h5>What skills would you like to {type}?</h5>
      <div className="space-y-4">
        <div className={"space-y-2"}>
          {skillsFieldArray.fields.map((item, index) => (
            <fieldset className={"flex items-end gap-4"} key={item.id}>
              <FormField
                control={form.control}
                name={`skills.${index}.category`}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className={"text-base"}>Category</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={field.disabled}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* TODO: Use categories from database */}
                        <SelectItem value="languages">Languages</SelectItem>
                        <SelectItem value="artsAndHumanities">
                          Arts & Humanities
                        </SelectItem>
                        <SelectItem value="businessAndMarketing">
                          Business & Marketing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`skills.${index}.skill`}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className={"text-base"}>Skill</FormLabel>
                    <Select
                      defaultValue={field.value}
                      disabled={field.disabled}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Skill" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="economics">Economics</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {skillsFieldArray.fields.length > 1 && (
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => handleRemoveSkill(index)}
                >
                  <CircleMinus />
                </Button>
              )}
            </fieldset>
          ))}
          <Button size={"sm"} type={"button"} onClick={handleAddSkill}>
            <CirclePlus />
            Add skill
          </Button>
        </div>
        <FormField
          control={form.control}
          name="profileDescription"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel className={"text-base"}>Profile description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself, this information will be public in your profile."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
