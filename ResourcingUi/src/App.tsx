import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import PageContainer from './containers/PageContainer/PageContainer'
import JobsPage from './pages/JobsPage/JobsPage'
import PageWrapper from './wrappers/PageWrapper/PageWrapper'
import PeoplePage from './pages/PeoplePage/PeoplePage'
import DashboardPage from './pages/DashboardPage/DashboardPage'

function App() {
  return (
    <>
      <PageContainer>
        <BrowserRouter>

          <LeftSideBar/>

            <Routes>
              <Route 
                path='/' 
                element={<PageWrapper><DashboardPage/></PageWrapper>}
              />
                <Route 
                  path='/jobs' 
                  element={<PageWrapper><JobsPage/></PageWrapper>}
                />
                <Route 
                  path='/people' 
                  element={<PageWrapper><PeoplePage/></PageWrapper>}
                />
            </Routes>

        </BrowserRouter>
      </PageContainer>
    </>
  )
}

export default App
