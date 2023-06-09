import { Uri, Event, Disposable, SourceControl, SourceControlResourceGroup, Memento, OutputChannel } from 'vscode';
import { Repository } from './repository';
import { Git } from './git';
import { APIState as State, RemoteSourceProvider, CredentialsProvider, PushErrorHandler, PublishEvent } from './api/git';
import { Askpass } from './askpass';
import { IRemoteSourceProviderRegistry } from './remoteProvider';
import { IPushErrorHandlerRegistry } from './pushError';
export interface ModelChangeEvent {
    repository: Repository;
    uri: Uri;
}
export interface OriginalResourceChangeEvent {
    repository: Repository;
    uri: Uri;
}
export declare class Model implements IRemoteSourceProviderRegistry, IPushErrorHandlerRegistry {
    readonly git: Git;
    private readonly askpass;
    private globalState;
    private outputChannel;
    private _onDidOpenRepository;
    readonly onDidOpenRepository: Event<Repository>;
    private _onDidCloseRepository;
    readonly onDidCloseRepository: Event<Repository>;
    private _onDidChangeRepository;
    readonly onDidChangeRepository: Event<ModelChangeEvent>;
    private _onDidChangeOriginalResource;
    readonly onDidChangeOriginalResource: Event<OriginalResourceChangeEvent>;
    private openRepositories;
    get repositories(): Repository[];
    private possibleGitRepositoryPaths;
    private _onDidChangeState;
    readonly onDidChangeState: Event<State>;
    private _onDidPublish;
    readonly onDidPublish: Event<PublishEvent>;
    firePublishEvent(repository: Repository, branch?: string): void;
    private _state;
    get state(): State;
    setState(state: State): void;
    get isInitialized(): Promise<void>;
    private remoteSourceProviders;
    private _onDidAddRemoteSourceProvider;
    readonly onDidAddRemoteSourceProvider: Event<RemoteSourceProvider>;
    private _onDidRemoveRemoteSourceProvider;
    readonly onDidRemoveRemoteSourceProvider: Event<RemoteSourceProvider>;
    private pushErrorHandlers;
    private disposables;
    constructor(git: Git, askpass: Askpass, globalState: Memento, outputChannel: OutputChannel);
    private doInitialScan;
    private scanWorkspaceFolders;
    private onPossibleGitRepositoryChange;
    private eventuallyScanPossibleGitRepository;
    private eventuallyScanPossibleGitRepositories;
    private onDidChangeWorkspaceFolders;
    private onDidChangeConfiguration;
    private onDidChangeVisibleTextEditors;
    openRepository(path: string): Promise<void>;
    private shouldRepositoryBeIgnored;
    private open;
    close(repository: Repository): void;
    pickRepository(): Promise<Repository | undefined>;
    getRepository(sourceControl: SourceControl): Repository | undefined;
    getRepository(resourceGroup: SourceControlResourceGroup): Repository | undefined;
    getRepository(path: string): Repository | undefined;
    getRepository(resource: Uri): Repository | undefined;
    private getOpenRepository;
    getRepositoryForSubmodule(submoduleUri: Uri): Repository | undefined;
    registerRemoteSourceProvider(provider: RemoteSourceProvider): Disposable;
    registerCredentialsProvider(provider: CredentialsProvider): Disposable;
    getRemoteProviders(): RemoteSourceProvider[];
    registerPushErrorHandler(handler: PushErrorHandler): Disposable;
    getPushErrorHandlers(): PushErrorHandler[];
    dispose(): void;
}
