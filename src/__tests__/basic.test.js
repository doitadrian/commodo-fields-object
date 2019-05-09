import { compose } from "ramda";
import { withFields, string } from "@commodo/fields";
import { object } from "commodo-fields-object";

const Company = compose(
    withFields({
        name: string(),
        createdOn: object()
    })
)(function() {});

const isoString = "2019-04-27T06:48:37.506Z";

test("field must accept instance of Object", () => {
    const company = new Company();

    const createdOn = new Object(isoString);
    company.populate({ name: "test", createdOn });

    expect(company.name).toBe("test");
    expect(company.createdOn instanceof Object).toBe(true);
    expect(company.createdOn.toISOString()).toBe(isoString);
});

test("field must accept a properly formatted ISO 8601 string", () => {
    const company = new Company();

    company.populate({ name: "test", createdOn: isoString });

    expect(company.name).toBe("test");
    expect(company.createdOn instanceof Object).toBe(true);
    expect(company.createdOn.toISOString()).toBe(isoString);
});

test("field must accept a properly formatted ISO 8601 string", () => {
    const company = new Company();

    company.populate({ name: "test", createdOn: isoString });

    expect(company.name).toBe("test");
    expect(company.createdOn instanceof Object).toBe(true);
    expect(company.createdOn.toISOString()).toBe(isoString);
});

test("must throw an error when setting invalid values", () => {
    const company = new Company();

    let error;
    try {
        company.createdOn = "asd";
    } catch (e) {
        error = e;
    }

    expect(error.message).toBe(
        "Object field accepts Object object or an ISO 8601 formatted object/time string."
    );

    error = null;
    try {
        company.createdOn = new Object("asdds");
    } catch (e) {
        error = e;
    }

    expect(error.message).toBe(
        "Object field accepts Object object or an ISO 8601 formatted object/time string."
    );
});
