import { GetActionType } from './types';

export function createGetThunkActionType(actionPrefix: string): GetActionType {
  return (...suffixComponents: Array<string | number>): string => {
    suffixComponents[0] = `${suffixComponents[0]}_THUNK`;
    const actionSuffix = `/${suffixComponents.join('/')}`;

    return `${actionPrefix}${actionSuffix}`;
  };
}
