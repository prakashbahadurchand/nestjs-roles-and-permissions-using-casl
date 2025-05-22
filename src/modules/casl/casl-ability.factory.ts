import { AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, Role } from '../users/entities/user.entity';
import { Article } from '../articles/entities/article.entity';

export enum Action {
    Manage = 'manage', // wildcard for all actions
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

// `InferSubjects` will extract types from Article and User classes
// and return `'Article' | 'User' | 'all'` (if you use `'all'` keyword).
// `PureAbility` is a generic class that accepts two type parameters:
// 1. Tuple of actions and subjects; if an action is not expecting a subject, 
//    then it's enough to specify just an action name.
// 2. Conditions type for this ability instance (we will omit it for simplicity in this example)
export type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility as AbilityClass<AppAbility>);

        if (user.roles.includes(Role.ADMIN)) {
            can(Action.Manage, 'all'); // Admin can do anything
        } else {
            can(Action.Read, 'all'); // Non-admins can read everything (adjust as needed)
        }

        // Article-specific permissions for AUTHOR role
        if (user.roles.includes(Role.AUTHOR)) {
            can(Action.Create, Article);
            can(Action.Update, Article, { authorId: user.id });
            can(Action.Delete, Article, { authorId: user.id });
            // Author can publish/unpublish their own articles (using Update with field condition)
            can(Action.Update, Article, 'isPublished', { authorId: user.id });
        }

        // User-specific permissions (example: user can update their own profile)
        can(Action.Update, User, { id: user.id });

        // Add more specific permissions here based on roles or other conditions

        return build({
            // `detectSubjectType` is a function that tells CASL how to get a subject type.
            // It's crucial for CASL to know how to get the type of an object when you pass an instance
            // as a second argument to `ability.can(action, subject)`
            detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
        });
    }
}
