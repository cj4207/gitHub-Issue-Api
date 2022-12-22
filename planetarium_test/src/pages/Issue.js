import { Badge, Card } from 'react-bootstrap';
import './Issue.css'
export default function Issue(props) {
  const {title, body, labels} = props
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
  return (
    <Card style={{ width: '18rem' , display: 'inline-block', height: '15rem'}}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className='issueTextArea'>
          <Card.Text>
            {body}
          </Card.Text>
        </div>
        <div className='issueBadgeArea'>
          {labels.map((el, idx)=>
            <Badge key={idx} bg={badgeBg[el.name]}>{el.name}</Badge>
            )}
        </div>
      </Card.Body>
    </Card>
  )
}