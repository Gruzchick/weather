import { GetActionType } from './types';

export function createGetActionType(actionPrefix: string): GetActionType {
  return (...suffixComponents: Array<string | number>): string => {
    suffixComponents[0] = `${suffixComponents[0]}_ACTION`;
    const actionSuffix = `/${suffixComponents.join('/')}`;

    return `${actionPrefix}${actionSuffix}`;
  };
}
