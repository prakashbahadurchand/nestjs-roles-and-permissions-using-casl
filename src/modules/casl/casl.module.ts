import { Module, Global } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';

@Global() // Make CASL module global to be available in other modules without importing
@Module({
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule { }
