import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Issue from './Issue';
import './Issues.css'
import { shared } from '../lib/shared';
import { useRecoilState } from 'recoil';
import { modalContentState } from '../state/recoil';
let getRepoIssuesTimeout
let prevRepoIssuesCounts
export default function Issues() {
  const [issues, setIssues] = useState()
  const [modal, setModalContent] = useRecoilState(modalContentState)
  const octokit = shared.octokit

  function getRepoIssues(){
    octokit.request('GET /repos/{owner}/{repo}/issues', { 
      owner: shared.owner,
      repo: shared.repo
    })
    .then(res=>{
      console.log('반응이 너무 느린데',prevRepoIssuesCounts, res.data.length)
      if(prevRepoIssuesCounts && prevRepoIssuesCounts !== res.data.length){
        console.log('들어온겨?')
        document.querySelector('.modal').className += ' show'
        setModalContent({
          title: '이슈 변경 감지',
          body: '이슈 변경이 감지 되었습니다. 확인해 보세요'
        })
      }
      setIssues(res.data)
      prevRepoIssuesCounts = res.data.length
      clearTimeout(getRepoIssuesTimeout)
      getRepoIssuesTimeout = setTimeout(getRepoIssues, 2000)
    })
  }

  useEffect(()=>{
    getRepoIssues()
  }, [])
  
  return(
    <>
    {issues&&
      <div className='issuesArea'>
        <Card>
          <Card.Header as="h5">Issues</Card.Header>
          <Card.Body>
            <Card.Title>{issues.length ? '현재 등록된 이슈가 없습니다.' : '현재 등록된 이슈' }</Card.Title>
              {issues.length ?
                issues.map((el, idx)=>
                  <Issue key={idx} issueData={el} />
                )
              :
              <Link to='/new'>
                <Button variant="primary">이슈 등록하러 가기</Button>
              </Link>
              }
          </Card.Body>
        </Card>
      </div>
      }
    </>
    )
}