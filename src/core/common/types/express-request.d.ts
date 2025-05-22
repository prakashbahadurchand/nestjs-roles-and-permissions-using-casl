// src/core/common/types/express-request.d.ts
import { User as CustomUserEntity } from '../../../modules/users/entities/user.entity'; // Adjust path as necessary

declare global {
    namespace Express {
        export interface Request {
            user?: CustomUserEntity; // Use your User entity type here
        }
    }
}
