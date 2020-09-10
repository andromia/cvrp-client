export const checkFileData = (data: Object) => {
    /** 
     * Form utility check for geocodes.
     * 
     * TODO: add unit data check.
     */
    if (!data[0].hasOwnProperty("latitude") || !data[0].hasOwnProperty("longitude")) {
        alert("latitude and longitude fields are required in the damand file!");
    }
}

export const checkNum = (val: any) => {
    /**
     * Form utility check for numeric values.
     */
    if (!isFinite(val)) {
        alert("value is not a number!");
    }
}

export const checkUnit = (unit: String, data: any) => {
    /**
     * Form utitlity check for validating that the 
     * *unit* field exists in the data provided.
     */
    if (!data[0].hasOwnProperty(unit)) {
        alert("unit entered cannot be found in the demand file!");
    }
}