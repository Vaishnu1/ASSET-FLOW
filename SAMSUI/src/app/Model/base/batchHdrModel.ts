import { BaseModel } from './baseModel';

export class ModelBatchHdr extends BaseModel{

    public batchHdrId?: number;

    public batchName?: string;

    public reference1?: string;

    public reference2?: string;

    public qty?: number;

    public pageNumber ?: number;

    public recordsPerPage ?: number;

    public srIdToBeReferencedForBatchUpdate?: number;

    public assetIdToBeReferencedForBatchUpdate?: number;

    public assetIdListPresentInBatch?: [];

    public installationWoList?: [];

    public remarks?: string;

}

