import { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { shared } from '../lib/shared';
import { commentsState, issueDetailState } from '../state/recoil';

function NewComment({comment}) {
  const issueDetail = useRecoilValue(issueDetailState)
  const textarea = useRef()
  const setComments = useSetRecoilState(commentsState)
  const octokit = shared.octokit
  useEffect(()=>{
    if(comment){
      textarea.current.value = comment.body
    }
  }, [])
  function handleSubmit(event) {
    event.preventDefault()
    if(comment){
      octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}', {
        owner: shared.owner,
        repo: shared.repo,
        comment_id: comment.id,
        body: event.target[0].value
      }).then(res=>{
        setComments(pre=>
          pre.map(el=>({
            ...el,
            body: el.id===res.data.id ? event.target[0].value : el.body,
            isEdit: el.id == comment.id ? false : false
          }))
        )
      })
    }
    else{
      octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
        owner: shared.owner,
        repo: shared.repo,
        issue_number: issueDetail.number,
        body: event.target[0].value
      }).then(res=>{
        event.target[0].value = ''
        setComments(pre=>[...pre, res.data])
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>댓글 내용</Form.Label>
        <Form.Control as="textarea" rows={3} ref={textarea}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        댓글 등록 하기
      </Button>
    </Form>
  );
}

export default NewComment;