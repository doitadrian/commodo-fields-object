import { object } from "commodo-fields-object";
import { withFields, WithFieldsError } from "@commodo/fields";

import { compose } from "ramda";

const Model = compose(withFields({ exampleField: object() }))(function() {});
describe("field string test", () => {
    test("should accept string (ISO 8601) values", () => {
        const model = new Model();

        const isoString1 = "2019-03-27T06:48:37.506Z";
        const isoString2 = "2019-04-27T06:48:37.506Z";

        model.exampleField = isoString1;
        expect(model.exampleField.toISOString()).toEqual(isoString1);

        model.exampleField = isoString2;
        expect(model.exampleField.toISOString()).toEqual(isoString2);

        model.exampleField = null;
        expect(model.exampleField).toEqual(null);

        model.exampleField = undefined;
        expect(model.exampleField).not.toBeDefined();
    });

    [123, 0, 0.5, {}, [], false].forEach(value => {
        test(`shouldn't accept ${typeof value}`, async () => {
            const model = new Model();

            let error = null;
            try {
                model.exampleField = value;
            } catch (e) {
                error = e;
            }

            expect(error).toBeInstanceOf(WithFieldsError);
            expect(error.code).toEqual(WithFieldsError.FIELD_DATA_TYPE_ERROR);
        });
    });
});
