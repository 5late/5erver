/*var dates = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "../vids/", true);
xhr.responseType = 'document';
xhr.onload = () => {
  if (xhr.status === 200) {
    var elements = xhr.response.getElementsByTagName("a");
    for (x of elements) {
      if ( x.href.match(/\.(mp4)$/) || x.href.match(/\.(mkv)$/) || x.href.match(/\.(mov)$/) || x.href.match(/\.(webm)$/) || x.href.match(/\.(mp3)$/) || x.href.match(/\.(jpg)$/) || x.href.match(/\.(png)$/)) { 


    function getFilenameAndExtension(pathfilename){
      var filenameextension = pathfilename.replace(/^.*[\\\/]/, '')
      var filename = filenameextension.substring(0, filenameextension.lastIndexOf('.'))
      var filenamer = filename.replace(/%20/g," ")

      return [filenamer];
    }

    function getExtension(pathfilename){
      var filenameextension = pathfilename.replace(/^.*[\\\/]/, '')
      var ext = filenameextension.split('.').pop();

      return [ext];
    }
    
    console.log(getFilenameAndExtension(x.href))
          let img = document.createElement("a");
          var newLink = document.createTextNode(getFilenameAndExtension(x.href))
          console.log(newLink)
          let button = document.createElement("button")
          button.appendChild(img)
          img.appendChild(newLink)
          img.title = "Title"
          img.href = x.href;
          var VideoDiv = document.getElementById("videoDiv")
          VideoDiv.appendChild(button);
          button.className = "videos"
          let h3 = document.createElement("h3")
          h3.innerHTML = '.'+getExtension(x.href)
          VideoDiv.appendChild(h3)
          h3.className = "ext"
      } 
    };
  } 
  else {
    alert('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send()

console.log(dates)*/

function createButtons(source, name, filetype) {
  let link = document.createElement("a")
  let button = document.createElement("button")
  let h3 = document.createElement("h3")
  let videoDiv = document.getElementById("videoDiv")

  link.href = source;
  button.innerText = name;
  button.className = 'videos'
  
  link.appendChild(button)
  videoDiv.appendChild(link)

  h3.className = 'ext'
  h3.innerText = filetype;
  videoDiv.appendChild(h3)
  document.body.appendChild(videoDiv)
}


fetch(`http://localhost:1337/json`).then(response => response.json()).then(data => {
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    createButtons(data[i].source, data[i].title, data[i].filetype)
  }
})
