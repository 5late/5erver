package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"text/template"
)

type videoData struct {
	Source   string `json:"source"`
	Title    string `json:"title"`
	Filetype string `json:"filetype"`
}

var templates = template.Must(template.ParseFiles("public/upload.html"))

func displayHTML(w http.ResponseWriter, page string, data interface{}) {
	templates.ExecuteTemplate(w, page+".html", data)
}

func moveFile(filename string) {
	oldLocation := "./" + filename
	newLocation := `./vids/` + filename
	err := os.Rename(oldLocation, newLocation)
	if err != nil {
		log.Fatal(err)
	}
}

func uploadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Your file has been successfully uploaded. Thanks for using 5erver!")
	// Maximum upload of 10 MB files
	r.ParseMultipartForm(1024 << 20)

	// Get handler for filename, size and headers
	file, handler, err := r.FormFile("myFile")
	if err != nil {
		fmt.Println("Error Retrieving the File")
		fmt.Println(err)
		return
	}

	defer file.Close()
	fmt.Printf("Uploaded File: %+v\n", handler.Filename)
	fmt.Printf("File Size: %+v\n", handler.Size)
	fmt.Printf("MIME Header: %+v\n", handler.Header)

	f, err := os.Create(handler.Filename)
	defer f.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	filename := handler.Filename
	contentType, err := getFileEnding(f)
	if err != nil {
		log.Println(err)
	}

	moveFile(filename)
	CreateJSON(`./vids/`+filename, filename, contentType)

	// Copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(f, file); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func CreateJSON(vSource string, vTitle string, fileType string) {
	filename := "video.json"
	file, err := ioutil.ReadFile("video.json")
	if err != nil {
		log.Println(err)
	}

	datas := []videoData{}

	json.Unmarshal(file, &datas)

	newStruct := &videoData{
		Source:   vSource,
		Title:    vTitle,
		Filetype: fileType,
	}

	datas = append(datas, *newStruct)

	dataBytes, err := json.MarshalIndent(datas, "", "   ")
	if err != nil {
		log.Println(err)
	}

	err = ioutil.WriteFile(filename, dataBytes, 0644)
	if err != nil {
		log.Println(err)
	}
}

func getFileEnding(out *os.File) (string, error) {
	buffer := make([]byte, 512)

	_, err := out.Read(buffer)
	if err != nil {
		log.Println(err)
	}

	contentType := http.DetectContentType(buffer)

	return contentType, nil
}

func setupRoutes(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		displayHTML(w, "upload", nil)
	case "POST":
		uploadFile(w, r)
	}
}

func main() {
	fmt.Println("Hello World!")
	fs := http.FileServer(http.Dir("./vids"))
	http.Handle("/", fs)
	http.HandleFunc("/upload", setupRoutes)
	http.ListenAndServe(":1337", nil)
}
