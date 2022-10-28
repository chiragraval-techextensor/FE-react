import React, {Component} from 'react'
import { Row, Input } from 'antd';
import './SearchSection.css';
const { Search } = Input;
class SearchSection extends Component {
  state = {}
  render(){
    return (<div>
     <Row>
      <Search className="TopBarSearch"
        placeholder="input search text"
        onSearch={value => console.log(value)}
      />
    </Row>
    
    </div>);
  }
}

export default SearchSection;