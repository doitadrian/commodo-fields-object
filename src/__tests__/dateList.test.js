import { object } from "commodo-fields-object";
import { withFields, WithFieldsError } from "@commodo/fields";

import { compose } from "ramda";

const Model = compose(withFields({ field: object({ list: true }) }))();

test("should accept string and Object values", () => {
    const model = new Model();

    model.field = [{}, []];
    expect(model.field).toEqual([{}, []]);

    model.field = [null];
    expect(model.field).toEqual([null]);

    model.field = [undefined];
    expect(model.field).toEqual([undefined]);

    function Something() {
        this.a = 123;
        this.b = 'abc';
    }

    const object1 = new Something();
    const object2 = new Something();

    model.field = [object1, object2];
    expect(model.field).toEqual([object1, object2]);
});

[[123], [0], [0.5], [true], [function() {}], [false]].forEach(value => {
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
