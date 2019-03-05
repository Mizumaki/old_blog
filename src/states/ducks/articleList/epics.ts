import { Action } from "redux";
import { of, concat } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { Epic, ofType } from "redux-observable";
import actions from "./actions";

interface IPayloadAction extends Action {
  type: string;
  payload?: any;
}

export interface IApi {
  date: string;
  lead: string;
  path: string;
  subCategory: string;
  title: string;
}

const fetchEpic: Epic<IPayloadAction> = actions$ =>
  actions$.pipe(
    ofType(actions.fetch.started.type),
    mergeMap((action: IPayloadAction) =>
      concat(
        of(actions.loading({ isLoading: true })),
        ajax.getJSON(action.payload.url).pipe(
          map((lists: IApi[]) =>
            actions.fetch.done({
              params: action.payload.url,
              result: { lists }
            })
          ),
          catchError(_ =>
            of(
              actions.fetch.failed({
                params: action.payload.url,
                error: { hasError: true }
              })
            )
          )
        ),
        of(actions.loading({ isLoading: false }))
      )
    )
  );

export default fetchEpic;
