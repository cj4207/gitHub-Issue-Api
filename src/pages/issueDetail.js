import { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"
import Comments from "../components/comments"
import { commentsState, issueDetailState } from "../state/recoil"
import NewComment from "../components/newComment"
import { shared } from "../lib/shared"

export default function IssueDetail() {
  const [comments, setComments] = useRecoilState(commentsState)
  const issueDetail = useRecoilValue(issueDetailState)
  useEffect(()=>{
    const octokit = shared.octokit
    octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      owner: shared.owner,
      repo: shared.repo,
      issue_number: issueDetail.number
    }).then(res=>setComments(res.data))
  }, [])

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
        <Link to={`/edit/${issueDetail.number}`}>
          <Button variant="primary">수정 하기</Button>
        </Link>
      </Card>
      {comments && comments.map((el, idx)=>
        <Comments key={idx} comment={el}/>
      )}
      <NewComment/>
    </>
  )
}