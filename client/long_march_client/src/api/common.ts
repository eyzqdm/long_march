import { post} from '../utils/request'

export default class commonApi {
  static searchBlog(param:any) {
    return post('/api/search', param)
  }
}