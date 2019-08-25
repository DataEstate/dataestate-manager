import { ApiAction, EntityType } from '../constants';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchEstatesIfNeeded } from './ApiActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const apiConfig = {
  apiRoot: "https://test",
  authMode: "apiKey",
  apiKey: "1234"
};

describe('Async Estates endpoint related API actions. ', ()=>{
  beforeEach(()=> {
    fetch.resetMocks();
  });

  //Fetch Estates
  it('Fetch estates if needed', ()=> {
    const mockBody = [
      {
        "id": "12345",
        "name": "Estate 1"
      },
      {
        "id": "4444",
        "name": "Estate 2"
      }
    ];
    fetch.mockResponse(JSON.stringify(mockBody));
    const expectedActions = [
      {
        type: ApiAction.REQUEST_GET,
        entityType: EntityType.ESTATE,
        params: {}
      },
      {
        type: ApiAction.RECEIVED_GET,
        entityType: EntityType.ESTATE,
        params: {},
        list: mockBody
      },
    ];
    const store = mockStore({
      estates: {
        searchParams: {},
        list: [],
        didInvalidate: true,
        isFetching: false
      }
    });
    return (
      store.dispatch(fetchEstatesIfNeeded())
      .then(()=>{
        expect(store.getActions()).toEqual(expectedActions);
      })
    );
  })
})