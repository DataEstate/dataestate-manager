import { UserAction, ApiAction } from '../constants';
import reducer from './index.js';

let defaultState = {
  searchParams: {
    categories: "ACCOMM"
  },
  activeFilters: [],
  didInvalidate: false, 
  error: {},
  isFetching: false, 
  list: [],
  listData: {},
  listMeta: {}
}

describe('Search Parameters', ()=>{
  it('Should update the state with new search parameters. If allow many, then append in comma separated list.', ()=>{
    const initialState = { ...defaultState };
    let paramUpdateAction = {
      type: ApiAction.PARAM_UPDATED,
      param: {
        categories: "ATTRACTION"
      }
    };
    //Update
    expect(reducer(initialState, paramUpdateAction))
      .toEqual(
        {
          ...initialState, 
          searchParams: {
            categories: "ATTRACTION"
          },
          didInvalidate: true
        }
      )
  });
  //REMOVE PARAMETER
  it('Remove parameter from states. If allowMany, then remove values only. ', ()=>{
    const initialState = {
      ...defaultState, searchParams: {
        size: 10,
        categories: "ACCOMM,ATTRACTION"
      }};
    let paramRemoveAction = {
      type: ApiAction.PARAM_REMOVED,
      param: {
        categories: "ATTRACTION"
      }
    };
    //Remove Single
    expect(reducer(initialState, paramRemoveAction))
      .toEqual(
        {
          ...initialState,
          searchParams: {
            size: 10
          },
          didInvalidate: true
        }
      );
  });
});

describe('Active Filters', ()=>{
  it('SINGLE filter update: Should update state with new filter of the same name', ()=>{
    const initialState = { ...defaultState, activeFilters: [
      {
        id: 1,
        name: "Category",
        value: "Attraction"
      },
      {
        id: 3,
        name: "Category", 
        value: "Event"
      },
      {
        id: 4,
        name: "State",
        value: "NSW"
      }
    ]};
    //Single - name found. 
    const singleFilterActionWithSameName = {
      type: UserAction.FILTER_UPDATED,
      filter: {
        id: 2,
        name: "Category",
        value: "Accommodation"
      },
      allowMany: false
    };
    expect(reducer(initialState, singleFilterActionWithSameName))
      .toEqual(
        {
          ...initialState,
          activeFilters: [ 
            {
              id: 4,
              name: "State",
              value: "NSW"
            },
            {
              id: 2,
              name: "Category",
              value: "Accommodation"
            }
          ]
        }
      );
    //Single - name and ID not matching. 
    const singleFilterAction = {
      type: UserAction.FILTER_UPDATED,
      filter: {
        id: "subtype-hotel",
        name: "Subtype",
        value: "Hotel"
      },
      allowMany: false
    };
    expect(reducer(initialState, singleFilterAction))
      .toEqual(
        {
          ...initialState,
          activeFilters: [
            {
              id: 1,
              name: "Category",
              value: "Attraction"
            },
            {
              id: 3,
              name: "Category",
              value: "Event"
            },
            {
              id: 4,
              name: "State",
              value: "NSW"
            },
            {
              id: "subtype-hotel",
              name: "Subtype",
              value: "Hotel"
            }
          ]
        }
      );
  });
  it('Multiple filter update: Should update state with new filters, as long as ID is different. ', ()=>{
    //Multiple
    const initialState = {
      ...defaultState, 
      activeFilters: [
        {
          id: 1,
          name: "Category",
          value: "Attraction"
        },
        {
          id: 3,
          name: "Category",
          value: "Event"
        },
        {
          id: 4,
          name: "State",
          value: "NSW"
        }
      ]
    };
    const multipleFilterUpdate = {
      type: UserAction.FILTER_UPDATED,
      filter: {
        id: 2,
        name: "Category",
        value: "Accommodation"
      },
      allowMany: true
    };
    expect(reducer(initialState, multipleFilterUpdate))
      .toEqual(
        {
          ...initialState,
          activeFilters: [
            {
              id: 1,
              name: "Category",
              value: "Attraction"
            },
            {
              id: 3,
              name: "Category",
              value: "Event"
            },
            {
              id: 4,
              name: "State",
              value: "NSW"
            },
            {
              id: 2,
              name: "Category",
              value: "Accommodation"
            }
          ]
        }
      );
    //Update with duplication. list won't change, but the order would be. 
    const multipleFilterUpdateExistingId = {
      type: UserAction.FILTER_UPDATED,
      filter: {
        id: 3,
        name: "Category",
        value: "Event"
      },
      allowMany: true
    };
    expect(reducer(initialState, multipleFilterUpdateExistingId))
      .toEqual(
        {
          ...initialState,
          activeFilters: [
            {
              id: 1,
              name: "Category",
              value: "Attraction"
            },
            {
              id: 4,
              name: "State",
              value: "NSW"
            },
            {
              id: 3,
              name: "Category",
              value: "Event"
            }
          ]
        }
      );
  });    
    

  it('Should remove filter with the filter ID.', ()=>{
    const initialState = {
      ...defaultState, activeFilters: [
        {
          id: 1,
          name: "Category",
          value: "Attraction"
        }
      ]
    };
    //Test duplication - Multiple
    let filterRemoveAction = {
      type: UserAction.FILTER_REMOVED,
      filterId: 1
    };
    //Remove
    expect(reducer(initialState, filterRemoveAction))
      .toEqual(
        {
          ...initialState,
          activeFilters: []
        }
      )
  })
});