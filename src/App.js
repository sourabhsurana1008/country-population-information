import React, { useEffect, useState } from "react";
import DataGrid,{ Column, MasterDetail, FilterRow, Export } from 'devextreme-react/data-grid';
import DetailTemplate from './DetailTemplate';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

function App() {
  const fetchData = () => {
    return fetch(`${process.env.REACT_APP_API}countries`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <h4 class="mb-3  font-extrabold leading-none tracking-tight text-amber-500 md:text-3xl 
        lg:text-4xl dark:text-white text-center">World’s Population Dashboard</h4>
      <DataGrid id="grid-container"
        dataSource={data}
        keyExpr="id"
        showBorders={true}
       
      > <FilterRow visible={true} />
        <Export enabled={true} />
        <Column dataField="name"  caption="Name" alignment="center" />
        <Column dataField="population" caption="Population" alignment="center"  />
        <Column dataField="median_age"  caption="Median Age" alignment="center" />
        <Column dataField="fertility" caption="Fertility" alignment="center" />
        <Column dataField="average_age" caption="Average Age" alignment="center" />
        <MasterDetail
          enabled={true}
          component={DetailTemplate}
        />
      </DataGrid>
    </div>
  );
}

export default App;