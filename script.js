function convert() {
    var file = document.getElementById('fileInput').files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        var sheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheetName];
        var rows = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
        for (var i = 1; i < rows.length; i++) {
            xml += '\t<row>\n';
            for (var j = 0; j < rows[i].length; j++) {
                xml += '\t\t<' + rows[0][j] + '>' + rows[i][j] + '</' + rows[0][j] + '>\n';
            }
            xml += '\t</row>\n';
        }
        xml += '</root>';
        var blob = new Blob([xml], {type: 'text/xml'});
        var filename = file.name + '.xml';
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement('a');
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
}

window.onload = function() {
    var password = prompt("Please enter the password to proceed:");
  
    if (password === "jakarta2612") {
      // Do something here if the password is correct
      console.log("Correct password entered!");
    } else {
      // Do something else here if the password is incorrect
      console.log("Incorrect password entered.");
    }
  };
  
