import React, { Component } from 'react';
import axios from 'axios'
import './fna.css';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getCountry } from './dataService';
import { getColDefs } from './colDef';
import { Select, MenuItem } from '@material-ui/core';
import { NumericCellEditor } from './NumericCellEditor'
import { PopupEditor } from './popupEditor'
import { SwitchCoverage } from './switchCoverage'


class FnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getCountry(),
      selected: 'IN',
      columnDefs: getColDefs(),
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      rowData: null,
      frameworkComponents: {
        'numericCellEditor': NumericCellEditor,
        'switchCoverage': SwitchCoverage,
        'popupEditor': PopupEditor
      }
    }
  }

  handleChange = event => {
    this.setState({ selected: event.target.value, name: event.target.name });
  };

  renderOptions() {
    return this.state.data.map((dt, i) => {
      //console.log(dt);
      return (
        <MenuItem
          label="Select a country"
          value={dt.country_code}
          key={i} name={dt.country_name}>{dt.country_name}</MenuItem>

      );
    });
  }

  getDummyData = () => {
    // eslint-disable-next-line
    const columns = getColDefs()
    const newCols = [];
    newCols['children']=columns;
    let rowData = [];
    let columnData = [];
    for(let i=0; i< 10; i++){
      rowData.push(this.getcolumnData(newCols, columnData));
      columnData = [];
    }
    // rowData.push(this.getcolumnData(newCols, columnData));
    // columnData = [];
    // rowData.push(this.getcolumnData(newCols, columnData));
    return rowData;
  }

  getcolumnData = (column, data) => {
    if(column.children!==undefined && column.children.length>0){
      for(let i=0; i<column.children.length;i++) {
        data = this.getcolumnData(column.children[i], data);
      }
    }
    else if(column.field!==undefined) {
      if(column.field!=='ClientName' && column.field!=='SalesPersonName' && column.field!=='Comments' && column.field!=='Coverage')
        data[column.field] = Math.floor(Math.random()*(5000-1+1)+1);
      else if(column.field==='Coverage')
        data[column.field] =Math.floor(Math.random()*(5000-1+1)+1) > 2000;
      else
        data[column.field] ='Test Data';
    }
    return data;
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    // const updateColumnData = data => {
    //   this.setState({ columnDefs: data });
    // };

    const updateRowData = data => {
      this.setState({ rowData: data });
    };

    // https://api.myjson.com/bins/1d4gyz,  https://api.myjson.com/bins/e2dsb    -- Column Data
    // https://api.myjson.com/bins/ohc8r,   https://api.myjson.com/bins/163wdn     -- row data

    // axios.get('test.json')
    //   .then(res => {
    //     updateColumnData(res.data);
    //   })

    axios.get('https://api.myjson.com/bins/ohc8r')
      .then(res => {
        updateRowData(this.getDummyData());
        // updateRowData(res.data);
      })

    // const httpRequest = new XMLHttpRequest();
    // httpRequest.open(
    //   "GET",
    //   "https://api.myjson.com/bins/163wdn"
    // );
    // httpRequest.send();
    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //     updateRowData(httpRequest.responseText);
    //   }
    // };

    // this below code is giving error
    // params.api.addGlobalListener(function(type, event) {
    //   if (type.indexOf("column") >= 0) {
    //     console.log("Got column event: ", event);
    //   }
    // });
  };

  render() {
    return (
      <div className="App">
        {/* <h1> Welcome to FnA Portal </h1> */}
        { console.log(this.state.selected)}
        <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
          {this.renderOptions()}
        </Select>
        <h3>Selected Country - {this.state.selected}</h3>
        <div
          className="ag-theme-balham"
          style={{
            height: '600px',
            width: '1200px'
          }}
        >
          <AgGridReact
            defaultColDef={this.state.defaultColDef}
            columnDefs={this.state.columnDefs}
            floatingFilter={true}
            frameworkComponents = {this.state.frameworkComponents}
            rowData={this.state.rowData}
            stopEditingWhenGridLosesFocus={true}
            onGridReady={this.onGridReady}>
          </AgGridReact>
        </div>
      </div>
    );
  }
}

export default FnA;
