import { Card } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { issueDetailState } from "../state/recoil"

export default function IssueDetail() {
  const issueDetail = useRecoilValue(issueDetailState)
  return (
    <>
      <Card>
        <Card.Header>{issueDetail.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <p>
              {issueDetail.body}
            </p>
            작성 - {issueDetail.user.login}
          </blockquote>
        </Card.Body>
      </Card>
    </>
  )
}