import React, { useState } from 'react';
import DataGrid,{ Column } from 'devextreme-react/data-grid';

function MasterDetailView(props) {

    const [data, setdata] = useState(props.data.data.provinces)
    return ( 
        <DataGrid id="grid-container"
        height={150}
        dataSource={data}
        keyExpr="id"
        showBorders={true}
      >
         <Column dataField="name"  caption="Name" />
        <Column dataField="population" caption="Population" />
        <Column dataField="median_age"  caption="Median"/>
        <Column dataField="fertility" caption="Fertility" />
        <Column dataField="average_age" caption="Average Age" />
      </DataGrid>
    )
}

export default MasterDetailView;