import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEstatesIfNeeded } from '../actions/ApiActions';
import { paramsUpdated, paramsRemoved } from '../../Common/actions/UserActions'; //TODO: UPDATE LOCATION
//Component
import { ActiveFilters } from '../../Common/components/ActiveFilters';
import { DropdownFilter } from '../../Common/containers/Filters';

class Manager extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.handleFilterChange = this.handleFilterChange.bind(this);
    dispatch(fetchEstatesIfNeeded());
  }
  //API Actions and parameters are handled here. 
  handleFilterChange(item, remove) {
    const { dispatch, searchParams } = this.props;
    console.log(item);
    if (!remove) {
      const paramValue = searchParams[item.name] ? [...searchParams[item.name].split(","), item.value] : [item.value];
      dispatch(paramsUpdated({
        [item.name]: paramValue.join(",")
      }));
    }
    else if (item.value=="") {
      dispatch(paramsRemoved({
        [item.name]: ""
      }));
    }
    else {
      //If remove
      const paramValue = searchParams[item.name] ? searchParams[item.name].split(",").filter(filter=>(filter !== item.value)) : [];
      if (paramValue.length <= 0) { //If param value is empty, then remove. 
        dispatch(paramsRemoved({
          [item.name]: ""
        }));
      }
      else { //update 
        dispatch(paramsUpdated({
          [item.name]: paramValue.join(",")
        }));
      }
    }
    //Add parameter for multi
    dispatch(fetchEstatesIfNeeded());
  }
  render() {
    const { searchParams, list, listData, listMeta, isFetching, lastUpdated, error, activeFilters } = this.props;
    const errorMessage = error ? error.message : "";
    //TODO: Make it into options
    const categoryFilters = [
      { value: "", text: "All"},
      { value: "ACCOMM", text: "Accommodation" },
      { value: "ATTRACTION", text: "Attraction" },
      { value: "TOUR", text: "Tour" }
    ]
    const stateFilters = [
      { value: "", text: "Any" },
      { value: "NSW", text: "New South Wales" },
      { value: "QLD", text: "Queensland" },
      { value: "VIC", text: "Victoria" }
    ];
    //Rows
    const listRows = list.map((estateId, index) => (
        <div className="estate row" key={index}>
          {listData[estateId].name} - {listData[estateId].category} - {listData[estateId].state_code}
        </div>
      )
    );
    const entityType = "estates";
    return (
      <div className="estate-manager-container">
        <div className="filters-container">
          <DropdownFilter name="categories" filterLabel="Cat"
            options={ categoryFilters } entityType={ entityType } onChange={ (item, remove, allowMany)=>{
              this.handleFilterChange(item, remove, allowMany);
            }} multiple={ true } />
          <DropdownFilter name="states" filterLabel="State"
            options={ stateFilters } entityType={ entityType } onChange={ this.handleFilterChange } />
        </div>
        <ActiveFilters filters={activeFilters} onFilterRemoved={ (item, remove, allowMany)=>
          this.handleFilterChange(item, remove, allowMany)
        } />
        <div className="notification-message">
          {
            errorMessage
          }
        </div>
        <div>
        {isFetching || errorMessage !== undefined ? (<div>Loading...</div>):listRows}
        </div>
      </div >
    );
  }
}

function mapStateToProps(state) {
  const { estates } = state;
  const { isFetching, lastUpdated, list, listData, listMeta, error, searchParams, activeFilters } = estates;
  return {
    searchParams,
    activeFilters,
    isFetching, 
    lastUpdated, 
    list, 
    listData, 
    listMeta,
    error
  }
}

export default connect(mapStateToProps)(Manager);