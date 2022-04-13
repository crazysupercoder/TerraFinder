import ContractPage from 'pages/ContractPage'
import Landing from 'pages/Landing'
import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css"
// import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';

// const theme = unstable_createMuiStrictModeTheme();

const App = () => {
  const [contractPage, setContractPage] = useState(false)
  const [contract, setContract] = useState<{tokenAddr: string, net: string, currency: string}>({} as any)

  const search=(tokenAddr: string, net: string, currency: string) => {
    setContractPage(true)
    setContract({tokenAddr, net, currency})
  }

  return (
    <Router>
      <Switch>
          <Route exact path='/'>
          {!contractPage ? 
            <Landing onSearch={search} />
            :
            <ContractPage {...contract} />}
          </Route>
      </Switch>
    </Router>
  )
}

export default App