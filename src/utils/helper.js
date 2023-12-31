const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


export const changeDateFormat = (date) => {
  const newDate = new Date(date);
  // return monthNames[newDate.getMonth()]+' '+newDate.getDate()+' '+newDate.getFullYear();
  return monthNames[newDate.getMonth()]+' '+newDate.getDate();
}

export const matchDate = (date) => {
    const newDate = new Date(date);  
    return monthNames[newDate.getMonth()]+' '+newDate.getDate();
}

 export const formatTime = (date) =>  {
  const newDate = new Date(date);
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  export const matchDateOption  = (date,inplay=false) => {
    if(inplay)
     return "In-Play";
    const newDate = new Date(date);
    const month = newDate.getMonth();
    const newdate = newDate.getDate();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

    const nowDate = new Date();
    const nowMonth = nowDate.getMonth();
    const nowdate = nowDate.getDate();
    const nowHours = nowDate.getHours();
    const nowTime = nowDate.getMinutes();
    if((month===nowMonth && newdate===nowdate) || (month < nowMonth) || (month === nowMonth && newdate < nowdate)){
      if((nowHours===hours && minutes > nowTime && newdate===nowdate) || (nowHours+1===hours &&  nowTime > minutes && newdate===nowdate))
       return "Starting";
      else if((month < nowMonth) || (newdate < nowdate) || (nowHours > hours) || (nowHours===hours && minutes <= nowTime)){
        return "In-Play"
      }
      else  
       return "Today"; 
    }
    else 
      return matchDate(date);
  }

  export const matchTimeOption = (date,inplay=false) => {
    if(inplay)
     return "";
    const newDate = new Date(date);
    const month = newDate.getMonth();
    const newdate = newDate.getDate();
    const minutes = newDate.getMinutes();
    const hours = newDate.getHours();

    const nowDate = new Date();
    const nowMonth = nowDate.getMonth();
    const nowdate = nowDate.getDate();
    const nowHours = nowDate.getHours();
    const nowTime = nowDate.getMinutes();
    if((month===nowMonth && newdate===nowdate) || (month < nowMonth) || (month === nowMonth && newdate < nowdate)){
      if(((nowHours===hours && minutes >= nowTime) || (nowHours+1===hours &&  nowTime >= minutes)) && newdate===nowdate)
      {
        if(nowHours===hours && minutes >= nowTime)
         return "in "+(minutes - nowTime)+"'";
        else
          return "in "+ (60 - nowTime + minutes)+"'"
      }    
      else if((nowHours > hours) || (nowHours===hours && minutes <  nowTime) || (month < nowMonth) || (newdate < nowdate))
        return ""
      else  
       return formatTime(date); 
    }
    else 
      return formatTime(date);
  }

  export const todayTime = (date) => {
    const newDate = new Date(date);
    const nowDate = new Date();
    const nowHours = nowDate.getHours();
    const nowTime = nowDate.getMinutes();
    const time = newDate.getMinutes();
    const hours = newDate.getHours();
    let result = '';
    if(nowHours===hours){
      result = time - nowTime ;
     return 'in '+result+"'";
    }
    else
      return formatTime(date);
  }

  export const getFristLetters = (string) => {
    var acronym = '';
    if (string?.split(' ').length > 1) {
      var matches = string?.match(/\b(\w)/g);
      acronym = matches?.join('');
    }
    else {
      acronym = string?.slice(0, 3);
    }
    return acronym
  }

  export const getConcatValues = (value) => {
    let list = [];
      value.map((item) => {
        if(item[0] < 3){
           list[item[0]]=item[1];
        }
        return item;
      });
    return list.join(',');
  }

  export const getSocketConcatOdds = (value) => {
     let list = [];
     value?.map((item) => {
      if(item.price!==null)
        list.push(item.price)
      return item;  
     });
     return list.join(',');
  }

  export const getSocketConcatSize = (value) => {
    let list = [];
    value?.map((item) => {
     if(item.size!==null)
       list.push(item.size)
     return item;    
    });
    return list.join(',');
  }

  export const getMatchOddsConcatOdds = (value) => {
    let list = [];
    value?.map((item) => {
     if(item.odd!==null)
       list.push(item.odd)
       return item;    
    });
    return list.join(',');
  }

  export const getMatchOddsConcatSize = (value) => {
    let list = [];
    value?.map((item) => {
     if(item.size!==null)
       list.push(item.size)
    return item;    
    });
    return list.join(',');
  }

  export const getSortedOdds = (data) => {
      if(data && data?.split(",").length){
       return [...new Set(data.split(","))].sort((val1,val2) => parseFloat(val1) < parseFloat(val2) ? -1 : (parseFloat(val1) > parseFloat(val2) ? 1 : 0));
      }
      else{
       return []
      };
   
  }

  export const compareValues = (val1,val2) => {
     let result1  =  val1 ?  val1?.toString()?.split(",")[0] : '';
     let result2 = val2 ? val2?.toString()?.split(",")[0] : '';
    
     if(result1 === result2)
      return false;
     else 
       return true; 
       
  }

  export const oddGrouping = (data) => {
    var oddNameGroup = Object.create(null);
    if (data.length) {
      data.forEach(function (a) {
        oddNameGroup[a.name] = oddNameGroup[a.name] || [];
        oddNameGroup[a.name].push(a);
      });
    }
    return oddNameGroup;
  };

 export  const filteredBackOdds = (data) => {
    let result = data.filter((item) => {
      return item.bet_type === 1;
    });
    result = result?.sort((val1,val2) => parseFloat(val1) < parseFloat(val2) ? -1 : (parseFloat(val1) > parseFloat(val2) ? 1 : 0));
    return result?.length ? result : [];
    
  };

 export  const filteredlayOdds = (data) => {
    let result = data.filter((item) => {
      return item.bet_type === 2;
    });
    return result?.length ? result : [];
  };

  export const checkECricket = (match) => {
    if((match.team_one_name?.includes("SRL") || match.team_one_name?.includes("T10") || match.team_two_name?.includes("SLR") || match.team_two_name?.includes("T10")) && match.name === 'Cricket' )
      return true;
    else
     return false;
   }

   export const firstLetterCapital = (string) => {
    const arr = string?.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    
    const str2 = arr.join(" ");
    return str2;
   }

   export const getMobileOdds = (odd,size) => {
    let obj = {};
    if(odd && odd?.split(",").length)
      obj.odd = odd?.split(",")[0];
     // console.log([...new Set(odd.split(","))].sort((val1,val2) => parseFloat(val1) < parseFloat(val2) ? -1 : (parseFloat(val1) > parseFloat(val2) ? 1 : 0)));
    if(size && size?.split(",").length)
       obj.size =  size?.split(",")[0];
     return obj;  
   }

   export const  makeFancyBookOdd = (odd, type,matchId) => {
    const result = [
      {
        id: (Math.random() * 1000000).toFixed(0),
        bet_type: 1,
        betfair_match_id: matchId,
        market_id: odd.mid,
        market_type: odd.mname ? odd.mname : odd.gtype,
        name: odd.nat,
        odd: odd.b1?.toString(),
        selection_id: odd.sid,
        size: odd.bs1?.toString(),
        status: type === "fancy" ? odd.gstatus : odd.s,
      },
      {
        id: (Math.random() * 1000000).toFixed(0),
        bet_type: 2,
        betfair_match_id: matchId,
        market_id: odd.mid,
        market_type: odd.mname ? odd.mname : odd.gtype,
        name: odd.nat,
        odd: odd.l1?.toString(),
        selection_id: odd.sid,
        size: odd.ls1?.toString(),
        status: type === "fancy" ? odd.gstatus : odd.s,
      },
    ];
    return result;
  };
 
  