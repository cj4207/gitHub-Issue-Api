import { atom } from "recoil";

export const modalContentState = atom({
  key: 'modalContentState',
  default: {}
})

export const issueDetailState = atom({
  key: 'issueDetailState',
  default: {}
})

export const commentsState = atom({
  key: 'commentsState',
  default: []
})

export const isCommentEditState = atom({
  key: 'isCommentEditState',
  default: []
})