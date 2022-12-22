import { Link, Route, Routes } from 'react-router-dom';
import EditIssue from './pages/editIssue';
import IssueDetail from './pages/issueDetail';
import Issues from './pages/Issues';
import NewIssue from './pages/newIssue';

export default function Router() {
  return(
    <Routes>
      <Route path='/' element={<Issues/>} />
      <Route path='/issues' element={<Issues/>}/>
      <Route path='/issues/:issueNumber' element={<IssueDetail/>}/>
      <Route path='/new' element={<NewIssue/>}/>
    </Routes>
  )
}