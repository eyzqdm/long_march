import { userMsg } from 'type/login.ts'
import { post} from '../utils/request'

export default class Api {
  static login (param:userMsg) {
    return post('http://localhost:3000/login', param)
  }
}