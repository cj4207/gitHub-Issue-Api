import { useEffect } from 'react';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { issueDetailState } from '../state/recoil';
import './Issue.css'
export default function Issue({issueData}) {
  const [issueDetail, setIssueDetail] = useRecoilState(issueDetailState)
  const navigate = useNavigate()
  const badgeBg = {
    'documentation': 'primary',
    'duplicate': 'secondary',
    'good first issue': 'success',
    'bug' : 'danger',
    'invalid': 'warning',
    'question': 'info',
    'help wanted': 'light',
    'enhancement': 'dark'
  }
  
  function handleIssueClick(){
    setIssueDetail(issueData)
    navigate(`/issues/${issueData.number}`)
  }

  return (
    <div className='issueArea' onClick={handleIssueClick}>
      <Card style={{ width: '100%' , display: 'inline-block', height: '15rem'}}>
        <Card.Body>
          <div className='commentsBadge'>
            <Badge bg='primary'>{`댓글 : ${issueData.comments}`}</Badge>
          </div>
          <Card.Title>{issueData.title}</Card.Title>
          <div className='issueTextArea'>
            <Card.Text>
              {issueData.body}
            </Card.Text>
          </div>
          <div className='issueBadgeArea'>
            {issueData.labels?.map((el, idx)=>
              <Badge key={idx} bg={badgeBg[el.name]}>{el.name}</Badge>
              )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}