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
  
  //Iterate MultiDimensional Array Using For Loops
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
//________________Open XML________________
function openXML(){
  // Open File
  Files = document.getElementById("openFile").files;  //Get Files
  File = Files[0];
  console.log("Files are\n" + Files + "\n" + File);
  
  let Opener = new FileReader();
  
  Opener.addEventListener("loadend", function(){
    document.getElementById("wrapper").innerHTML = Opener.result;
  });
  Opener.readAsText(File);
  
  processXMLData(File);
};
//________________Process XML________________
function processXMLData(xmlFile){
  let data = [];
  // document.getElementById("wrapper").innerHTML = xmlFile;
  xmlFile.text().then(function(xmlData){
    let fileOpener = new DOMParser();
    xmlContent = fileOpener.parseFromString(xmlData, "application/xml");
    // document.getElementById("wrapper").textContent = xmlData;
    console.log(xmlContent);
    //xmlData - XML Content As Text
    //xmlContent - XML Content
    // return xmlContent;
    let cards = getContent(xmlContent, "card");
    console.log(`Cards Are\n${cards}`);
    console.log(cards);
    
    for(var i = 0; i < cards.length; i++){
      let card = cards[i];
      // let datum = [];
      let datum = [];
      let front = card.getElementsByTagName("front")[0];
      let back = card.getElementsByTagName("back")[0];
      let image = card.getElementsByTagName("image")[0];
      let audio = card.getElementsByTagName("audio")[0];
      //Get Front Value
      if(front){
        // datum += front.firstChild.nodeValue;
        datum[1] = front.firstChild.nodeValue;
        console.log("Front");
        console.log(front);
        console.log(front.firstChild.nodeValue);
      }
      if(back){
        //Get Back Value
        // datum += back.firstChild.nodeValue;
        datum[2] = back.firstChild.nodeValue;
        console.log("Back");
        console.log(back);
        console.log(back.firstChild.nodeValue);
      }
      //Image
      if(image){
        datum[0] = image.firstChild.nodeValue;
        console.log("Image");
        console.log(image);
        console.log(image.firstChild.nodeValue);
      }/*else{
        datum[0] = "";
      }*/
      //Audio
      if(audio){
        datum[3] = audio.firstChild.nodeValue;
        console.log("Audio");
        console.log(audio);
        console.log(audio.firstChild.nodeValue);
      }/*else{
        datum[3] = "";
      }*/
      
      // data[i] = datum;
      //data[data.length] ➡ Get End Of Array
      data[data.length] = datum;    //Insert datum at the end of data
      // data += datum;
      console.log("Data");
      console.log(data);
    }
  });
  return data;
}
//________________Get XML Tag Content________________
function getContent(xml, tag){
  let root = xml.documentElement; //Root Element
  let rootElement = xml.documentElement.nodeName; //Root Element Name
  console.log(rootElement);
  console.log(root);
  
  let tags = root.getElementsByTagName(tag);
  console.log(tags.nodeName); //Element Name
  // console.log(`%c${tags}`, "color: green");  //Element
  // console.log(tags.nodeName); //Element Name
  console.log(tags);  //Element
  return tags;
}