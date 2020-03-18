import { IDataRetrieverParams } from "../_types/IDataRetrieverParams";
/**
 * Retrieves whether data is loading from a data getter
 * @param getter The getter to get the loading state from
 * @returns Whether the getter is loading
 */
export declare const isLoading: (getter: (l: IDataRetrieverParams) => void) => boolean;
