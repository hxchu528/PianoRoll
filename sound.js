var mp3 = new (window.AudioContext||window.webkitAudioContext)();
f = n => Math.pow(Math.pow(2,1/12),n-49)*440;
sub = (n,n2) =>{
    if(n-n2<0){return 0;}
    else{return n-n2}
}
function player(c,note){
    var osc = mp3.createOscillator();
    var gain = mp3.createGain();
    var comp = mp3.createDynamicsCompressor();
    var len = note[1];
        gain.gain.value = c.vol;
        osc.frequency.value = f(note[0]);
        if(c.type!=="custom"){
            osc.type = c.type;
        }else{
            var real = new Float32Array(c.wave);
            var imag = new Float32Array(real.length);
            var wave = mp3.createPeriodicWave(real,imag);
            osc.setPeriodicWave(wave);
        }
      if(c.atk>0){
      gain.gain.setValueAtTime(0,mp3.currentTime);
      }
gain.gain.linearRampToValueAtTime(c.vol,mp3.currentTime+c.atk+0.01);
        gain.gain.linearRampToValueAtTime(c.sus*c.vol,mp3.currentTime+c.dec+c.atk+0.01);
        gain.gain.linearRampToValueAtTime(c.sus*c.vol,mp3.currentTime+c.atk+c.dec+sub(len,c.atk+c.dec));
        gain.gain.linearRampToValueAtTime(0,mp3.currentTime+c.atk+c.dec+sub(len,c.atk+c.dec)+c.rel);
        osc.start();
        osc.stop(mp3.currentTime+note[1]+c.rel);
        osc.connect(gain);
        gain.connect(comp);
        comp.connect(mp3.destination);
}
function play(syn,n){
var cur = 0;
var j = 0;
for(var i = 0; i<n.length; i++){
if(n[i][0]!==""){
setTimeout(()=>{player(syn,n[j]);j++;},cur*1e3);
}else{
setTimeout(()=>{j++;},cur*1e3);
}
cur += n[i][1];
}
}
var tempo=120;
function comp(n){
    var l = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
    var k = n.split(" ");
    var output = [];
    for(var i = 0; i<k.length; i++){
        for(var j = 0; j<l.length; j++){
            var oct = k[i].charAt(k[i].indexOf("-")-1);
            var name = k[i].indexOf(l[j]);
            if(k[i].substring(0,k[i].indexOf("-")-1)==l[j]){
           
                output.push([oct*12+j+1,Number(k[i].substring(k[i].indexOf("-")+1))*60/tempo]);
            }else if(k[i].substring(0,2)== "''"){
output.push(["",Number(k[i].substring(k[i].indexOf("-")+1))*60/tempo]);
                break;
            }
        }
    }
    return output;
}
var synth=
{
    vol:1,
    atk:0,
    dec:0.25,
    sus:0,
    rel:0,
    type:"custom",
    wave:[0,1,0.1,0.35,0.05,0.05,0,0.2]
};
