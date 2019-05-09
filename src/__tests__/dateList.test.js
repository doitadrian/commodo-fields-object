import { object } from "commodo-fields-object";
import { withFields, WithFieldsError } from "@commodo/fields";

import { compose } from "ramda";

const Model = compose(withFields({ field: object({ list: true }) }))(function() {});

test("should accept string and Object values", () => {
    const model = new Model();

    const isoString1 = "2019-03-27T06:48:37.506Z";
    const isoString2 = "2019-04-27T06:48:37.506Z";

    const object = new Object();
    model.field = [isoString1, object];
    expect(model.field).toEqual([new Object(isoString1), object]);

    model.field = [isoString2, object];
    expect(model.field).toEqual([new Object(isoString2), object]);

    model.field = [null];
    expect(model.field).toEqual([null]);

    model.field = [undefined];
    expect(model.field).toEqual([undefined]);

    const object1 = new Object();
    const object2 = new Object();
    model.field = [object1, object2];
    expect(model.field).toEqual([object1, object2]);
});

[[123], [0], [0.5], [{}], [[]], [false]].forEach(value => {
    test(`string field shouldn't accept array ${typeof value[0]}s`, async () => {
        const model = new Model();

        let error = null;
        try {
            model.field = value;
        } catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(WithFieldsError);
        expect(error.code).toEqual(WithFieldsError.FIELD_DATA_TYPE_ERROR);
    });
});
