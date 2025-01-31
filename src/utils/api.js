import axios, { Axios } from "axios";
import { readFile } from "react-native-fs";

import {
  suggestionsApiUrl, 
  roboflowDetectionApiUrl, 
  roboflowDetectionApiKey,
  webApiUrl
} from '../../app.json';
import RNFetchBlob from "rn-fetch-blob";

export const postDetect = async (snap, callback, onError) => {

  const image = await readFile(`file://${snap.path}`, {
    encoding: "base64"
  });

  const res = await axios({
    method: "POST",
    url: roboflowDetectionApiUrl,
    params: {
      api_key: roboflowDetectionApiKey
    },
    data: `data:image/png;base64,${image}`    
  })
  // console.log(res.data)
  if(res?.data) return res?.data

  return { predictions: [] }

    // axios({
    //   method: "POST",
    //   url: roboflowDetectionApiUrl,
    //   params: {
    //     api_key: roboflowDetectionApiKey
    //   },
    //   data: `data:image/png;base64,${image}`,
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   }
    // })
    // .then(function(response) {
    //   if(response.data){
    //     if(response.data?.predictions){
    //       callback(response?.data)
    //     }
    //   }
    // })
    // .catch(function(error) {
    //     console.log("Error: ", error.message);
    //     onError(error)
    // });
}

export const fetchWords = async (input) => {

  if(input == '') {
    return []
  }

  const response = await fetch(`${suggestionsApiUrl}?s=${input}&max=5`);
  const data = await response.json();
  const formatted = data.map((item, index) => {
    return {
      id: index,
      title: item.word
    }
  });
  return formatted
}

export const PostApiCall = async (url, payload) => {

  const res = await axios.postForm(webApiUrl + url, payload)
  if(res?.data) return res?.data

  return null
}

export const GetApiCall = async (url) => {
  const res = await axios.get(webApiUrl + url, {})
  if(res?.data) return res?.data

  return null
}

export const PostFormApiCallx = async (url, payload, files = []) => {
  var data = new FormData();

  files.forEach((file) => {
    data.append(file.name, file.data, "image.png");
  })
  
  Object.keys(payload).forEach((key) => {
    data.append(key, payload[key])
  })

  console.log("PAYLOAD: ", data)

  const res = await axios.post(webApiUrl + url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  console.log("RESULT: ", res?.data)
}

export const PostFormApiCall = async (url, payload, files = []) => {

  let body = []

  files.forEach((file) => {
    const {fileName, type, uri} = file.data
    body.push({name: file.name, filename: fileName, type: type, data: RNFetchBlob.wrap(uri) })
  })
  
  Object.keys(payload).forEach((key) => {
    body.push({name: key, data: payload[key]})
  })

  const result = await RNFetchBlob.fetch('POST', webApiUrl + url, {
    'Content-Type': 'multipart/form-data'
  }, body)

  console.log("REQUEST BODY", body)

  const resultData = result?.data
  return JSON.parse(resultData)
}