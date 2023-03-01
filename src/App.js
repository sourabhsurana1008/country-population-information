import React, { useEffect, useState } from "react";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid,{ Column, MasterDetail } from 'devextreme-react/data-grid';
import DetailTemplate from './DetailTemplate';

function App() {
  const fetchData = () => {
    return fetch("http://localhost:8080/api/countries")
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">

      <DataGrid id="grid-container"
        dataSource={data}
        keyExpr="id"
        showBorders={true}
      >
        <Column dataField="name"  caption="Name" />
        <Column dataField="population" caption="Population" />
        <Column dataField="median_age"  caption="Median Age"/>
        <Column dataField="fertility" caption="Fertility" />
        <Column dataField="average_age" caption="Average Age" />
        <MasterDetail
          enabled={true}
          component={DetailTemplate}
        />
      </DataGrid>
    </div>
  );
}

export default App;