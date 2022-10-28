import React from 'react';
import ReactDOM from 'react-dom'
// import KPIBuilder from './containers/KPIBuilder/KPIBuilder'
import EventDefination from './components/Dashboard/Events/EventDefination/EventDefination'
// import Visitors from './containers/Visitors/Visitors'
import {Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faChartBar, faUser, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Layout from './components/Layout/Layout'
import AnalyzeEvents from './components/Dashboard/Events/EventDefination/AnalyzeEvents/AnalyzeEvents';
import ChartWrapper from './components/Graph/Demo'
library.add(fab, faCheckSquare, faCoffee, faChartBar, faUser, faTrashAlt)
// import Visitors from './containers/Visitors/Visitors'

class App extends React.Component {
  render(){
    return (
      <div>
        <Route path="/events" component={EventDefination} />
        <Route path="/visitors" component={AnalyzeEvents} />
        <Route path="/visual" component={ChartWrapper} />
        {/* <Route path="/" exact component={Layout} /> */}
      </div>
    );
  }
}

export default App