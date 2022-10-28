import React from 'react'
import * as CondtionalValues from '../ConditionValues'
const Where = (props) => {
  const options_values = []
  const options = CondtionalValues.WHERE_VALUES.map((val) => {
    options_values.push(<option key={val} value={val}>{val}</option>) 
  })
  return (

    <div>
    <p>where</p>
    <select>
      {options_values}
    </select>
    </div>
  )
}

export default Where;