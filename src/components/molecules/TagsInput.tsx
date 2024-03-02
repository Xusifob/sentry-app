import React, { FC, KeyboardEvent } from "react";
import { Control, useController } from "react-hook-form";
import Input, { InputProps } from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

type TagsInputProps = InputProps & {
    control: Control;
    name: string;
}

const TagsInput: FC<TagsInputProps> = ({ control, name, ...rest }) => {

  const { field: { value, name: fieldName, onChange } } = useController({
    name,
    control,
  });


  const removeTag = (tag : string) => {
    onChange(value.filter((t : string) => t !== tag));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {

    const inputValue = e.currentTarget.value;

    if (e.key !== 'Enter' && e.key !== ',') {
      return;
    }

    e.preventDefault();

    if(!inputValue) {
      return;
    }

    if(!value) {
      onChange([inputValue]);
      e.currentTarget.value = '';
      return;
    }
    onChange([...value, inputValue]);
    e.currentTarget.value = '';

  };


  return (
    <div >
      <Input
        {...rest}
        name={fieldName}
        onKeyDown={onKeyDown}
      />
      <div className='mt-2 flex flex-wrap gap-2' >
        {value?.map((tag : string, index : number) => (
          <span className='flex flex-row items-center gap-2 rounded-md border border-gray-700 p-2 text-sm' key={index}>
            <span>{tag}</span>
            <Button
              onClick={() => removeTag(tag)}
              color='transparent' icon='close' />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;