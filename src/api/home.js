// import request from '@/utils/request'
import req from '@/utils/jsonApi'
export const getHomeData = () => {
  return req.get('/pageDetail', {
    params: {
      pageId: 0
    }
  })
}
