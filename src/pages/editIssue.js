import { useState, useEffect, useRef } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { shared } from '../lib/shared';
import { issueDetailState, modalContentState } from '../state/recoil';

export default function NewIssue() {

  const [issueDetail, setIssueDetail] = useRecoilState(issueDetailState)
  const [body, setBody] = useState()
  const [labels, setLabels] = useState([])
  const setModalContent = useSetRecoilState(modalContentState)
  const checkBox = useRef([])
  const octokit = shared.octokit
  useEffect(()=>{
    octokit.request('GET /repos/{owner}/{repo}/labels', { 
      owner: shared.owner,
      repo: shared.repo
    })
    .then(res=>{
      res.data.map(el=>{
        setLabels(pre=>[...pre, el.name])
      })
    })
  }, [])

  useEffect(()=>{
    let url
    let modalContent
    if(body){
      if(!issueDetail.title){
        url = 'POST /repos/{owner}/{repo}/issues'
        modalContent = {
          title: '이슈 등록 완료',
          body: `${body.owner}/${body.repo} 이슈 추가 등록 했습니다.`
        }
      }else {
        url = 'PATCH /repos/{owner}/{repo}/issues/{issue_number}'
        modalContent = {
          title: '이슈 등록 완료',
          body: `${body.owner}/${body.repo}/${issueDetail.number} 이슈가 수정 완료 했습니다.`
        }
      }
      octokit.request(url, body)
      .then(res=>{
        setIssueDetail(pre =>({
          ...pre,
          title: res.title,
          body: res.body,
        }))
        document.querySelector('.modal').className += ' show'
        setModalContent(modalContent)
      })
    }
  }, [body])

  function handleSubmit(event){
    event.preventDefault()
    const labels = []
    checkBox.current.map(el=>{
      if(el.checked){
        labels.push(el.parentNode.lastChild.innerText)
      }
    })
    
    setBody({
      owner: shared.owner,
      repo: shared.repo,
      title: event.target[0].value,
      body: event.target[1].value,
      issue_number: issueDetail.number ? issueDetail.number : '',
      labels
    })
  }

  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>제목</Form.Label>
        <Form.Control type="title" placeholder={(issueDetail.title ? issueDetail.title : 'Enter Title')} />
      </Form.Group>

      <Form.Group>
        <Form.Label>내용</Form.Label>
        <Form.Control type="content" placeholder={(issueDetail.body ? issueDetail.body : "Enter Content")} />
      </Form.Group>
      <Form.Group>
        <Form.Label>라벨</Form.Label><br/>
        {labels.map((el, idx)=>
          <Form.Check key={idx} inline type='checkbox' label={el} ref={(e)=>checkBox.current.push(e)}/>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        {issueDetail.title ? '수정 하기' : '등록 하기'}
      </Button>
    </Form>
  )
}