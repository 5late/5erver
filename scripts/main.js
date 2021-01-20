var dates = [];

var xhr = new XMLHttpRequest();
xhr.open("GET", "../vids", true);
xhr.responseType = 'document';
xhr.onload = () => {
  if (xhr.status === 200) {
    var elements = xhr.response.getElementsByTagName("a");
    for (x of elements) {
      if ( x.href.match(/\.(mp4)$/) ) { 
          let img = document.createElement("a");
          let link = document.createTextNode('This is a link')
          img.appendChild(link)
          img.title = "Title"
          img.href = x.href;
          document.body.appendChild(img);
          var time = document.lastModified
          console.log(time)
      } 
    };
  } 
  else {
    alert('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send()

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

dates.push(fetchHeader('../vids/vid2.mp4','Last-Modified'));
