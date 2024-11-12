import axios from "axios";
import { readFile } from "react-native-fs";

import {suggestionsApiUrl, roboflowDetectionApiUrl, roboflowDetectionApiKey} from '../../app.json';

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