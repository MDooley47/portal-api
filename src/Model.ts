import {Portal} from "./Portal";
import {ModelInterface, ModelInterfaceStatic} from "./interfaces/ModelInterface";

export abstract class Model {
    protected attributes: JSON;

    protected constructor(params?: any) {
        // @ts-ignore
        this.attributes = {};
        if (params !== undefined && params !== null)
            this.addAttributes(params)
    }

    addAttributes(params: any) {
        const keys = Object.keys(params);

        for (let key of keys) {
            this.addAttribute(key, params[key]);
        }
    }

    addAttribute(name: string, value: any) {
        // @ts-ignore
        this.attributes[name] = value;
    }

    get(name: string) {
        if (this.attributes.hasOwnProperty(name)) {
            // @ts-ignore
            return this.attributes[name];
        } else {
            // @ts-ignore
            return this[name];
        }
    }

    set(name: string, value: any) {
        this.addAttribute(name, value);
    }

    static all(model_name: string) {
        return Portal.API.list(model_name);
    }

    static find(model_name: string, id: string) {
        return Portal.API.view(model_name, id);
    }

    save(model_name: string) {
        return Portal.API.add(model_name, this.attributes);
    }

    edit(model_name: string, id: string) {
        return Portal.API.edit(model_name, id, this.attributes);
    }

    delete(model_name: string, id: string) {
        return Portal.API.delete(model_name, id);
    }

    form(model_name: string) {
        return Portal.API.form(model_name);
    }

    /**
     * Compares two models.
     *
     * Returns 0 if models are of the same type and have the same slug.
     * The return value is negative if they are different model types
     * and positive if they are different slugs but of the same type.
     *
     * @param model1
     * @param model2
     *
     * @return number
     */
    static compare(model1: ModelInterfaceStatic & ModelInterface, model2: ModelInterfaceStatic & ModelInterface): number {
        let out: number;

        if (model1.model_name !== model2.model_name) {
            out = -1;
        } else if (model1.get('slug') !== model2.get('slug')) {
            out = 1;
        } else out = 0;

        return out;
    }
}