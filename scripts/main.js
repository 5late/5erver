var dates = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "../vids", true);
xhr.responseType = 'document';
xhr.onload = () => {
  if (xhr.status === 200) {
    var elements = xhr.response.getElementsByTagName("a");
    for (x of elements) {
      if ( x.href.match(/\.(mp4)$/) ) { 

    function fetchHeader(url, wch) {
        try {
            var req=new XMLHttpRequest();
            req.open("HEAD", url, false);
            req.send(null);
            if(req.status== 200){
                return req.getResponseHeader(wch);
            }
            else return false;
        } catch(er) {
            return er.message;
        }
    }
    
          let img = document.createElement("a");
          let link = document.createTextNode(fetchHeader(x, 'Last-Modified'))
          var newLinker = Date(link)
          var newLink = document.createTextNode(newLinker)
          console.log(newLink)
          let button = document.createElement("button")
          button.appendChild(img)
          img.appendChild(newLink)
          img.title = "Title"
          img.href = x.href;
          var VideoDiv = document.getElementById("videoDiv")
          VideoDiv.appendChild(button);
          var time = document.lastModified
          console.log(time)
          button.className = "videos"
      } 
    };
  } 
  else {
    alert('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send()

console.log(dates)
