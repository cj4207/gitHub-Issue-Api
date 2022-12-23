import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

export default function Comments({comment}) {
  return (
    <>
      <Card>
        <Card.Header>댓글</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {comment?.body}
            </p>
            작성 - {comment?.user.login}
          </blockquote>
        </Card.Body>
        {/* <Button variant="primary">삭데 하기</Button> */}
      </Card>
    </>
  )
}