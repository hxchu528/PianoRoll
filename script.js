var count = 1;
var instruments = [];
var currentInstrument;
function instInfo(val) {
  return {num: val,atk: 0.5,dec: 0.5,sus: 0.5,rel: 0.5,type: "sine",wavevalue: []};
}

function addInstrument() {
  var tbl = document.getElementById("allInstrument");
  var newRow = document.createElement('tr');
  tbl.insertBefore(newRow, tbl.firstChild);

  var td1 = document.createElement("td");
  td1.className = "inst-row";
  td1.innerHTML = `Inst #${count}`;
  newRow.appendChild(td1);

  var td2 = document.createElement("td");
  td2.className = "inst-row";
  td2.style.width = 100;
  td2.style.overflowX = "auto";
  newRow.appendChild(td2);

  var delBtn = document.createElement("button");
  delBtn.innerHTML = "-";
  delBtn.style.float = "right";
  delBtn.setAttribute("data-index", count);
  delBtn.addEventListener("click", function(event) {
    var index = event.target.getAttribute("data-index");
    deleteInstrument(index);
  });

  td1.appendChild(delBtn);

  var canvas = document.createElement("canvas");
  canvas.className = "ctx";
  canvas.style = "width:900px;";
  canvas.height = 50;
  canvas.setAttribute("data-index", count);
  instruments.push(instInfo(count));
  canvas.onclick = function(){
    document.getElementById("roll").style.display = "block";
    currentInstrument = canvas.getAttribute("data-index");
    showCurrentInfo();
  };
  td2.appendChild(canvas);
  count++;
}
function adjust(){
  var index = 0;
  while(instruments.length>0){
    if(instruments[index].num.toString()===currentInstrument){break;}
      index++;
  }
  instruments[index].atk = Number(document.getElementsByName("atk")[0].value);
  instruments[index].dec = Number(document.getElementsByName("dec")[0].value);
  instruments[index].sus = Number(document.getElementsByName("sus")[0].value);
  instruments[index].rel = Number(document.getElementsByName("rel")[0].value);
  instruments[index].type = document.getElementById("synthwave").value;
  document.getElementById("customwave").style.display = instruments[index].type!=="custom"?"none":"block";
  var wave = document.querySelectorAll("#customwave input");
  for(var i = 0; i < wave.length; i++){
    var inputValue = wave[i].value;
    instruments[index].wavevalue[i] = Number(inputValue);
  }
}
function showCurrentInfo(){
  var index = 0;
  while(instruments[index].num.toString()!==currentInstrument){
    index++;
  }
  document.getElementsByName("atk")[0].value = instruments[index].atk;
  document.getElementsByName("dec")[0].value = instruments[index].dec;
  document.getElementsByName("sus")[0].value = instruments[index].sus;
  document.getElementsByName("rel")[0].value = instruments[index].rel;
  document.getElementById("synthwave").value = instruments[index].type;
  var wave = document.querySelectorAll("#customwave input");
  for(var i = 0; i<instruments[index].wavevalue.length; i++){
    wave[i].value = instruments[index].wavevalue[i];
  }
}
function deleteInstrument(index) {
  var tbl = document.getElementById("allInstrument");
  var tr = tbl.querySelectorAll('tr');
  var rowToDelete = parseInt(index);
  var findDelRow = -1;
  for (var i = 0; i < tr.length; i++) {
    var btn = tr[i].querySelector('button[data-index="' + rowToDelete + '"]');
    if (btn) {
      findDelRow = i;
      break;
    }
  }
  if (findDelRow !== -1) {
    tbl.deleteRow(findDelRow);
  }
  for (var i = 0; i < instruments.length; i++) {
    if(instruments[i].num === index){
      instruments.splice(i,1);
    }
  }
}
function showcustom(){
  var synthwave = document.getElementById("synthwave");
  var values = document.getElementById("customwave");
  if(synthwave.value === "custom"){
    values.style.display = "block";
  }else{
    values.style.display = "none";
  }
}
function addvalue(){
  var values = document.getElementById("customwave");
  var inp = document.createElement("input");
  inp.className = "wavevalue";
  inp.value = 0;
  values.insertBefore(inp, values.lastElementChild);
}
