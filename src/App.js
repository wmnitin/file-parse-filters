import React, { useState } from 'react';
import './App.css';

function App() {

  const [fileData, fileDataChange] = useState(null)
  const [delimiter, setDelimiter] = useState(',');
  const [row, setRow] = useState(2);


  const readFile = (event) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = (e.target.result)
      parseFile(text)
      // fileDataChange(text)
    };
    reader.readAsText(event.target.files[0])
  }

  const parseFile = (file) => {
    const fileRowArr = file.split('\n');
    fileDataChange(fileRowArr);
  }

  const changeDelimeter = (e) => {
    setDelimiter(e.target.value)
  }

  const changeRow = (e) => {
    setRow(e.target.value)
  }

  return (
    <div>
      <div className="FileUpload">
        <input type="file" onChange={readFile} />
      </div>
      {
        fileData && <>
          <div>
            <p>
              <span>Delimiter: <input value={delimiter} onChange={changeDelimeter} /></span>
              <span className="leftPadding">Lines: <input value={row} onChange={changeRow} /></span>
            </p>
          </div>
          <table>{
            fileData.map((file, index) => {
              if (index < row) {
                const fileArr = delimiter ? file.split(delimiter) : file.split(',');
                return <tr>
                  {
                    fileArr.map((data) => {
                      return <td>{data}</td>
                    })
                  }
                </tr>
              } else {
                return null
              }
            })
          }
          </table>
        </>
      }
    </div>
  );
}

export default App;
