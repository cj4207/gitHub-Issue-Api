import { Link, Route, Routes } from 'react-router-dom';
import EditIssue from './pages/editIssue';
import Issues from './pages/Issues';
import NewIssue from './pages/newIssue';

export default function Router() {
  return(
    <Routes>
      <Route path='/' element={<Issues/>} />
      <Route path='/issues/*' element={<Issues/>}>
        {/* <Route path=':id' element={<Issue/>} /> */}
        {/* <Route path='edit' element={<EditIssue/>}/> */}
      </Route>
      <Route path='/new' element={<NewIssue/>}/>
    </Routes>
  )
}