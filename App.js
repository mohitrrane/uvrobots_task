import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import axios from 'axios'

import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview"

import VideoViewComponent from './src/components/VideoViewComponent'

const ViewTypes = {
  VIDEO: 1
}

export default function App() {
  let {height, width} = Dimensions.get('window');

  let dataProvider = new DataProvider((r1, r2)=>{
    return r1 !== r2;
  })

  const _layoutProvider = new LayoutProvider(
    (index)=>{
      return ViewTypes.VIDEO;
    },
    (type, dim)=>{
      switch (type){
        case ViewTypes.VIDEO:
          dim.width = width;
          dim.height = height/4
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  
  const [page, setPage] = useState(0)
  const [videos, setVideos] = useState([
    {
        "playbackUrl": "https://stream.mux.com/bCaQdAF1wKTzEFgcIVMWIC36nfEDl4cIbvwkMZPKvaE.m3u8"
    },
    {
        "playbackUrl": "https://stream.mux.com/D3g6GK02sh01fyuoazi6ftI7CdPkK02n7stUfWClNjKVfM.m3u8"
    },
    {
        "playbackUrl": "https://stream.mux.com/HyloXFjAl01u33LRnHS66AFNkeKkeDBfurvCuuWY5400U.m3u8"
    },
    {
        "playbackUrl": "https://stream.mux.com/Blq00Hv2nr9yzc02TyE3QEqgdC5j4gulOiWoIlln3JQZw.m3u8"
    },
    {
        "playbackUrl": "https://stream.mux.com/zrNU8100F9EYjLNtQSGyVDHQjoFn5X5nQ4AyEARa3ISE.m3u8"
    },
    {
        "playbackUrl": "https://stream.mux.com/QZunFndAWGIM5L5onWL01SSfjTBRGCcKn4Jqa5YVmQjY.m3u8"
    }
])
  
  useEffect(()=>{
    async function fetchData(){

      const params = JSON.stringify({
        "page": page
      });

      const result = await axios.post(
        'https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed', 
        params,
        {
          "headers": {
            "content-type": "application/json",
          },
        }
      );
      let vids = [...videos, ...result.data]
      setVideos(vids)
    };
    fetchData()    
  }, [page])

  const [state, setState] = useState({ dataProvider: dataProvider.cloneWithRows(videos)})

  useEffect(()=>{
    setState({ dataProvider: dataProvider.cloneWithRows(videos)})
  }, [videos])

  const _rowRenderer = (type, data)=>{
    switch(type){
      case ViewTypes.VIDEO:
        return(
          <VideoViewComponent
            name={data.playbackUrl}
          />
        )        
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{height: 20}}/>
      <RecyclerListView
              layoutProvider={_layoutProvider}
              dataProvider={state.dataProvider}
              rowRenderer={_rowRenderer}
              onEndReached={()=>{
                setPage(page+1)
                console.log(page)
              }}
      />
    </View>  
    )
}