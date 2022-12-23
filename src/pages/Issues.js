import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Issue from './Issue';
import './Issues.css'
import { shared } from '../lib/shared';
export default function Issues() {
  const [issues, setIssues] = useState()
  useEffect(()=>{
    const octokit = shared.octokit
    octokit.request('GET /repos/{owner}/{repo}/issues', { 
      owner: shared.owner,
      repo: shared.repo
    })
    .then(res=>{
      setIssues(res.data)
    })
  }, [])

  return(
    <>
      <Card>
        <Card.Header as="h5">Issues</Card.Header>
        <Card.Body>
          <Card.Title>{issues?.length ? '현재 등록된 이슈' : '현재 등록된 이슈가 없습니다.'}</Card.Title>
          {issues?.length ?
              <div className='issuesArea'>
              {issues.map((el, idx)=>
                <Issue key={idx} issueData={el} />
              )}
              </div>
            :
            <Link to='/new'>
              <Button variant="primary">이슈 등록하러 가기</Button>
            </Link>
            }
        </Card.Body>
      </Card>
    </>
    )
}