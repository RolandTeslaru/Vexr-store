import React, { memo, useState } from 'react'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import styles from "./ProductOptions.module.scss"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { valueToPercent } from '@mui/base'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  
  const [value , setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent , newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={styles.optionsContainer}>
      {options.map((opt , i) => (
        <div key={opt.displayName}>
          {/* <div role="listbox" className="flex flex-row"> */}
              <>
              <h2 className="uppercase font-medium text-sm tracking-wide">
                    {opt.displayName}
                  </h2>

                {/* <FormControl>
                  <h2 className="uppercase font-medium text-sm tracking-wide">
                    {opt.displayName}
                  </h2>
                  
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    >
                    {opt.values.map((value , index:number) => (
                        <FormControlLabel 
                          value={value.label} 
                          control={<Radio/>} 
                          label={value.label} 
                          key={index}

                          onClick={() => {
                            // console.log(selectedOptions)
                            
                            setSelectedOptions((selectedOptions) => {
                              return {
                                ...selectedOptions,
                                [opt.displayName.toLowerCase()]: value.label.toLowerCase(),
                              }
                            })}}
                        />
                     ))}
                  </RadioGroup>
                </FormControl> */}
              </>
            
            {opt.values.map((v, i: number) => {
              const active = selectedOptions[opt.displayName.toLowerCase()]
              
                return (
                  
                  <Swatch
                    key={`${opt.id}-${i}`}
                    active={v.label.toLowerCase() === active}
                    variant={opt.displayName}
                    color={v.hexColors ? v.hexColors[0] : ''}
                    label={v.label}
                    onClick={() => {
                      setSelectedOptions((selectedOptions) => {
                        return {
                          ...selectedOptions,
                          [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                        }
                      })}}
                  />
              )
            })}
          </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
