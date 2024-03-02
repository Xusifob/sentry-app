import React, { ReactNode, useCallback, useEffect } from "react";
import { Control, FieldValues, useFieldArray, UseFormRegister } from "react-hook-form";
import cls from "classnames";
import Button from "@/components/atoms/Button";

export type rowValueType = { [key: string]: string | undefined };

export type valueType = rowValueType[] | undefined;

type onChangeValueType = (value: rowValueType[] | undefined) => valueType;


export type RenderRowProps<T extends FieldValues> = {
    control: Control<T>,
    name: string,
    index: number,
    loading?: boolean,
    register: UseFormRegister<T>,
};

export type RenderRowType<T extends FieldValues> = (props: RenderRowProps<T>) => ReactNode;

export type RepeaterFieldProps<T extends FieldValues> = {
    label?: string;
    button?: string,
    error?: string
    allowEmpty?: boolean,
    loading?: boolean,
    renderRow: RenderRowType<T>;
    className?: string,
    onChange?: (value: valueType | onChangeValueType) => void
    register: UseFormRegister<T>,
    control: Control<T>,
    name: string,
}


const RepeaterField = <T extends object = FieldValues>
  ({
    allowEmpty,
    renderRow,
    name,
    button,
    control,
    loading,
    register
  }: RepeaterFieldProps<T>) => {
 

  const { fields, append, remove } = useFieldArray({
    control,
    name: name as string,
  });


  const addItem = useCallback(() => {
    append({} as rowValueType);
  }, [append]);

  const deleteItem = useCallback((index: number) => {
    remove(index);
  }, [remove]);

  useEffect(() => {

    if (fields.length === 0 && !allowEmpty) {
      addItem();
    }

  }, [addItem, allowEmpty, fields]);


  return (
    <div>
      <div className='mb-4 flex flex-col gap-4'>
        {fields.map((field, index: number) =>
          (<div key={name + '-' + (field.id ?? index)}>
            <div className='flex grow flex-row gap-4'>

              {renderRow({
                loading,
                control,
                name,
                index,
                register,
              })
              }

              {button && (<Button color='transparent' icon='close'
                data-testid='remove' className='cursor-pointer'
                onClick={() => deleteItem(index)} />)}
            </div>
          </div>)
        )}
      </div>
      {button && (<Button type='button'
        loading={loading}
        onClick={addItem}
        outline={true}
        className={cls('self-end', loading ? 'w-32' : '')}>{button}</Button>)}
    </div>
  )
  ;

};

export default RepeaterField;
