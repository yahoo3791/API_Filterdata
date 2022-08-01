function init(){
  const xhr = new XMLHttpRequest();
  xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
  xhr.send(null);
  xhr.onload = () => {
    mainData = JSON.parse(xhr.responseText).result.records;
    len = mainData.length;
    render(areaChange);
    ZoneSelect();
  }
}
init();

let mainData;
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
    areaList.push(mainData[i].Zone)
  }
  // 比對重複地名
  const filterArray = areaList.filter(function( a, b){
    return areaList.indexOf(a) == b;
  })
  //顯示在select上
  let option = `<option disabled class="" href="#">--請選擇行政區--</option>`;
  for(let i = 0; i < filterArray.length; i++){
    option += `<option value="${filterArray[i]}">${filterArray[i]}</option>`;
  }
  area.innerHTML = option;
}

//顯示資料
function render(fn){
  let str = '';
  for (let i=0; i<len; i++){
    let obj = {};
    obj.picture = mainData[i].Picture1;
    obj.name = mainData[i].Name;
    obj.time = mainData[i].Opentime;
    obj.Add = mainData[i].Add;
    obj.ticket = mainData[i].Ticketinfo;
    if (mainData[i].Ticketinfo == ''){
      obj.ticket = '免費參觀';
    }
    str += `<div class="card">
        <div class="card_img" style="width: 300px; height: 250px;">
          <img style="width: 100%; height: 100%;"src="${obj.picture}" alt="">
          <div class="card_Name">
            <h1>${obj.name}</h1>
          </div>
        </div>
        <p class="time card_p mt-5">
          <img src="https://upload.cc/i1/2021/07/06/si8rdx.png" style="width: 18px;" alt="">${obj.time}</p>
        <p class="address card_p">
          <img src="https://upload.cc/i1/2021/07/06/4I6jMr.png" style="width: 16px" alt="">${obj.Add}</p>
        <p class="ticket card_p">
          <img src="https://upload.cc/i1/2021/07/06/tVbMsx.png" style="width: 20px" alt="">${obj.ticket}</p>
      </div>` ;
  }
  contentCard.innerHTML = str;
}


//顯示篩選資料
function areaChange(e){
  const nowArea = e.target.value;
  areaTitle.textContent = nowArea;
  area.value = nowArea;
  // if(e.target.nodeName == "BUTTON"){
  // }

  let str = '';
  let selectAry = [];
  //比對option資料和mainData.Zone 一樣的push進selectAry
  for(let i=0; i<len; i++){
    if(nowArea === mainData[i].Zone){
      selectAry.push(mainData[i]);
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
      </div>`;
  }
  contentCard.innerHTML = str;
}