import { BackendInterface } from '../Backend/Backend';
import ValueStore from './ValueStore';
import { ElementDriver } from './ElementDriver';
import { PluginInterface } from './plugins/PluginInterface';
import BackendResponse from '../Backend/BackendResponse';
import { ModelBinding } from '../Directive/get_model_binding';
export type ComponentFinder = (currentComponent: Component, onlyParents: boolean, onlyMatchName: string | null) => Component[];
export default class Component {
    readonly element: HTMLElement;
    readonly name: string;
    readonly listeners: Map<string, string[]>;
    private readonly componentFinder;
    private backend;
    private readonly elementDriver;
    id: string | null;
    fingerprint: string | null;
    readonly valueStore: ValueStore;
    private readonly unsyncedInputsTracker;
    private hooks;
    defaultDebounce: number;
    private backendRequest;
    private pendingActions;
    private pendingFiles;
    private isRequestPending;
    private requestDebounceTimeout;
    private nextRequestPromise;
    private nextRequestPromiseResolve;
    private children;
    private parent;
    private externalMutationTracker;
    constructor(element: HTMLElement, name: string, props: any, listeners: Array<{
        event: string;
        action: string;
    }>, componentFinder: ComponentFinder, fingerprint: string | null, id: string | null, backend: BackendInterface, elementDriver: ElementDriver);
    _swapBackend(backend: BackendInterface): void;
    addPlugin(plugin: PluginInterface): void;
    connect(): void;
    disconnect(): void;
    on(hookName: string, callback: (...args: any[]) => void): void;
    off(hookName: string, callback: (...args: any[]) => void): void;
    set(model: string, value: any, reRender?: boolean, debounce?: number | boolean): Promise<BackendResponse>;
    getData(model: string): any;
    action(name: string, args?: any, debounce?: number | boolean): Promise<BackendResponse>;
    files(key: string, fileList: FileList): void;
    render(): Promise<BackendResponse>;
    getUnsyncedModels(): string[];
    addChild(child: Component, modelBindings?: ModelBinding[]): void;
    removeChild(child: Component): void;
    getParent(): Component | null;
    getChildren(): Map<string, Component>;
    emit(name: string, data: any, onlyMatchingComponentsNamed?: string | null): void;
    emitUp(name: string, data: any, onlyMatchingComponentsNamed?: string | null): void;
    emitSelf(name: string, data: any): void;
    private performEmit;
    private doEmit;
    updateFromNewElementFromParentRender(toEl: HTMLElement): void;
    onChildComponentModelUpdate(modelName: string, value: any, childComponent: Component): void;
    private tryStartingRequest;
    private performRequest;
    private processRerender;
    private calculateDebounce;
    private clearRequestDebounceTimeout;
    private debouncedStartRequest;
    private renderError;
    private getChildrenFingerprints;
    private resetPromise;
}
export declare function proxifyComponent(component: Component): Component;
