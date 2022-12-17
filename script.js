//Create Cards
function createCards(){
  let Files = document.getElementById("openFile").files;
  let File = Files[0];
  console.log("Files are\n" + Files + "\n" + File);
  //File Extenstion
  let FileType = File.name.split(".").pop().toLowerCase();  //Get File Extenstion
  console.log(FileType);
  //Open File
  let Opener = new FileReader();
  
  Opener.readAsText(File);
  
  Opener.addEventListener("loadend", function(){
    let csv = Opener.result;
    //Process Data
    let content = [];
    switch (FileType) {
      case "csv":
        console.log("CSV File");
        content = processCSVData(csv);
        break;
      case "xml":
        console.log("XML File");
        content = processXMLData(File);
        debugger; //⬅✔❌For Each Loop In Create Cards Doesn't Work Without This
        break;
      default:
        console.log(`Invalid File Type  ➡  File Type ${FileType} Is Invalid`);
        return;
    }
    //Clear Contents
    document.getElementById("wrapper").innerHTML = "";
    //Display File Name
    document.getElementsByClassName("navigation")[0].querySelector("h1").innerHTML = File.name;
    document.getElementById("fileName").style.color = "white";
    //Create Cards
    console.log(content); //⬅✔❌Doesn't Work From Here Without Break Point In Process Data
    content.forEach((items, counterA) => {
      let wrapper = document.getElementById("wrapper");
      //Create Cards
      let card = document.createElement("div");
      card.classList.add("card");
      let front = document.createElement("div");
      front.classList.add("front");
      let back = document.createElement("div");
      back.classList.add("back");
      //Insert Cards
      wrapper.appendChild(card);
      card.appendChild(front);
      card.appendChild(back);
      //Get Content
      items.forEach((item, counterB) => {
        //Display Each Item
        console.log("Item: " + item);
      });
      //Index
      let image = 0;
      let alpha = 1;
      let beta = 2;
      let audio = 3;
      //Insert Items On Each Side Of Card
      front.innerHTML = items[alpha]; //Front
      back.innerHTML = items[beta]; //Back
      front.style.background = "center/cover url(" + items[image] + "), #8D8FDF"; //Image
      //_________________Audio
      if(items[audio]){
      card.addEventListener("click", function(event){
        //Play Audio
        let playback = document.createElement("audio");
        playback.setAttribute("src", items[audio]);
        playback.play();
        console.log("Audio Start" + "\t" + items[alpha] + "\t" + items[audio]);
        //Remove Audio
        playback.addEventListener("ended", function(){
          delete playback;
          console.log("Audio End" + "\t" + items[beta] + "\t" + items[audio]);
        });
      });
    }
      //------------------Audio
      console.log("Items: " + items);
    });
    
    //_________________Add Flipping Functionality To Cards
    interactive();
    //-----------------Add Flipping Functionality TO Cards
    styleNotEmpty("#wrapper");  //Set Minimum Width When Container Isn't Empty
    removeUndefinedContent("#wrapper"); //Remove Undefined Content
  });
}
//Shuffle
function shuffle(element){
  let deck = document.querySelector(element); //Get Container Of Elements
  //Shuffle Elements
  for(let i = deck.children.length; i >= 0; i--){
    deck.appendChild(deck.children[Math.random() * i | 0]);
  }
}
//Set Style When Container Isn't Empty
function styleNotEmpty(container){
  let element = document.querySelector(container);  //Get Container
  //Set Style When Container Is Not Empty
  if(element.hasChildNodes()){
    element.style.minWidth = 100 + "vw";  //Set Minimum Width
  }
}
//Remove Undefined Content
function removeUndefinedContent(container){
  let wrap = document.querySelector(container); //Get Container
  let undefinedContent;
  
  for (var i = 0; i < wrap.children.length; i++) {
    if(wrap.children[i].innerText == "undefined\nundefined"){
      undefinedContent = wrap.children[i];
      wrap.removeChild(undefinedContent); //Remove Undefined Content
    }
  }
}