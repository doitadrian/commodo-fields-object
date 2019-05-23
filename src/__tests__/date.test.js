import { object } from "commodo-fields-object";
import { withFields, WithFieldsError } from "@commodo/fields";

import { compose } from "ramda";

const Model = compose(withFields({ exampleField: object() }))(function() {});
describe("field string test", () => {
    test("should accept any object values", () => {
        const model = new Model();

        model.exampleField = {};
        expect(model.exampleField).toEqual({});

        model.exampleField = [];
        expect(model.exampleField).toEqual([]);

        model.exampleField = null;
        expect(model.exampleField).toEqual(null);

        model.exampleField = undefined;
        expect(model.exampleField).not.toBeDefined();
    });

    [123, 0, 0.5, "", false, true].forEach(value => {
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
