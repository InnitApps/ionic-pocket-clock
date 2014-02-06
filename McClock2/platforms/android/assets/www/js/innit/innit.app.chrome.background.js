


function main(){}


function install(data){

  console.log(data)
}


function start(data){

  console.log(data)
  chrome.app.window.create("index.html?app_token=12345",
    {  
      frame: "none",
      singleton : true,
      bounds: {
         width: 320,
         height: 480,
         left: 600
       },
       minWidth: 220,
       minHeight: 220,
       transparentBackground: true
    }
  );
}



function restart(){}


// chrome.app.runtime.onLaunched.addListener()

chrome.app.runtime.onLaunched.addListener(start);
