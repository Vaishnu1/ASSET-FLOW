import { FormGroup, FormControl } from '@angular/forms';

export const BASE_FORM_GROUP_CONST = new FormGroup({
    columnName:new FormControl('updatedDt'),
    direction:new FormControl('desc'),
    pageNumber:new FormControl('0'),
    recordsPerPage:new FormControl('10'),

     updatedDtDisp:new FormControl(''),

     createdDtDisp:new FormControl(''),

     activeDisp:new FormControl(''),

     logInUserOrgId:new FormControl(''),


     logInUserLocId:new FormControl(''),


     logInUserId:new FormControl(''),


     searchValue:new FormControl(''),


     searchValue1:new FormControl(''),


     orgName:new FormControl(''),

     orgIdStr:new FormControl(''),


     orgId:new FormControl(''),


     locationId:new FormControl(''),


     locationName:new FormControl(''),


     createdBy:new FormControl(''),

     createdDt:new FormControl(''),

     updatedBy:new FormControl(''),


     updatedDt:new FormControl(''),


     active:new FormControl(true)
});