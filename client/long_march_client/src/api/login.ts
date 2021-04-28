import { userMsg } from 'type/login.ts'
import { post} from '../utils/request'

export default class LoginApi {
  static login (param:userMsg) {
    return post('/api/user/login', param)
  }
  static isExist (param:string) {
    return post('/api/user/isExist', param)
  }
  static Register (param:string) {
    return post('/api/user/register', param)
  }
  static getUserInfo (param:string) {
    return post('/api/user/getUserInfo', param)
  }
}