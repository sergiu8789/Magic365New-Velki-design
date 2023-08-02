import React,{useState,useEffect} from 'react';
import { useMatch } from '../../context/MatchContextProvider';
import { socket } from '../../services/socket';
import { useOdd } from '../../context/OddsContextProvider';

export const SocketRoutes = ({element}) => {
    
    const matchData = useMatch();
    const oddsData = useOdd();
    const [fooEvents, setFooEvents] = useState([]);
  
    useEffect(() => {
        socket.connect();
      return () => {
        socket.disconnect();
      };
    }, []);
  
    useEffect(() => {
      if(matchData?.matchData?.matchIds?.length){
        socket.emit("subscription",matchData.matchData.matchIds);
      }
    },[matchData.matchData.matchIds]);
  
    useEffect(() => {
      function onBroadCast(value) {
       if(value.length)
       {
          value.map((item) => {
            if(matchData.matchData.matchOdds.findIndex((val) => val.MarketId === item.MarketId)!==-1)
            matchData.matchData.matchOdds[matchData.matchData.matchOdds.findIndex((val) => val.MarketId === item.MarketId)] = item;
             else
             matchData.matchData.matchOdds.push(item)
          });
          matchData.setMatchData({...matchData.matchData, matchOdds: matchData.matchData.matchOdds});
        }
      }
      socket.on('broadcast', onBroadCast);
      return () => {
        socket.off('broadcast', onBroadCast);
      };
    }, [fooEvents]);

   useEffect(() =>{
     const timer = setTimeout(() => {
      oddsData.setOddsData({fetchOdd : !oddsData.oddsData.fetchOdd})
          },300);
     return () => clearTimeout(timer);
   },[oddsData.oddsData.fetchOdd]);

    return element;

}
