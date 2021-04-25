package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"text/template"
)

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
	fmt.Fprintf(w, "Uploading File")
	// Maximum upload of 10 MB files
	r.ParseMultipartForm(10 << 20)

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

	moveFile(handler.Filename)

	// Copy the uploaded file to the created file on the filesystem
	if _, err := io.Copy(f, file); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
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
	http.HandleFunc("/upload", setupRoutes)
	http.ListenAndServe(":1337", nil)
}
