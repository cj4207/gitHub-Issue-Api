import { Octokit } from 'octokit';
import { Form, Button } from 'react-bootstrap';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { commentsState, issueDetailState } from '../state/recoil';

function NewComment() {
  const issueDetail = useRecoilValue(issueDetailState)
  const setComments = useSetRecoilState(commentsState)
  const octokit = new Octokit({
    auth: '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'
  })

  function handleSubmit(event) {
    event.preventDefault()
    octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
      owner: 'planetarium',
      repo: 'take-home-2022-cj4207',
      issue_number: issueDetail.number,
      body: event.target[0].value
    }).then(res=>{
      event.target[0].value = ''
      setComments(pre=>[...pre, res.data])
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>댓글 내용</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Button variant="primary" type="submit">
        댓글 등록 하기
      </Button>
    </Form>
  );
}

export default NewComment;