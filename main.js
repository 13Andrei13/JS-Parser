const inputXmlFile = document.getElementById("myXmlFile");
const inputJsonFile = document.getElementById("myJsonFile");

const xml_file_selected = document.getElementById("xml_file_status");
const json_file_selected = document.getElementById("json_file_status");

const xmlForm = document.getElementById("xmlForm");
const jsonForm = document.getElementById("jsonForm");

inputXmlFile.addEventListener("change", updateXmlFileName);
inputJsonFile.addEventListener("change", updateJsonFileName);

xmlForm.addEventListener("submit", onsubmitXML);
jsonForm.addEventListener("submit", onsubmitJSON);

// Get the success message for the XML file and disable the display of the success message
var xml_success_message =
  document.getElementsByClassName("xml alert success")[0];
xml_success_message.style.display = "none";

// Get the success message for the JSON file and disable the display of the success message
var json_success_message =
  document.getElementsByClassName("json alert success")[0];
json_success_message.style.display = "none";

// Get the warning message for the XML file and disable the display of the warning message
var xml_warning_message =
  document.getElementsByClassName("xml alert warning")[0];
xml_warning_message.style.display = "none";

// Get the success message for the JSON file and disable the display of the success message
var json_warning_message =
  document.getElementsByClassName("json alert warning")[0];
json_warning_message.style.display = "none";

let showXmlTable;
let showJsonTable;
let showStylesheetTable = 0;

let xmlContent;
let jsonContent;

document.getElementById("showXML").addEventListener("click", onclick_showXML);
document.getElementById("showJSON").addEventListener("click", onclick_showJSON);
document
  .getElementById("showStylesheet")
  .addEventListener("click", onclick_showStylesheet);

function updateXmlFileName() {
  while (xml_file_selected.firstChild) {
    xml_file_selected.removeChild(xml_file_selected.firstChild);
  }

  const curFiles = inputXmlFile.files;
  for (const file of curFiles) {
    xml_file_selected.appendChild(document.createTextNode(file.name));
  }
}

function updateJsonFileName() {
  while (json_file_selected.firstChild) {
    json_file_selected.removeChild(json_file_selected.firstChild);
  }

  const curFiles = inputJsonFile.files;
  for (const file of curFiles) {
    json_file_selected.appendChild(document.createTextNode(file.name));
  }
}

function onsubmitXML() {
  var input, file, fr;

  if (typeof window.FileReader !== "function") {
    bodyAppend("xml_file_status", "Platform not supported");
    return;
  }

  input = document.getElementById("myXmlFile");

  if (!input) {
    bodyAppend("xml_file_status", "Could not find file input element.");
  } else if (!input.files) {
    bodyAppend(
      "xml_file_status",
      "This browser does not support the `files` property of file inputs."
    );
  } else if (!input.files[0]) {
    bodyAppend(
      "xml_file_status",
      "Please select a file before clicking 'Load' or 'Submit'."
    );
  } else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText() {
    xmlContent = fr.result;
    xml_success_message.style.display = "block";
  }
}

function onsubmitJSON() {
  var input, file, fr;

  if (typeof window.FileReader !== "function") {
    bodyAppend("json_file_status", "Platform not supported");
    return;
  }

  input = document.getElementById("myJsonFile");

  if (!input) {
    bodyAppend("json_file_status", "Could not find file input element.");
  } else if (!input.files) {
    bodyAppend(
      "json_file_status",
      "This browser does not support the `files` property of file inputs."
    );
  } else if (!input.files[0]) {
    bodyAppend(
      "json_file_status",
      "Please select a file before clicking 'Load' or 'Submit'."
    );
  } else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText() {
    jsonContent = fr.result;
    json_success_message.style.display = "block";
  }
}

function shownode(node) {
  console.log(node.nodeName);
  for (var i = 0; i < node.childNodes.length; i++) {
    shownode(node.childNodes[i]);
  }
}

function bodyAppend(tag, text) {
  var elem;

  elem = document.getElementById(tag);
  elem.removeChild(elem.firstChild);
  elem.appendChild(document.createTextNode(text));
}

// For closing the success message
var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.opacity = 0;
    setTimeout(function () {
      div.style.display = "none";
    }, 600);
  };
}

//Function used for when Show the XML button is pressed
// function onclick_showXML() {
//   if (xmlContent == null) {
//     xml_warning_message.style.display = "block";
//   } else {
//     xml_warning_message.style.display = "none";

//     let parser = new DOMParser();
//     let xmlDoc = parser.parseFromString(xmlContent, "text/xml");

//     let max_sum = 0;
//     let nume_castigator;
//     let auctions = xmlDoc.querySelectorAll("licitatie");
//     let auction_table =
//       "<p id='xml_auction_table_title'><b>Table with all auctions:</b></p>";
//     auction_table +=
//       "<tr><th>Licitatie ID</th><th>Telefon licitat</th><th>Pret initial</th><th>Durata</th><th>Tipul de licitatie</th><th>Data publicarii</th><th>Persoana castigatoare</th></tr>";
//     auctions.forEach((auctionNode) => {
//       auction_table +=
//         "<tr>" +
//         "<td>" +
//         auctionNode.getAttribute("id") +
//         "</td>" +
//         "<td>" +
//         auctionNode.children[0].children[0].innerHTML +
//         " " +
//         auctionNode.children[0].children[1].innerHTML +
//         "</td>" +
//         "<td>" +
//         auctionNode.children[1].innerHTML +
//         " " +
//         auctionNode.children[1].getAttribute("moneda") +
//         "</td>" +
//         "<td>" +
//         auctionNode.children[2].innerHTML +
//         " " +
//         auctionNode.children[2].getAttribute("unitate_timp") +
//         "</td>" +
//         "<td>" +
//         auctionNode.children[4].innerHTML +
//         "</td>" +
//         "<td>" +
//         auctionNode.children[5].innerHTML +
//         "</td>";

//       auctionNode.children[3].querySelectorAll("persoana").forEach((winner) => {
//         if (winner.children[4].innerHTML > max_sum) {
//           max_sum = winner.children[4].innerHTML;
//           nume_castigator =
//             winner.children[0].innerHTML + " " + winner.children[1].innerHTML;
//         }
//       });

//       auction_table += "<td>" + nume_castigator + "</td></tr>";
//       max_sum = 0;
//     });
//     document.getElementById("xml_auctions_table").innerHTML = auction_table;

//     let phones = xmlDoc.querySelectorAll("telefon");
//     let phone_table =
//       "<p id='xml_phone_table_title'><b>Table with phones on auction:</b></p>";
//     phone_table +=
//       "<tr><th>Producator</th><th>Model</th><th>Procesor</th><th>Capacitate baterie</th><th>Valoare telefon</th></tr>";
//     phones.forEach((phoneNode) => {
//       phone_table +=
//         "<tr>" +
//         "<td>" +
//         phoneNode.children[0].innerHTML +
//         "</td>" +
//         "<td>" +
//         phoneNode.children[1].innerHTML +
//         "</td>" +
//         "<td>" +
//         phoneNode.children[2].innerHTML +
//         "</td>" +
//         "<td>" +
//         phoneNode.children[3].innerHTML +
//         " " +
//         phoneNode.children[3].getAttribute("unitate_masura") +
//         "</td>" +
//         "<td>" +
//         phoneNode.children[4].innerHTML +
//         " " +
//         phoneNode.children[4].getAttribute("moneda") +
//         "</td>" +
//         "</tr>";
//     });
//     document.getElementById("xml_phones_table").innerHTML = phone_table;

//     let peoples = xmlDoc.querySelectorAll("persoana");
//     let people_table =
//       "<p id='xml_people_table_title'><b>Table with bidders:</b></p>";
//     people_table +=
//       "<tr><th>Nume</th><th>Prenume</th><th>Email</th><th>Numar Telefon</th><th>Suma licitata</th></tr>";
//     peoples.forEach((peopleNode) => {
//       people_table +=
//         "<tr>" +
//         "<td>" +
//         peopleNode.children[0].innerHTML +
//         "</td>" +
//         "<td>" +
//         peopleNode.children[1].innerHTML +
//         "</td>" +
//         "<td>" +
//         peopleNode.children[2].innerHTML +
//         "</td>" +
//         "<td>" +
//         peopleNode.children[3].innerHTML +
//         "</td>" +
//         "<td>" +
//         peopleNode.children[4].innerHTML +
//         " " +
//         peopleNode.children[4].getAttribute("moneda") +
//         "</td>" +
//         "</tr>";
//     });
//     document.getElementById("xml_peoples_table").innerHTML = people_table;

//     if (showXmlTable == 1) {
//       document.getElementById("xml_auctions_table").style.display = "none";
//       document.getElementById("xml_phones_table").style.display = "none";
//       document.getElementById("xml_peoples_table").style.display = "none";
//       showXmlTable = 0;
//     } else {
//       showXmlTable = 1;
//       document.getElementById("xml_auctions_table").style.display = "initial";
//       document.getElementById("xml_phones_table").style.display = "initial";
//       document.getElementById("xml_peoples_table").style.display = "initial";
//     }
//   }
// }

function onclick_showXML() {
  if (xmlContent == null) {
    xml_warning_message.style.display = "block";
  } else {
    xml_warning_message.style.display = "none";
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlContent, "text/xml");
    let produse_animala = xmlDoc.querySelectorAll("produs_animal");
    let produse_mancare = xmlDoc.querySelectorAll("produs_hrana");
    let animale = xmlDoc.querySelectorAll("animal");
    let mancare = xmlDoc.querySelectorAll("mancare");
    let produse_table =
      "<p id='xml_auction_table_title'><b>Lista produselor:</b></p>";
    produse_table +=
      "<tr><th>Specie/Tip</th><th>Pret initial</th><th>Cantitate</th><th>Descriere</th><th>Greutate</th></tr>";

    produse_animala.forEach((produseAnimalaNode) => {
      produse_table +=
        "<tr><td> " +
        produseAnimalaNode.children[0].getAttribute("specie") +
        "<td>" +
        produseAnimalaNode.children[1].innerHTML +
        " " +
        produseAnimalaNode.children[1].getAttribute("moneda") +
        "</td>" +
        "<td>" +
        produseAnimalaNode.children[2].innerHTML +
        "</td>" +
        "<td>" +
        produseAnimalaNode.children[3].innerHTML +
        "</td>" +
        "<td>" +
        produseAnimalaNode.children[4].innerHTML +
        " " +
        produseAnimalaNode.children[4].getAttribute("unitate") +
        "</td>" +
        "</tr>";
    });
    produse_mancare.forEach((produseMancareNode) => {
      produse_table +=
        "<tr><td> " +
        produseMancareNode.children[0].getAttribute("tip") +
        "<td>" +
        produseMancareNode.children[1].innerHTML +
        " " +
        produseMancareNode.children[1].getAttribute("moneda") +
        "</td>" +
        "<td>" +
        produseMancareNode.children[2].innerHTML +
        "</td>" +
        "<td>" +
        produseMancareNode.children[3].innerHTML +
        "</td>" +
        "<td>" +
        produseMancareNode.children[4].innerHTML +
        " " +
        produseMancareNode.children[4].getAttribute("unitate") +
        "</td>" +
        "</tr>";
    });

    document.getElementById("xml_produse_table").innerHTML = produse_table;

    let animale_table =
      "<p id='xml_auction_table_title'><b>Animalele in ordinea produselor de mai sus:</b></p>";
    animale_table +=
      "<tr><th>Specie</th><th>Rasa</th><th>Anul nasterii</th><th>Tip animal</th><th>Sex</th></tr>";
    animale.forEach((animal) => {
      animale_table +=
        "<tr>" +
        "<td>" +
        animal.getAttribute("specie") +
        "</td>" +
        "<td>" +
        animal.children[0].innerHTML +
        "</td>" +
        "<td>" +
        animal.children[1].innerHTML +
        "</td>" +
        "<td>" +
        animal.children[2].innerHTML +
        "</td>" +
        "<td>" +
        animal.children[3].innerHTML +
        "</td>" +
        "</tr>";
    });
    document.getElementById("xml_animal_table").innerHTML = animale_table;

    let mancare_table =
      "<p id='xml_auction_table_title'><b>Hrana pentru animalute:</b></p>";
    mancare_table +=
      "<tr><th>Tip hrana</th><th>Animal destinat</th><th>Marime animal</th><th>Aroma</th><th>Rasa</th></tr>";

    mancare.forEach((hrana) => {
      mancare_table +=
        "<tr>" +
        "<td>" +
        hrana.getAttribute("tip") +
        "</td>" +
        "<td>" +
        hrana.children[0].innerHTML +
        "</td>" +
        "<td>" +
        hrana.children[1].innerHTML +
        "</td>" +
        "<td>" +
        hrana.children[2].innerHTML +
        "</td>" +
        "<td>" +
        hrana.children[3].innerHTML +
        "</td>" +
        "</tr>";
    });

    document.getElementById("xml_mancare_table").innerHTML = mancare_table;

    if (showXmlTable == 1) {
      document.getElementById("xml_produse_table").style.display = "none";
      document.getElementById("xml_animal_table").style.display = "none";
      document.getElementById("xml_mancare_table").style.display = "none";
      showXmlTable = 0;
    } else {
      showXmlTable = 1;
      document.getElementById("xml_produse_table").style.display = "initial";
      document.getElementById("xml_animal_table").style.display = "initial";
      document.getElementById("xml_mancare_table").style.display = "initial";
    }
  }
}

function onclick_showJSON() {
  if (jsonContent == null) {
    json_warning_message.style.display = "block";
  } else {
    json_warning_message.style.display = "none";

    let jsonObj = JSON.parse(jsonContent);

    let max_sum = 0;
    let nume_castigator;

    let auctions = jsonObj.licitatii.licitatie;
    let auction_table =
      "<p id='json_auction_table_title'><b>Table with all auctions:</b></p>";
    auction_table +=
      "<tr><th>Licitatie ID</th><th>Telefon licitat</th><th>Pret initial</th><th>Durata</th><th>Tipul de licitatie</th><th>Data publicarii</th><th>Persoana castigatoare</th></tr>";
    for (var i = 0; i < auctions.length; i++) {
      auction_table +=
        "<tr>" +
        "<td>" +
        auctions[i].id +
        "</td>" +
        "<td>" +
        auctions[i].telefon.producator +
        " " +
        auctions[i].telefon.model +
        "</td>" +
        "<td>" +
        auctions[i].pret_initial.valoare +
        " " +
        auctions[i].pret_initial.moneda +
        "</td>" +
        "<td>" +
        auctions[i].durata.valoare +
        " " +
        auctions[i].durata.unitate_timp +
        "</td>" +
        "<td>" +
        auctions[i].tip +
        "</td>" +
        "<td>" +
        auctions[i].data +
        "</td>";

      for (var j = 0; j < auctions[i].persoane.persoana.length; j++) {
        if (auctions[i].persoane.persoana[j].suma_licitata.valoare > max_sum) {
          max_sum = auctions[i].persoane.persoana[j].suma_licitata.valoare;
          nume_castigator =
            auctions[i].persoane.persoana[j].nume +
            " " +
            auctions[i].persoane.persoana[j].prenume;
        }
      }
      auction_table += "<td>" + nume_castigator + "</td></tr>";
      max_sum = 0;
    }
    document.getElementById("json_auctions_table").innerHTML = auction_table;

    let phones = jsonObj.licitatii.licitatie;
    let phone_table =
      "<p id='json_phone_table_title'><b>Table with phones on auction:</b></p>";
    phone_table +=
      "<tr><th>Producator</th><th>Model</th><th>Procesor</th><th>Capacitate baterie</th><th>Valoare telefon</th></tr>";
    for (var i = 0; i < phones.length; i++) {
      phone_table +=
        "<tr>" +
        "<td>" +
        phones[i].telefon.producator +
        "</td>" +
        "<td>" +
        phones[i].telefon.model +
        "</td>" +
        "<td>" +
        phones[i].telefon.procesor +
        "</td>" +
        "<td>" +
        phones[i].telefon.capacitate_baterie.valoare +
        " " +
        phones[i].telefon.capacitate_baterie.unitate_masura +
        "</td>" +
        "<td>" +
        phones[i].telefon.valoare_produs.valoare +
        " " +
        phones[i].telefon.valoare_produs.moneda +
        "</td>" +
        "</tr>";
    }
    document.getElementById("json_phones_table").innerHTML = phone_table;

    let peoples = jsonObj.licitatii.licitatie;
    let people_table =
      "<p id='json_people_table_title'><b>Table with bidders:</b></p>";
    people_table +=
      "<tr><th>Nume</th><th>Prenume</th><th>Email</th><th>Numar Telefon</th><th>Suma licitata</th></tr>";
    for (var i = 0; i < peoples.length; i++) {
      let person = peoples[i].persoane.persoana;
      for (var j = 0; j < person.length; j++) {
        people_table +=
          "<tr>" +
          "<td>" +
          person[j].nume +
          "</td>" +
          "<td>" +
          person[j].prenume +
          "</td>" +
          "<td>" +
          person[j].email +
          "</td>" +
          "<td>" +
          person[j].numar_telefon +
          "</td>" +
          "<td>" +
          person[j].suma_licitata.valoare +
          " " +
          person[j].suma_licitata.moneda +
          "</td>" +
          "</tr>";
      }
    }
    document.getElementById("json_peoples_table").innerHTML = people_table;

    if (showJsonTable == 1) {
      document.getElementById("json_auctions_table").style.display = "none";
      document.getElementById("json_phones_table").style.display = "none";
      document.getElementById("json_peoples_table").style.display = "none";
      showJsonTable = 0;
    } else {
      showJsonTable = 1;
      document.getElementById("json_auctions_table").style.display = "initial";
      document.getElementById("json_phones_table").style.display = "initial";
      document.getElementById("json_peoples_table").style.display = "initial";
    }
  }
}

function onclick_showStylesheet() {
  if (xmlContent == null) {
    xml_warning_message.style.display = "block";
  } else {
    xml_warning_message.style.display = "none";

    var xsltProcessor = new XSLTProcessor();

    var myXMLHTTPRequest = new XMLHttpRequest();
    myXMLHTTPRequest.open("GET", "BuricAndreiAlexandru.xsl", false);
    myXMLHTTPRequest.send(null);

    var xslStylesheet = myXMLHTTPRequest.responseXML;
    xsltProcessor.importStylesheet(xslStylesheet);

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlContent, "text/xml");

    var fragment = xsltProcessor.transformToFragment(xmlDoc, document);

    if (showStylesheetTable == 0) {
      document.getElementById("xslt_test").appendChild(fragment);
      showStylesheetTable = 1;
    } else if (showStylesheetTable == 1) {
      document.getElementById("xslt_test").innerHTML = "";
      showStylesheetTable = 0;
    }
  }
}
