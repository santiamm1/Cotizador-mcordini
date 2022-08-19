let boton = document.getElementById("btnPrincipal");

boton.addEventListener("click", escribirSuperficie);  
function escribirSuperficie () {
  let superficieNueva= document.getElementById("superficieNueva").value;
  let contenido2=superficieNueva +" "+"ha";
  document.getElementById("resultado").innerHTML = contenido2;
}

boton.addEventListener("click", escribirCapacidad);
function escribirCapacidad() {
    let capacidadNueva = document.getElementById("capacidadNueva").value;
    let contenido =capacidadNueva+" "+"l";
    document.getElementById("resultado2").innerHTML = contenido;
}

boton.addEventListener("click", escribirTasaDeAplicacion);
function escribirTasaDeAplicacion () {
    let tasa= document.getElementById("tasa").value;
    var contenido4 = tasa+" "+"l/ha";
    document.getElementById("resultado3").innerHTML = contenido4;
}


boton.addEventListener("click", calcularAutonomia);
function calcularAutonomia () {
    let autonomiaNew= document.getElementById("capacidadNueva").value/ document.getElementById("tasa").value;
    var contenido4 = autonomiaNew;
    document.getElementById("resultado4").innerHTML = contenido4;
}

boton.addEventListener("click", calcularRecargas);
function calcularRecargas () {
    let recargasNew= document.getElementById("superficieNueva").value/(document.getElementById("capacidadNueva").value/ document.getElementById("tasa").value);
    var contenido5 =recargasNew;
    document.getElementById("resultado5").innerHTML = contenido5;
}

var tableEditorModule = (function() {
  const table           = document.getElementById("tableBody");
  const pagination      = document.getElementById("pagination");
  const addRowBtn       = document.getElementById("addRow");
  const addRowForm      = document.getElementById("addRowForm");
  const clearTableBtn   = document.getElementById("clearTable");
  const exportTableBtn  = document.getElementById("exportData");
  const exportTableForm = document.getElementById("exportTableForm");
  const demoDataBtn     = document.getElementById("demoData");
  const delRowsBtn      = document.getElementById("delRow");
  const importDataBtn   = document.getElementById("importDataBtn");
  const importDataArea  = document.getElementById("textArea");
  const exportDataBtn   = document.getElementById("exportDataBtn");
  const sortIdBtn       = document.getElementById("sortId");
  const sortNameBtn     = document.getElementById("sortName");
  const sortQtyBtn      = document.getElementById("sortQty");
  const sortAvailBtn    = document.getElementById("sortAvail");
  const filterNameInp   = document.getElementById("filterName");
  const initStr         = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const strLength       = initStr.length;
  const paginationLen   = 10;


  let tableData         = [];
  let selectedTable     = [];

  function drawTable(arr, num = 0) {
    arr = arr || tableData.slice(num, 10);

    let newTableBody = arr.map(function(row) {
      return `
        <tr>
          <th scope="row">${row.id}</th>
          <td>${row.name}</td>
          <td>${row.qty}</td>
          <td>${row.prodcarga}</td>
          
          
          <td><input type="checkbox"></td>
        </tr>`}).join("");

    table.innerHTML = newTableBody;
    addPagination(tableData);
  };

  function addPagination(arr) {
    let paginationList = "";
    let pageNum = Math.ceil(arr.length / paginationLen);
    for (var i = 0; i < pageNum; i++) {
      paginationList += `
        <li><a href="#${i+1}">${i+1}</a></li>
        `;
      }
      pagination.innerHTML = paginationList;
    };

    pagination.addEventListener("click", function(e) {
      if (e.target.tagName === "A") {
        e.preventDefault();
        let start = +e.target.href.split("#")[1] * 10 - 10;
        let end   = +start + 10
        selectedTable = tableData.slice(start, end);
        drawTable(selectedTable);
      }
    });

  function addNewRow() {
    addRowBtn.addEventListener("click", function() {
      addRowForm.classList.toggle("hidden");
    });





    addRowForm.addEventListener("submit", function(e) {
      e.preventDefault();
     
      let taplicacion     = document.getElementById("taplicacion");
      let dosis           = document.getElementById("dosis");
      let tasa= document.getElementById("tasa").value;
      let superficieNueva= document.getElementById("superficieNueva").value;
      let capacidadNueva = document.getElementById("capacidadNueva").value;
      let autonomiaNew= document.getElementById("capacidadNueva").value/ document.getElementById("tasa").value;
      let recargasNew= document.getElementById("superficieNueva").value/(document.getElementById("capacidadNueva").value/ document.getElementById("tasa").value);

      let newDataSet = {
        "qty"   : addRowForm.pQty.value,  
        "id"    : addRowForm.dosis.value,
        "name"  : addRowForm.pName.value,
        "prodcarga" :autonomiaNew*(addRowForm.dosis.value),
      };

     tableData.push(newDataSet);
      addRowForm.querySelectorAll("input, select").forEach( (input) => input.value = "" );
      drawTable();
    });
  };

  function clearTable() {
    clearTableBtn.addEventListener("click", function() {
      tableData = [];
      drawTable();
    });
  };
  function recountIds() {
    tableData.map(function(item, i) {
      item.id = i + 1;
    });
  };

  function delRows() {
    delRowsBtn.addEventListener("click", function(e) {
      e.preventDefault();
      let tableRows = table.querySelectorAll("tr");
      let deleteRawsId = [];
      tableRows.forEach(function (tabelRow, i) {
        if (tabelRow.querySelector("input[type=checkbox]:checked")) {
          deleteRawsId.push(i + 1);
        }
      });
      for (var len = deleteRawsId.length-1, i = len; i >= 0; i--) {
        let index = deleteRawsId[i] -1 ;
        tableData.splice(index, 1);
      }
      recountIds();
      drawTable();
    });
  };

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function getRandString() {
    let finalStr = "";
    for (let i = 0, len = getRandom(3, 10); i < len; i++) {
      let randLetter = getRandom(0, strLength);
      finalStr += initStr[randLetter];
    };
    return finalStr;
  };


  let currentSortedColumn = "";

  function sortColumn(column, button) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      if(currentSortedColumn === column) {
        tableData.reverse();
      } else {
        tableData.sort((a,b) => a[column] > b[column] ? -1 : 1 );
        currentSortedColumn = column;
      }
    drawTable();
    });
  };

  function filterName() {
    filterNameInp.addEventListener("keyup", function() {
      let searchInp = this.value;
      let filteredArr = tableData.filter(data => data.name.toLowerCase().includes(searchInp));
      drawTable(filteredArr);
    });
    filterNameInp.addEventListener("focusout", function() {
      this.value = "";
      drawTable(selectedTable);
    });
  };

  function init() {
    sortColumn("id", sortIdBtn);
    sortColumn("name", sortNameBtn);
    sortColumn("qty", sortQtyBtn);
    sortColumn("avail", sortAvailBtn);
    addNewRow();
    clearTable();
    delRows();
    filterName();
  };
  return {
    init: init
    }
}());


tableEditorModule.init();