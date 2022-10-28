import React, { Component } from 'react'
import { Select, Spin } from 'antd';
const { Option } = Select;
class LoadProperty extends Component {
  render (){
    return (
      <Select
          showSearch={this.props.showSearch ? this.props.showSearch : false }
          mode={this.props.mode ? this.props.mode : false}
          style={{ width: 150 }}
          placeholder={this.props.placeholder}
          optionFilterProp="children"
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onSearch={this.props.onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
         {this.props.data.map(d => (<Option key={d.value}>{d.text}</Option>))}
        </Select>
    )
  }
  
}

export default LoadProperty;