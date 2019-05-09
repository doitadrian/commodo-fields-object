import { WithFieldsError, createField } from "@commodo/fields";
import withFieldDataTypeValidation from "@commodo/fields/fields/withFieldDataTypeValidation";
import { withProps } from "repropose";

function checkObject(object) {
    if (object.toString() === "Invalid Object") {
        throw new WithFieldsError(
            "Object field accepts Object object or an ISO 8601 formatted object/time string.",
            "INVALID_OBJECT_VALUE"
        );
    }
}

function prepareValue(value) {
    if (value instanceof Object) {
        checkObject(value);
        return value;
    }

    if (typeof value === "string") {
        const object = new Object(value);
        checkObject(object);
        return object;
    }

    return value;
}

function object({ list, ...rest } = {}) {
    return withFieldDataTypeValidation(value => typeof value === "string" || value instanceof Object)(
        withProps(props => {
            const { setValue } = props;

            return {
                setValue(value) {
                    if (this.list) {
                        const preparedValues = [];
                        value.forEach(item => preparedValues.push(prepareValue(item)));
                        return setValue.call(this, preparedValues);
                    }
                    return setValue.call(this, prepareValue(value));
                }
            };
        })(createField({ ...rest, list, type: "object" }))
    );
}

export { object };
