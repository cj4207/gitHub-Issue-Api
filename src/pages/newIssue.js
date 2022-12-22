import { Octokit } from 'octokit';
import { useState, useEffect } from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { modalContentState } from '../state/recoil';

export default function NewIssue() {

  const [body, setBody] = useState()
  const [labels, setLabels] = useState([])
  const setModalContent = useSetRecoilState(modalContentState)
  const octokit = new Octokit({
    auth: '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'
  })

  useEffect(()=>{
    octokit.request('GET /repos/{owner}/{repo}/labels', { owner: 'planetarium', repo: 'take-home-2022-cj4207'})
    .then(res=>{
      res.data.map(el=>{
        setLabels(pre=>[...pre, el.name])
      })
    })
  }, [])

  useEffect(()=>{
    if(body){
      octokit.request('POST /repos/{owner}/{repo}/issues', body)
      .then(res=>{
        document.querySelector('.modal').className += ' show'
        setModalContent({
          title: '이슈 등록 완료',
          body: `${body.owner}/${body.repo} 이슈 추가 등록 했습니다.`
        })
      })
    }
  }, [body])

  useEffect(()=>{
    console.log(labels,'labels')
  }, [labels])

  function handleSubmit(event){
    event.preventDefault()
    console.log(event.target[0].value)
    setBody({
      owner: 'planetarium',
      repo: 'take-home-2022-cj4207',
      title: event.target[0].value,
      body: event.target[1].value
    })
  }

  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>제목</Form.Label>
        <Form.Control type="title" placeholder="Enter title" />
      </Form.Group>

      <Form.Group>
        <Form.Label>내용</Form.Label>
        <Form.Control type="content" placeholder="constent" />
      </Form.Group>
      {/* <Form.Group>
        <Form.Label>레이블</Form.Label><br/>
        {labels.map((el, idx)=>
          <Form.Check key={idx} inline type='checkbox' label={el}/>
        )}
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}