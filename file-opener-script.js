//________________Open File________________
function openFile(){
  Files = document.getElementById("openFile").files;  //Get Files
  File = Files[0];
  console.log("Files are\n" + Files + "\n" + File);
  //File Extentions
  ImageTypes = ["jpg", "jpeg", "png", "bmp", "webp", "apng"];  //Image Formats
  FileType = File.name.split(".").pop().toLowerCase(); //Get File Extention
  //Open File
  if(ImageTypes.indexOf(FileType) > -1){  //Check If File Is Image
    openImage();  //Open Image
  }else if(FileType[0] == "csv"){  //Open CSV
    openCSV();
  }else{
    openText(); //Open Text
  }
}
//________________Open Text________________
function openText(){
  // Open File
  let Opener = new FileReader();
  
  Opener.addEventListener("loadend", function(){
    document.getElementById("fileContent").innerHTML = Opener.result;
  });
  Opener.readAsText(File);
}
//________________Open Image________________
function openImage(){
  //Open File
  let Opener = new FileReader();
  
  Opener.addEventListener("loadend", function(){
    let ImageItem = document.createElement("img");
    ImageItem.src = Opener.result;
    document.getElementById("fileContent").appendChild(ImageItem);
  });
  Opener.readAsDataURL(File);
}
//________________Open CSV________________
function openCSV(){
  let Files = document.getElementById("openFile").files;
  let File = Files[0];
  console.log("Files are\n" + Files + "\n" + File);
  //Open File
  let Opener = new FileReader();
  
  Opener.readAsText(File);
  
  Opener.addEventListener("loadend", function(){
    let csv = Opener.result;
    //Process Data
    let content = processCSVData(csv);
    //Display Content
    document.getElementById("fileContent").innerHTML = content + "<hr>";
    content.forEach((items, counterA) => {
      items.forEach((item, counterB) => {
        //Display Each Item
        document.getElementById("fileContent").innerHTML += "\n" + item;
        console.log("Item: " + item);
      });
      //Create New Line For New Line
      document.getElementById("fileContent").innerHTML += "<br>";
      console.log("Items: " + items);
    });
    
  });
}
//________________Process CSV Data________________
function processCSVData(contents){
  let lines = contents.split(/\r\n|\n/);
  let line = [];
  console.log(lines); //Verify
  
  //Iterate MultiDImensional Array Using For Loops
  // for(let CounterA = 0;CounterA < lines.length;CounterA++){
  //   let data = lines[CounterA].split(",");  //Get Items
  //   let datum = [];
  //   console.log(data);  //Verify
  // 
  //   for(let CounterB=0;CounterB < data.length;CounterB++){
  //     datum.push(data[CounterB]);
  //     console.log("Datum: " + datum); //Verify
  //     console.log("Data in for loop: " + data); //Verify Value Of Data
  //   }
  //   line.push(datum);
  //   console.log("Inner For Loop End");  //Verify Inner For Loop End
  //   console.log("Data outside for loop: " + data);  //Verify Value Of Data
  //   console.log("Outer For Loop End");  //Verify Outer For Loop End
  // }
  //Iterate MultiDimensional Array Using For Each Loops
  lines.forEach((lineItem, CounterA) => {
    let data = lineItem.split(","); //Get Items
    let datum = [];
    console.log(data);  //Verify
  
    data.forEach((wordItem, CounterB) => {
      datum.push(wordItem);
      console.log("Datum: " + datum); //Verify
      console.log("Data in for each loop: " + data); //Verify Value Of Data
    });
    line.push(datum);
    console.log("Inner For Each Loop End");  //Verify Inner For Loop End
    console.log("Data outside for each loop: " + data);  //Verify Value Of Data
    console.log("Outer For Each Loop End");  //Verify Outer For Loop End
  });
  //Return Content
  console.log(line);  //Verify
  return line;
}