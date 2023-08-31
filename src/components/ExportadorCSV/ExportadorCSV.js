export const exportToCsv = (datos) =>{
    let CsvString = "";
    datos.forEach((data)=> {
      CsvString += `${data.toFixed(4)}\r\n`;
    });
    const parsedCsvString = CsvString.replaceAll('.',',')
    CsvString = "data:application/csv," + encodeURIComponent(parsedCsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString );
    x.setAttribute("download","distribucion.csv");
    document.body.appendChild(x);
    x.click();
  }