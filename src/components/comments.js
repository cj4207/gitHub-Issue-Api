import { Button, Card } from "react-bootstrap"
import NewComment from "./newComment"
import './comments.css'
import { useRecoilState } from "recoil"
import { commentsState, isCommentEditState } from "../state/recoil"
import { shared } from "../lib/shared"

export default function Comments({comment}) {
  const [comments, setComments] = useRecoilState(commentsState)
  const octokit = shared.octokit

  function deleteCommnet(event){
    octokit.request('DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}', {
      owner: shared.owner,
      repo: shared.repo,
      comment_id: comment.id
    }).then(res=>{
      setComments(pre=>
        pre.filter(el=>el.id !== comment.id)
      )
    })
  }
  function editCommnet(event){
    setComments(pre=>
      pre.map(el=>({
        ...el,
        isEdit: el.id == comment.id ? true : false
      }))
    )
  }

  return (
    <>
    {comment.isEdit ?
      <NewComment comment={comment}></NewComment>
      :
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
          <div className="commentButtom">
            <Button style={{marginRight: '5px'}} variant="warning" onClick={deleteCommnet}>삭제 하기</Button>
            <Button variant="primary" onClick={editCommnet}>수정 하기</Button>
          </div>
        </Card>
      }
    </>
  )
}