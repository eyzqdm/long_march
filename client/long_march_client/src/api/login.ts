import { userMsg } from 'type/login.ts'
import { post} from '../utils/request'

export default class Api {
  static login (param:userMsg) {
    return post('auth/login', param)
  }
}