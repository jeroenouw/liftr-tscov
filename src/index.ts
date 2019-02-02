import {Container} from 'inversify';
import {TsConfig} from './tscov/ts-config';
import {Tscov} from './tscov/tscov';
import {Options} from './tscov/options';
import {CheckTypes} from './tscov/check-types';
import {MinCoverage} from './tscov/min-coverage';

export function index(): Tscov {
    const container: Container = new Container();
    
    container.bind<TsConfig>('TsConfig').to(TsConfig).inSingletonScope();
    container.bind<Tscov>('Tscov').to(Tscov).inSingletonScope();
    container.bind<Options>('Options').to(Options).inSingletonScope();
    container.bind<CheckTypes>('CheckTypes').to(CheckTypes).inSingletonScope();
    container.bind<MinCoverage>('MinCoverage').to(MinCoverage).inSingletonScope();
    
    return container.get<Tscov>('Tscov');
}

index();
