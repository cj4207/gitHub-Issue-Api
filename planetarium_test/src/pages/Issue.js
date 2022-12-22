import { Badge, Card } from 'react-bootstrap';

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
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {body}
        </Card.Text>
        {labels.map((el, idx)=>
          <Badge key={idx} bg={badgeBg[el.name]}>{el.name}</Badge>
        )}
      </Card.Body>
    </Card>
  )
}