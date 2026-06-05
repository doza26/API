import React from 'react'
import Select from 'react-select'
import { useProduct } from '../../store/useProduct'

const options = [
    { value: '', label: 'Стандартная сортировка' },
    { value: 'title', label: 'По названию' },
    { value: 'price', label: 'По цене' },
    { value: 'stock', label: 'По количеству' }
  ]

const Sort = () => {
    const{setSortValue}=useProduct()

      const customStyles = {
        control: (provided, state) => ({
          ...provided,
          width: '220px',
          minHeight: '40px',
          height: '40px',
          border: state.isFocused ? '1px solid #3498db' : '1px solid #efefef',
          borderRadius: '10px',
          background: '#ffffff',
          fontSize: '14px',
          fontWeight: '400',
          boxShadow: 'none',
          padding: '0px 8px',
          cursor: 'pointer',
          '&:hover': {
            borderColor: '#3498db'
          }
        }),
        placeholder: (provided) => ({
          ...provided,
          fontFamily: 'Arimo',
          fontWeight: '400',
          fontSize: '14px',
          color: '#9aa0b4',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#9aa0b4',
          fontSize: '14px',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? '#3498db'
            : state.isFocused
              ? '#ebf5fb'
              : '#ffffff',
          color: state.isSelected ? 'white' : '#9aa0b4',
          cursor: 'pointer',
          ':active': {
            backgroundColor: '#3498db',
          }
        }),
        indicatorSeparator: () => ({
          display: 'none'
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: '#9aa0b4',
          padding: '4px',
          '&:hover': {
            color: '#3498db'
          }
        }),
      };

      const changeOption = (option) => {
        setSortValue(option.value)
      }
  return (
    <>
     <Select
     onChange={changeOption}
     options={options}
     placeholder='Сортировать по'
     styles={customStyles}
     isClearable={false}
      />

    </>
  )
}

export default Sort