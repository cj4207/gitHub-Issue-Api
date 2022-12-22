import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Octokit } from 'octokit';
import { Link } from 'react-router-dom';
import Issue from './Issue';
import './Issues.css'
export default function Issues() {
  const [issues, setIssues] = useState()
  useEffect(()=>{
    const octokit = new Octokit({
      auth: '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'
    })
    octokit.request('GET /repos/{owner}/{repo}/issues', { owner: 'planetarium', repo: 'take-home-2022-cj4207'})
    .then(res=>{
      console.log(res.data, 'res.datares.data')
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