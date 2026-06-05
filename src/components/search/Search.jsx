import React, { useState } from 'react'
import closeIcon from '/public/img/searchclose.png'
import searchIcon from '/public/img/search.svg'
import'./search.scss'
import { useProduct } from '../../store/useProduct'


const Search = () => {
    const {setSearchValue}=useProduct()
    const [value, setValue] = useState('')

    const submit = (event)=>{
      event.preventDefault()
      setSearchValue(value)
    }

    const clearSearch = () => {
      setValue('')
      setSearchValue('')
    }

  return (
    <>
      <form className="form" onSubmit={(event)=>submit(event)}>
        <div className="form__box">
           <input type="text" className="form__box-input" placeholder='Введите...' value={value} onChange={(event)=>setValue(event.target.value)}/>
           <img src={closeIcon} alt="" className="form__box-icon" onClick={clearSearch} />
        </div>
        <button className="form__box-btn">
            <img src={searchIcon} alt="" />
        </button>
      </form>
    </>
  )
}

export default Search