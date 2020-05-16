// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


var app=require('electron')
var ipcRenderer = app.ipcRenderer; 
const remote = app.remote;
var savedOpacity=.25;
var playlist = remote.getGlobal('playlist');
var fileMode=true;
var opacityView=1
// opacity view from localStorage?
//var playlistindex=0;
if (typeof playlist=='string'){
  fileMode=false;
}





function playvid(i, listener){

var vid=document.getElementById('video')
//vid.removeEventListener(listener||0)

if (typeof playlist[i] !== 'undefined'){
vid.src=playlist[i]
}else{
//ipcRenderer.send("startwfile")
remote.app.relaunch();
remote.app.exit(0);
}

vid.load()
vid.play()
i++




vid.addEventListener("ended", function(){
  playvid(i)
});
//vid.onend()=>{
  //if playlist is done, restart? 
//playvid(i)
//}


}
  




if (fileMode){
document.getElementById('browserContainer').style.display="none"
playvid(0);

document.getElementById('vidContainer').style.opacity=savedOpacity;
opacityView=savedOpacity;
}else{
//document.getElementById('load').style.display="flex"

document.getElementById('vidContainer').style.display="none"
document.getElementById('webV').setAttribute('src',playlist);



}

ipcRenderer.on("relaunch", function(){
remote.app.relaunch();
remote.app.exit(0);
})

/**/
ipcRenderer.on("toggleViz", function(){



if(!document.getElementById('browserContainer').style.opacity || document.getElementById('browserContainer').style.opacity==1){

//savedOpacity=document.getElementById('browserContainer').style.opacity;

//if (savedOpacity>.8){savedOpacity=.25}
//console.log('setting saved opacity?');
document.getElementById('browserContainer').style.opacity=savedOpacity;
opacityView=savedOpacity;

}else{
  //console.log('elseeee');
opacityView=1;
  document.getElementById('browserContainer').style.opacity=1
}

})



ipcRenderer.on("mute", function(){
    var vid=document.getElementById('video')
vid.muted=!vid.muted

})

//-----------------------------------------------------------------
function setOpacityView(){
  
//if(document.getElementById('browserContainer').style.opacity==1 && !fileMode){return}
 document.getElementById('vidContainer').style.opacity=opacityView
/*
if (opacityView>.98){
opacityView=.99
}
*/
document.getElementById('browserContainer').style.opacity=opacityView
savedOpacity=opacityView;

}


ipcRenderer.on("opac", function(f,val){
/**/
//console.log('ov',opacityView);
//console.log('v',val);
  if ((opacityView==1 && val<1 || val==1 && opacityView<1) && !fileMode){

ipcRenderer.send("autotoggle");
 opacityView=val
 return;
  }

 opacityView=val

setOpacityView()
});


ipcRenderer.on("opacityplus", function(){
opacityView+=.05
if (opacityView>1){opacityView=1}
setOpacityView()
});

ipcRenderer.on("opacityminus", function(){
	opacityView+=-.05
  if (opacityView<0){opacityView=0}
 setOpacityView()

});
ipcRenderer.on("opacityhalf", function(){
  opacityView=.5
 setOpacityView()

});

ipcRenderer.on("opacitynone", function(){

  //if(!document.getElementById('browserContainer').style.opacity || document.getElementById('browserContainer').style.opacity==1){return}

  if (document.getElementById('vidContainer').style.opacity==0){
setOpacityView()
  }else{

     document.getElementById('vidContainer').style.opacity=0
     document.getElementById('browserContainer').style.opacity=0
}

});

ipcRenderer.on("opacityfull", function(){

  if(!document.getElementById('browserContainer').style.opacity || document.getElementById('browserContainer').style.opacity==1){return}

  if (document.getElementById('vidContainer').style.opacity==1){
setOpacityView()
  }else{

     document.getElementById('vidContainer').style.opacity=1
     document.getElementById('browserContainer').style.opacity=.999
}

});

ipcRenderer.on("playpause", function(){
	var vid=document.getElementById('video')
	//vid.pause();
      //return
      if (vid.paused){
      	vid.play()
      }else{
      	vid.pause()
      }
});

ipcRenderer.on("skip", function(){
      var vid=document.getElementById('video')
//vid.pause();
vid.currentTime = vid.currentTime +999999999999999999999999;
})

ipcRenderer.on("timeplus", function(){
    var vid=document.getElementById('video')

//vid.pause();
vid.currentTime = vid.currentTime + 0.03337;
});

ipcRenderer.on("timeminus", function(){
    var vid=document.getElementById('video')

//vid.pause();
vid.currentTime = vid.currentTime - 0.03337;
});

ipcRenderer.on("timefastback", function(){
    var vid=document.getElementById('video')

//vid.pause();
vid.currentTime = vid.currentTime -240;
});

ipcRenderer.on("timefastforward", function(){
    var vid=document.getElementById('video')

//vid.pause();
vid.currentTime = vid.currentTime +240;
});



