function init(){
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
  xhr.send(null);
  xhr.onload = () => {
    getData = JSON.parse(xhr.responseText).result.records;
    len = getData.length;
    preset();
    ZoneSelect();
  }
}
init();

let getData;
let len;
const area = document.querySelector('#area');
const areaTitle = document.querySelector('.area_title');
const contentCard = document.querySelector('.content_card');
const btnGroup = document.querySelector('.btn-group');
area.addEventListener('change', areaChange, false);
btnGroup.addEventListener('click',areaChange, false);

// 下拉選單
function ZoneSelect(){
  let areaList = [];
  for(let i=0; i<len; i++){
    areaList.push(getData[i].Zone)
  }
  // 比對重複地名
  const filterArray = areaList.filter(function( a, b){
    return areaList.indexOf(a) == b;
  })
  //顯示在select上
  let option = `<option class="" href="#">--請選擇行政區--</option>`;
  for(let i = 0; i < filterArray.length; i++){
    option += `<option value="${filterArray[i]}">${filterArray[i]}</option>`;
  }
  area.innerHTML = option;
}

//顯示資料
function preset(){
  let str = '';
  for (let i=0; i<len; i++){
    let ary = [];
    ary.picture = getData[i].Picture1;
    ary.name = getData[i].Name;
    ary.time = getData[i].Opentime;
    ary.Add = getData[i].Add;
    ary.ticket = getData[i].Ticketinfo;
    if (getData[i].Ticketinfo == ''){
      ary.ticket = '免費參觀';
    }

    str += `<div class="card">
        <div class="card_img" style="width: 300px; height: 250px;">
          <img style="width: 100%; height: 100%;"src="${ary.picture}" alt="">
          <div class="card_Name">
            <h1>${ary.name}</h1>
          </div>
        </div>
        <p class="time card_p mt-5">
          <img src="https://upload.cc/i1/2021/07/06/si8rdx.png" style="width: 18px;" alt="">${ary.time}</p>
        <p class="address card_p">
          <img src="https://upload.cc/i1/2021/07/06/4I6jMr.png" style="width: 16px" alt="">${ary.Add}</p>
        <p class="ticket card_p">
          <img src="https://upload.cc/i1/2021/07/06/tVbMsx.png" style="width: 20px" alt="">${ary.ticket}</p>
      </div>` ;
  }
  contentCard.innerHTML = str;
}


//顯示篩選資料
function areaChange(e){
  const nowArea = e.target.value;
  areaTitle.textContent = nowArea;
  
  let str = '';
  let selectAry = [];
  //比對option資料和getData.Zone 一樣的push進selectAry
  for(let i=0; i<len; i++){
    if(nowArea === getData[i].Zone){
      selectAry.push(getData[i]);
    }
  }
  let selectlen = selectAry.length;
  for (let i = 0; i < selectlen; i++) {
    if (selectAry[i].Ticketinfo == ''){
      selectAry[i].Ticketinfo = '免費參觀';
    }

    str += `<div class="card">
        <div class="card_img" style="width: 300px; height: 250px;">
          <img style="width: 100%; height: 100%;"src="${selectAry[i].Picture1}" alt="">
          <div class="card_Name">
            <h1>${selectAry[i].Name}</h1>
          </div>
        </div>
        <p class="time card_p mt-5">
          <img src="https://upload.cc/i1/2021/07/06/si8rdx.png" style="width: 18px;" alt="">${selectAry[i].Opentime}</p>
        <p class="address card_p">
          <img src="https://upload.cc/i1/2021/07/06/4I6jMr.png" style="width: 16px" alt="">${selectAry[i].Add}</p>
        <p class="ticket card_p">
          <img src="https://upload.cc/i1/2021/07/06/tVbMsx.png" style="width: 20px" alt="">${selectAry[i].Ticketinfo}</p>
      </div>` ;
  }
  contentCard.innerHTML = str;
}
  //事件篩選好的陣列到畫面

  // }