import { createField } from "@commodo/fields";
import withFieldDataTypeValidation from "@commodo/fields/fields/withFieldDataTypeValidation";

function object(options = {}) {
    return withFieldDataTypeValidation(value => typeof value === "object")(
        createField({ ...options, type: "object" })
    );
}

export { object };
