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
