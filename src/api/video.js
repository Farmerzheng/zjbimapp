import axios from "axios"

const cameraUrl = 'https://open.ys7.com/api/lapp/camera/list'
const liveUrl = 'https://open.ys7.com/api/lapp/v2/live/address/get'
// const token = 'at.aniydo3r1xq7z0qw2zlk0bf15f9ms23j-6m2gzz9ztv-0yoaray-rgxucpkev'


export function getVideoUrl (token, url) {
  return `https://open.ys7.com/ezopen/h5/iframe_se?url=${url}&autoplay=1&audio=1&accessToken=${token}&templete=2`;
}

export function getCameraList (token) {
  return axios({
    url: cameraUrl,
    method: 'post',
    params: {
      accessToken: token,
      pageStart: 0,
      pageSize: 50
    }
  })
}
export function getLiveUrl (token, deviceSerial, channelNo) {
  return axios({
    url: liveUrl,
    method: 'post',
    params: {
      accessToken: token,
      deviceSerial: deviceSerial,
      channelNo: channelNo
    }
  })
}
