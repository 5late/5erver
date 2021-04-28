const sources = []
const names = []
const filetypes = []

function remove_duplicates_safe(arr) {
  var seen = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
      if (!(arr[i] in seen)) {
          ret_arr.push(arr[i]);
          seen[arr[i]] = true;
      }
  }
  return ret_arr;

}

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

function createSeperateButtons() {
  let uniqSources = remove_duplicates_safe(sources)
  let uniqNames = remove_duplicates_safe(names)
  let uniqFiletypes =  remove_duplicates_safe(filetypes)

  console.log(uniqNames, uniqSources, uniqFiletypes)

  for(var i = 0; i < uniqSources.length; i++) {
    createButtons(uniqSources[i], uniqNames[i], filetypes[i])
  }

}

function fetchJSON(){
fetch(`http://localhost:1337/json`).then(response => response.json()).then(data => {
  console.log(data)
  for(var i = 0; i < data.length; i++) {
    sources.push(data[i].source)
    names.push(data[i].title)
    filetypes.push(data[i].filetype)
  }
createSeperateButtons()
})
}
