import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, FormField, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps{}


const TextAreaInput: React.FC<IProps> = ({input, width, rows, placeholder, meta: {touched, error}}) => {
    return (
        <FormField error={touched && !!error}  width={width}>
            <textarea {...input} placeholder={placeholder} rows={rows}/>
            {touched && error && (
                <Label basic color='red' style={{float: 'left'}}>
                    {error}
                </Label>
            )}
        </FormField>
    )
}

export default TextAreaInput